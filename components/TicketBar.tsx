import Link from 'next/link';
import TicketLink from './TicketLink';
import s from './TicketBar.module.css';

/** Mobile only: pinned to the bottom of the viewport on every page. */
export default function TicketBar() {
  return (
    <div className={s.bar}>
      <TicketLink className={`btn btn-red ${s.btn}`}>Get tickets</TicketLink>
      <Link className={`btn btn-line ${s.btn}`} href="/tap-in">
        Tap in
      </Link>
    </div>
  );
}
