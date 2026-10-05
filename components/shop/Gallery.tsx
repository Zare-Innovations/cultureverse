'use client';

import { useState } from 'react';
import { cdnSrc, cdnSrcSet, type ShopImage } from '@/lib/shop';
import s from './Gallery.module.css';

/** The product's photos: one large, the rest as thumbnails that swap it. No script: the first photo shows. */
export default function Gallery({ images, title }: { images: ShopImage[]; title: string }) {
  const [i, setI] = useState(0);
  const main = images[i] ?? images[0];
  if (!main) return <div className={`${s.main} ${s.empty}`} aria-hidden="true" />;
  return (
    <div className={s.gallery}>
      <div className={s.main}>
        <img key={main.url} className={s.img} src={cdnSrc(main, 1000)} srcSet={cdnSrcSet(main)} sizes="(min-width: 1024px) 720px, 100vw" alt={title} width={main.width} height={main.height} />
      </div>
      {images.length > 1 && (
        <div className={s.thumbs} role="list">
          {images.map((im, k) => (
            <button key={im.url} type="button" role="listitem" className={`${s.thumb} ${k === i ? s.on : ''}`} aria-label={`Photo ${k + 1} of ${images.length}`} aria-pressed={k === i} onClick={() => setI(k)}>
              <img src={cdnSrc(im, 300)} alt="" width={im.width} height={im.height} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
