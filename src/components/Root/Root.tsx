'use client';

import { type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  postEvent,
} from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useTelegramMock } from '@/hooks/useTelegramMock';
import { useDidMount } from '@/hooks/useDidMount';
import { createContext, useContext } from 'react';

import './styles.css';

// Define the Viewport type
type Viewport = {
  height: number;
  width: number;
  // Add other properties as needed
};

// Create a context for the viewport
const ViewportContext = createContext<Viewport | undefined>(undefined);

// Custom hook to use the viewport context
export function useAppViewport() {
  const context = useContext(ViewportContext);
  if (context === null) {
    throw new Error('useAppViewport must be used within a ViewportProvider');
  }
  return context;
}


function App(props: PropsWithChildren) {
  const lp = useLaunchParams();
  const viewport = useViewport();

  postEvent('web_app_expand');

  useEffect(() => {
    if (viewport) {
      bindViewportCSSVars(viewport);
    }
  }, [viewport]);


  // const { height, width, isExpanded } = viewport || {};

  return (

    <ViewportContext.Provider value={viewport}>
      <AppRoot
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        className='h-full'
        // style={{
        //   // Use viewport dimensions
        //   height: height ? `${height}px` : '100%',
        //   width: width ? `${width}px` : '100%',
        // }}
      >
        {props.children}
      </AppRoot>
    </ViewportContext.Provider>
  );
}

function RootInner({ children }: PropsWithChildren) {
  // Mock Telegram environment in development mode if needed.
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <App>
          {children}
        </App>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : <div className="root__loading">Loading</div>;
}