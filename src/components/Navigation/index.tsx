'use client'
import { Link } from '@/components/Link/Link';
function Navigation() {
    return (
        <div className='flex justify-between p-3 h border rounded-md'>
            <button><Link href='/'>Earn</Link></button>
            <button><Link href='/invite'>Invite</Link></button>
            <button><Link href='/play'>Play</Link></button>
            <button><Link href='/rewards'>Rewards</Link></button>
        </div>
    );
}

export default Navigation;
