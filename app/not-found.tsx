import type { Metadata } from 'next';
import Link from 'next/link';
import { pageTitle } from '@/lib/site';
import TicketLink from '@/components/TicketLink';
import s from './not-found.module.css';

export const metadata: Metadata = {
  title: pageTitle('Page not found'),
};

export default function NotFound() {
  return (
    <section className={`page ${s.nf}`}>
      <div className={`wrap ${s.wrap}`}>
        <img className={`cb-logo ${s.logo}`} src="/assets/logo-culturebowl-white.svg" alt="CultureBowl" width={2115} height={1023} />
        <h1 className={`d ${s.title}`}>Page not found</h1>
        <div className={s.btns}>
          <Link className="btn btn-line" href="/">Back to home</Link>
          <TicketLink className="btn btn-red">Get tickets</TicketLink>
        </div>
      </div>
    </section>
  );
}
