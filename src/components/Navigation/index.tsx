'use client'
import { Link } from '@/components/Link/Link';
function Navigation() {
    return (
        <div className="navigation h-14 flex flex-col fixed bottom-14 left-0 right-0 w-full">
            <div className='flex justify-between mx-3 p-3 h-full border rounded-md'>
                <button><Link href='/'>Earn</Link></button>
                <button><Link href='/invite'>Invite</Link></button>
                <button><Link href='/play'>Play</Link></button>
                <button><Link href='/rewards'>Rewards</Link></button>
            </div>
        </div>
    );
}

export default Navigation;
