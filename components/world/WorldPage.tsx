import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { World } from '@/lib/worlds';
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
          <h1 className={s.h}><img src={w.mark} alt={w.name} width={w.markW} height={w.markH} className={s.mark} style={{ width: w.mw }} /></h1>
          <p className={`d ${s.line}`}>{w.line}</p>
          <p className={s.copy}>{w.copy}</p>
          <p className={`d8 ${s.sub}`}>{w.sub}</p>
          <div className={s.btns}>
            <Link className="btn btn-white" href="/tap-in">Notify me</Link>
            <Link className="btn btn-line" href="/cultureverse">Back to the Cultureverse</Link>
          </div>
        </div>
        <div className={`door lit ${s.door}`}>
          <img src={w.shard} alt="" width={w.shardW} height={w.shardH} className={s.shard} style={{ transform: `rotate(${w.rot}deg)` }} />
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <div className={`door lit ${s.doorM}`}>
          <img src={w.shard} alt="" width={w.shardW} height={w.shardH} className={s.shardM} style={{ transform: `rotate(${w.rot}deg)` }} />
        </div>
        <div className={s.blockM}>
          <span className={`st st-tba ${s.when}`}>{w.when}</span>
          <h1 className={s.h}><img src={w.mark} alt={w.name} width={w.markW} height={w.markH} className={s.mark} style={{ width: w.mwM }} /></h1>
          <p className={`d ${s.lineM}`}>{w.line}</p>
          <p className={s.copyM}>{w.copy}</p>
          <p className={`d8 ${s.subM}`}>{w.sub}</p>
          <Link className={`btn btn-white ${s.full}`} href="/tap-in">Notify me</Link>
          <Link className={`btn btn-line ${s.full}`} href="/cultureverse">Back to the Cultureverse</Link>
        </div>
      </div>
    </section>
  );
}
