import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { World } from '@/lib/worlds';
import { srcSet, LOGO_WIDTHS, STONE_WIDTHS } from '@/lib/img';
import s from './world.module.css';

/** 10-ComingWorlds template: one page per coming world. */
export default function WorldPage({ w }: { w: World }) {
  return (
    <section className={`page ${s.world}`} style={{ background: w.bgc, '--glow': w.glow } as CSSProperties}>
      <Image className="bgimg" src={w.bg} alt="" fill priority sizes="100vw" style={{ opacity: 0.85 }} />
      <div aria-hidden="true" className={s.shade} />

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={s.top}>
          <Link href="/cultureverse" className={`hud ${s.back}`}>Back to the Cultureverse</Link>
        </div>
        <div className={s.block}>
          <span className={`st st-tba ${s.when}`}>{w.when}</span>
          <h1 className={s.h}><img src={w.mark} srcSet={srcSet(w.mark, LOGO_WIDTHS, w.markW)} sizes={`(min-width: 1024px) 1400px, ${w.mw}px`} alt={w.name} width={w.markW} height={w.markH} className={s.mark} style={{ width: w.mw, aspectRatio: `${w.markW} / ${w.markH}` }} /></h1>
          <p className={`d ${s.line}`}>{w.line}</p>
          <p className={s.copy}>{w.copy}</p>
          <p className={`d8 ${s.sub}`}>{w.sub}</p>
          <div className={s.btns}>
            <Link className="btn btn-white" href="/tap-in">Notify me</Link>
            <Link className="btn btn-line" href="/cultureverse">Back to the Cultureverse</Link>
          </div>
        </div>
        {w.photo && (
          <Image className={s.photo} src={w.photo.src} alt={w.photo.alt} width={w.photo.w} height={w.photo.h} sizes="(min-width: 1024px) 680px, 100vw" style={{ objectPosition: w.photo.pos }} />
        )}
        <div className={`door lit ${s.door} ${w.photo ? s.doorPhoto : ''}`}>
          <img src={w.shard} srcSet={srcSet(w.shard, STONE_WIDTHS, w.shardW)} sizes="(min-width: 1024px) 1400px, 400px" alt="" width={w.shardW} height={w.shardH} className={s.shard} style={{ transform: `rotate(${w.rot}deg)` }} loading="lazy" />
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <div className={`door lit ${s.doorM}`}>
          <img src={w.shard} srcSet={srcSet(w.shard, STONE_WIDTHS)} sizes="250px" alt="" width={w.shardW} height={w.shardH} className={s.shardM} style={{ transform: `rotate(${w.rot}deg)` }} />
        </div>
        <div className={s.blockM}>
          <span className={`st st-tba ${s.when}`}>{w.when}</span>
          <h1 className={s.h}><img src={w.mark} srcSet={srcSet(w.mark, LOGO_WIDTHS, w.markW)} sizes={`(min-width: 1024px) 1400px, ${w.mwM}px`} alt={w.name} width={w.markW} height={w.markH} className={s.mark} style={{ width: w.mwM, aspectRatio: `${w.markW} / ${w.markH}` }} /></h1>
          <p className={`d ${s.lineM}`}>{w.line}</p>
          <p className={s.copyM}>{w.copy}</p>
          <p className={`d8 ${s.subM}`}>{w.sub}</p>
          <Link className={`btn btn-white ${s.full}`} href="/tap-in">Notify me</Link>
          <Link className={`btn btn-line ${s.full}`} href="/cultureverse">Back to the Cultureverse</Link>
        </div>
        {w.photo && (
          <Image className={s.photoM} src={w.photo.src} alt={w.photo.alt} width={w.photo.w} height={w.photo.h} sizes="100vw" style={{ objectPosition: w.photo.pos }} />
        )}
      </div>
    </section>
  );
}
