'use client';


import { Link } from '@/components/Link/Link';
import Navigation from '@/components/Navigation';
import { useAppViewport } from '@/components/Root/Root';

export default function Home() {
  const viewport = useAppViewport();
  return (
    <section className='border'>
      <div>Home</div>
      <div>
        Viewport height: {viewport?.height}
        Viewport width: {viewport?.width}
      </div>
    </section>
  );
}
