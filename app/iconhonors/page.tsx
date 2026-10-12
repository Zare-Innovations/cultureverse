import type { Metadata } from 'next';
import Image from 'next/image';
import { pageTitle } from '@/lib/site';
import Reveal from '@/components/Reveal';
import { srcSet, HONORS_WIDTHS, OBJECT_WIDTHS } from '@/lib/img';
import s from './iconhonors.module.css';

export const metadata: Metadata = {
  title: pageTitle("The Culture's Coldest™ ICON HONORS"),
  description:
    'An iconic evening honoring achievement across business, the arts, creator economy, philanthropy, sports, entertainment, education, public policy, tech, and global impact. Private, by invitation.',
};

const HOSTED = 'Hosted by Marsai Martin with The Culture’s Coldest™ Sounds by DJ D-NICE';

const ABOUT =
  'The Culture’s Coldest™ ICON HONORS is an iconic evening honoring achievement across business, the arts, creator economy, philanthropy, sports, entertainment, education, public policy, tech, and global impact.';

const PILLARS = ['Achievement', 'Excellence', 'Impact'];


const EVENING = ['Red carpet', 'Honors presentations', 'Performances', 'Cocktail reception', 'The After Glow'];

/**
 * The Class of 2026. Names and titles are held until the client approves them for the page,
 * so each card shows "To be announced" with the headshot in place. Set `announced: true` on a
 * row to reveal it. Headshots are the client's 2000px round crops at public/assets/honorees/.
 */
const HONOREES = [
  { slug: 'duckett', name: 'Thasunda Duckett', title: 'President and Chief Executive Officer, TIAA', announced: true },
  { slug: 'moore', name: 'Minyon Moore', title: 'Principal & Managing Partner, Dewey Square Group', announced: true },
  { slug: 'townsend', name: 'Taylor Townsend', title: '2026 US Open | Doubles Champion (U.S.A), Career Grand Slam', announced: true },
  { slug: 'reynolds', name: 'James Reynolds', title: 'Founder, Chairman, Chief Executive Officer, Loop Capital', announced: true },
  { slug: 'chainz', name: '2 Chainz', title: 'Grammy-winning rapper, songwriter, author, and actor', announced: true },
] as const;

const FACTS = [
  ['Guests', '750+'],
  ['Access', 'By invitation'],
] as const;



/** The honoree grid: the client's design, a round headshot over the name in yellow. */
function Honorees({ mobile }: { mobile?: boolean }) {
  return (
    <div className={mobile ? s.honoreesM : s.honorees}>
      {HONOREES.map((h) => (
        <article key={h.slug} className={s.honoree}>
          <div className={s.portrait}>
            <Image className={s.headshot} src={`/assets/honorees/${h.slug}.webp`} alt={h.announced ? h.name : 'Honoree, to be announced'} width={800} height={800} sizes="(min-width: 1024px) 200px, 45vw" />
          </div>
          <p className={`serif ${s.name}${h.announced ? '' : ` ${s.nameTba}`}`}>{h.announced ? h.name : 'To be announced'}</p>
          <p className={`hud ${s.honor}`}>Honoree</p>
          <p className={s.bio}>{h.announced ? h.title : 'Bio to follow.'}</p>
        </article>
      ))}
    </div>
  );
}

export default function IconHonorsPage() {
  return (
    <section id="honors" className={`page ${s.honors}`}>
      <div className={s.bgBox}>
        <Image className="bgimg" src="/assets/bg-honors-keyart.webp" alt="" fill priority sizes="100vw" style={{ objectPosition: '50% 50%' }} />
        {/* The key art's composition rebuilt from the supplied renders at full resolution: the two
            chrome blades framing the lockup from the bottom corners, the ring sweeping across the
            top, and the coil and lattice as small accents. The art underneath is softened so its
            own baked-in arcs read as glow under these crisp edges. */}
        <img aria-hidden="true" className={`${s.obj} ${s.shellL}`} src="/assets/obj-shell.webp" srcSet={srcSet('/assets/obj-shell.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 640px, 300px" alt="" width={1400} height={1555} />
        <img aria-hidden="true" className={`${s.obj} ${s.shellR}`} src="/assets/obj-shell.webp" srcSet={srcSet('/assets/obj-shell.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 640px, 300px" alt="" width={1400} height={1555} />
        <img aria-hidden="true" className={`${s.obj} ${s.ring}`} src="/assets/obj-ring.webp" srcSet={srcSet('/assets/obj-ring.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 1400px, 900px" alt="" width={1400} height={1028} />
        <img aria-hidden="true" className={`${s.obj} ${s.coil}`} src="/assets/obj-coil.webp" srcSet={srcSet('/assets/obj-coil.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 220px, 90px" alt="" width={1400} height={1419} loading="lazy" />
        <img aria-hidden="true" className={`${s.obj} ${s.lattice}`} src="/assets/obj-lattice.webp" srcSet={srcSet('/assets/obj-lattice.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 240px, 100px" alt="" width={1400} height={1393} loading="lazy" />
      </div>
      <div aria-hidden="true" className={s.fade} />

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={s.center}>
          <h1 className={s.h}><img className={s.mark} src="/assets/logo-iconhonors.png" srcSet={srcSet("/assets/logo-iconhonors.png", HONORS_WIDTHS, 2000)} sizes="(min-width: 1024px) 1400px, 900px" alt="The Culture's Coldest ICON HONORS" width={2000} height={350}  style={{ aspectRatio: '2000 / 350' }} /></h1>
          <p className={`hud ${s.hosted}`}>{HOSTED}</p>
          <span className={`st st-invite ${s.invite}`}>Private, by invitation</span>
          <img className={s.mcf} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />
        </div>

        <div className={s.inner}>
          {/* 1. The evening, explained */}
          <Reveal className={`${s.band} ${s.intro}`}>
            <p className={`hud ${s.bandHead} ${s.steel}`}>An iconic evening</p>
            <p className={`serif ${s.about}`}>{ABOUT}</p>
            <ul className={s.pillars}>
              {PILLARS.map((p) => (
                <li key={p} className={`d ${s.pillar}`}>{p}</li>
              ))}
            </ul>
          </Reveal>

          {/* The hosts banner, framed. */}
          <Reveal className={s.frameBox} delay={80}>
            <div aria-hidden="true" className={s.frame} />
            <Image className={s.render} src="/assets/honors-banner.webp" alt="One unforgettable night: hosted by Marsai Martin, with The Culture's Coldest sounds by DJ D-NICE" width={2000} height={994} sizes="(min-width: 1024px) 1312px, 100vw" />
          </Reveal>

          {/* 2. The evening, hour by hour */}
          <Reveal className={s.band}>
            <p className={`serif ${s.bandTitle}`}>The evening</p>
            <ol className={s.evening}>
              {EVENING.map((t, i) => (
                <li key={t} className={s.item}>
                  <span className={`hud ${s.itemNum} ${s.steel}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`serif ${s.itemText}`}>{t}</span>
                  {i === EVENING.length - 1 && <span className={`hud ${s.after}`}>after-party</span>}
                </li>
              ))}
            </ol>
          </Reveal>

          {/* 3. The class */}
          <Reveal className={s.band}>
            <h2 className={`serif ${s.bandTitle}`}>Celebrating the Culture&rsquo;s Coldest&trade;</h2>
            <p className={`hud ${s.steel} ${s.classHead}`}>The Class of 2026</p>
            <Honorees />
            <p className={`serif ${s.more}`}>more to be announced</p>
          </Reveal>
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <h1 className={s.hM}><img className={s.markM} src="/assets/logo-iconhonors.png" srcSet={srcSet("/assets/logo-iconhonors.png", HONORS_WIDTHS, 2000)} sizes="(min-width: 1024px) 1400px, 342px" alt="The Culture's Coldest ICON HONORS" width={2000} height={350}  style={{ aspectRatio: '2000 / 350' }} /></h1>
        <p className={`hud ${s.hostedM}`}>{HOSTED}</p>
        <div className={s.inviteM}><span className="st st-invite">Private, by invitation</span></div>
        <img className={s.mcfM} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />

        <p className={`serif ${s.aboutM}`}>{ABOUT}</p>
        <ul className={s.pillarsM}>
          {PILLARS.map((p) => (
            <li key={p} className={`d ${s.pillarM}`}>{p}</li>
          ))}
        </ul>

        <div className={s.frameBoxM}>
          <div aria-hidden="true" className={s.frameM} />
          <Image className={s.renderM} src="/assets/honors-banner.webp" alt="One unforgettable night: hosted by Marsai Martin, with The Culture's Coldest sounds by DJ D-NICE" width={2000} height={994} sizes="100vw" />
        </div>

        <p className={`serif ${s.bandTitleM}`}>The evening</p>
        <ol className={s.eveningM}>
          {EVENING.map((t, i) => (
            <li key={t} className={s.itemM}>
              <span className={`hud ${s.itemNum} ${s.steel}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`serif ${s.itemTextM}`}>{t}</span>
            </li>
          ))}
        </ol>

        <h2 className={`serif ${s.bandTitleM}`}>Celebrating the Culture&rsquo;s Coldest&trade;</h2>
        <p className={`hud ${s.steel} ${s.classHeadM}`}>The Class of 2026</p>
        <Honorees mobile />
        <p className={`serif ${s.moreM}`}>more to be announced</p>
      </div>
    </section>
  );
}
