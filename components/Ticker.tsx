import s from './Ticker.module.css';

/**
 * A continuous strip of short phrases, the same mechanism as the home page's category band:
 * two identical rows and a track that loops by half its width. Pauses on hover and focus;
 * under reduced motion it becomes a plain scrollable row.
 */
export default function Ticker({ items, className = '' }: { items: string[]; className?: string }) {
  const row = (clone: boolean) => (
    <ul className={s.row} aria-hidden={clone || undefined}>
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className={`d ${s.item}`}>
          {t}
          <span className={s.sep} aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`${s.band} ${className}`} aria-label={items.join(', ')}>
      <div className={s.viewport}>
        <div className={s.track}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
