'use client'
import { Cell } from "@telegram-apps/telegram-ui";
import { Link } from '@/components/Link/Link';
function Navigation() {
    return (
        <div className="py-3 flex justify-between border-t">
            <button>  <Link href='/'>Earn</Link></button>
            <button> <Link href='/invite'>Invite</Link></button>
            <button> <Link href='/play'>Play</Link></button>
            <button> <Link href='/rewards'>Rewards</Link></button>
        </div>
    );
}

export default Navigation;