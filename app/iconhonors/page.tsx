import type { Metadata } from 'next';
import Image from 'next/image';
import { pageTitle } from '@/lib/site';
import HonorsForm from '@/components/forms/HonorsForm';
import s from './iconhonors.module.css';

export const metadata: Metadata = {
  title: pageTitle("The Culture's Coldest™ ICON HONORS"),
  description: 'Honoring the culture’s brightest stars. Wed Oct 21, 2026, Flourish, Atlanta. Private, by invitation.',
};

const EVENING = ['Red carpet', 'Honors presentations', 'Performances', 'Cocktail reception'];

const PARTNERS = {
  honors: [
    ['/assets/partner-amazon.png', 640, 215, 'Amazon'],
    ['/assets/partner-visa.png', 640, 207, 'Visa'],
    ['/assets/partner-bentley-atlanta.png', 454, 242, 'Bentley Atlanta'],
  ],
  participants: [
    ['/assets/partner-allstate.png', 640, 135, 'Allstate'],
    ['/assets/partner-mcdonald-s.png', 640, 80, "McDonald's"],
    ['/assets/partner-fifth-third.png', 640, 116, 'Fifth Third'],
    ['/assets/partner-comerica.png', 640, 152, 'Comerica Bank'],
  ],
  media: [
    ['/assets/partner-black-enterprise.png', 640, 158, 'Black Enterprise'],
    ['/assets/partner-iheartmedia.png', 640, 201, 'iHeartMedia'],
    ['/assets/partner-bin.png', 334, 312, 'Black Information Network'],
  ],
} as const;

function Logos({ list, cols, mobile }: { list: readonly (readonly [string, number, number, string])[]; cols: number; mobile?: boolean }) {
  return (
    <div className={mobile ? s.logosM : s.logos} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {list.map(([src, w, h, alt]) => (
        <div key={src} className={mobile ? s.plogoM : s.plogo}>
          <img src={src} alt={alt} width={w} height={h} />
        </div>
      ))}
    </div>
  );
}

export default function IconHonorsPage() {
  return (
    <section id="honors" className={`page ${s.honors}`}>
      <div className={s.bgBox}>
        <Image className="bgimg" src="/assets/bg-honors.webp" alt="" fill priority sizes="100vw" style={{ objectPosition: '50% 0%' }} />
      </div>
      <div aria-hidden="true" className={s.fade} />

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={s.top}>
          <div className="hud">Wed Oct 21, 2026</div>
          <div className={`hud ${s.topRight}`}>Flourish, Atlanta<br />Part of The Culture&apos;s Coldest</div>
        </div>
        <div className={s.center}>
          <h1 className={s.h}><img className={s.mark} src="/assets/logo-iconhonors.png" alt="The Culture's Coldest ICON HONORS" width={1000} height={144} /></h1>
          <p className={`serif ${s.tagline}`}>Honoring the culture’s brightest stars</p>
          <span className={`st st-invite ${s.invite}`}>Private, by invitation</span>
        </div>

        <div className={s.inner}>
          <div className={s.grid}>
            <div className={s.left}>
              <p className={`serif ${s.eveningHead}`}>The evening</p>
              <ol className={s.evening}>
                {EVENING.map((t) => (
                  <li key={t} className={`serif ${s.item}`}>{t}</li>
                ))}
                <li className={`serif ${s.item} ${s.itemLast}`}><span>The After Glow</span><span className={s.after}>after-party</span></li>
              </ol>
              <dl className={s.dl}>
                <div><dt className={`hud ${s.ice}`}>Guests</dt><dd className={`serif ${s.ddBig}`}>750+</dd></div>
                <div><dt className={`hud ${s.ice}`}>Access</dt><dd className={`serif ${s.ddMid}`}>By invitation</dd></div>
                <div><dt className={`hud ${s.ice}`}>Times</dt><dd className={`serif ${s.ddMid}`}>To be announced</dd></div>
              </dl>
            </div>
            <div className={s.right}>
              <div className={s.frameBox}>
                <div aria-hidden="true" className={s.frame} />
                <Image className={s.render} src="/assets/render-honors-gala.webp" alt="Rendering of the ICON HONORS gala room, tables facing the stage" width={1800} height={930} sizes="660px" />
                <img className={s.stone} src="/assets/stone-ice.webp" alt="" width={625} height={900} />
              </div>
              <div className={s.celebrate}>
                <h2 className={`serif ${s.celebrateH}`}>Celebrating the culture’s coldest</h2>
                <div className={s.honorees}>
                  <div className={s.portraitCol}>
                    <div className={s.portrait}><span className={`hud ${s.ice} ${s.portraitText}`}>Portrait<br />pending</span></div>
                    <p className={`serif ${s.name}`}>[TAYLOR TOWNSEND]</p>
                    <p className={`hud ${s.ice}`}>Pending approval</p>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <div key={i} aria-hidden="true" className={s.portal}><span className={`hud ${s.portalText}`}>To be<br />announced</span></div>
                  ))}
                  <p className={`serif ${s.more}`}>more to be announced</p>
                </div>
              </div>
            </div>
          </div>

          <div className={s.partners}>
            <div><p className={`hud ${s.ice} ${s.partnersHead}`}>ICON HONORS partners</p><Logos list={PARTNERS.honors} cols={3} /></div>
            <div><p className={`hud ${s.ice} ${s.partnersHead}`}>Participants</p><Logos list={PARTNERS.participants} cols={4} /></div>
            <div><p className={`hud ${s.ice} ${s.partnersHead}`}>Media partners</p><Logos list={PARTNERS.media} cols={3} /></div>
          </div>
          <p className={`hud ${s.partial}`}>*Partial listing as confirmed</p>
          <HonorsForm variant="d" />
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <div className={s.topM}>
          <span className="hud">Wed Oct 21, 2026</span>
          <span className="hud">Flourish, Atlanta</span>
        </div>
        <h1 className={s.hM}><img className={s.markM} src="/assets/logo-iconhonors.png" alt="The Culture's Coldest ICON HONORS" width={1000} height={144} /></h1>
        <p className={`serif ${s.taglineM}`}>Honoring the culture’s brightest stars</p>
        <div className={s.inviteM}><span className="st st-invite">Private, by invitation</span></div>
        <div className={s.frameBoxM}>
          <div aria-hidden="true" className={s.frameM} />
          <Image className={s.renderM} src="/assets/render-honors-gala.webp" alt="Rendering of the ICON HONORS gala room" width={1800} height={930} sizes="100vw" />
        </div>
        <dl className={s.dlM}>
          <div><dt className={`hud ${s.ice}`}>Guests</dt><dd className={`serif ${s.ddBigM}`}>750+</dd></div>
          <div><dt className={`hud ${s.ice}`}>Times</dt><dd className={`serif ${s.ddMidM}`}>To be announced</dd></div>
        </dl>
        <p className={`serif ${s.eveningHeadM}`}>The evening</p>
        <ol className={s.eveningM}>
          {EVENING.map((t) => (
            <li key={t} className={`serif ${s.itemM}`}>{t}</li>
          ))}
          <li className={`serif ${s.itemM} ${s.itemLastM}`}>The After Glow <span className={s.afterM}>after-party</span></li>
        </ol>
        <h2 className={`serif ${s.celebrateHM}`}>Celebrating the culture’s coldest</h2>
        <div className={s.honoreesM}>
          <div className={s.portraitColM}>
            <div className={s.portraitM} />
            <p className={`serif ${s.nameM}`}>[TAYLOR TOWNSEND]</p>
            <p className={`hud ${s.ice} ${s.pendingM}`}>Pending approval</p>
          </div>
          {[0, 1].map((i) => (
            <div key={i} aria-hidden="true" className={s.portalM}><span className={`hud ${s.portalText}`}>To be<br />announced</span></div>
          ))}
        </div>
        <p className={`serif ${s.moreM}`}>more to be announced</p>
        <p className={`hud ${s.ice} ${s.partnersHeadM}`}>ICON HONORS partners</p>
        <Logos list={PARTNERS.honors} cols={3} mobile />
        <p className={`hud ${s.ice} ${s.partnersHeadM2}`}>Participants</p>
        <Logos list={PARTNERS.participants} cols={4} mobile />
        <p className={`hud ${s.ice} ${s.partnersHeadM2}`}>Media partners</p>
        <Logos list={PARTNERS.media} cols={3} mobile />
        <p className={`hud ${s.partialM}`}>*Partial listing as confirmed</p>
        <HonorsForm variant="m" />
      </div>
    </section>
  );
}
