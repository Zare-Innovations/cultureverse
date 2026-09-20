import { CATEGORIES } from '@/lib/categories';
import s from './CategoryBand.module.css';

/** Continuous strip of every category the culture touches: home page, between the hero and Stay Tapped In. */
export default function CategoryBand() {
  const row = (clone: boolean) => (
    <ul className={s.row} aria-hidden={clone || undefined}>
      {CATEGORIES.map((c) => (
        <li key={c} className={`marquee ${s.item}`}>
          {c}
          <span className={s.sep} aria-hidden="true">|</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section className={`page ${s.band}`} aria-label="Everything the culture touches">
      <div className={s.viewport}>
        <div className={s.track}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
