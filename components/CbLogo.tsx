import type { CSSProperties } from 'react';

/**
 * The wordmark with its red outline sitting behind it, offset.
 *
 * The outline is the same vector geometry stroked rather than filled, so it stays a true hollow
 * line at any size. The old treatment stacked four solid drop-shadows, which read as a heavy
 * extrude instead of the stroke the brand uses.
 *
 * The offset is a percentage so it scales with the mark: the nav at 95px and the hero at 560px
 * both land in proportion without per-placement tuning.
 */
export default function CbLogo({
  className = '',
  stackClassName = '',
  alt = 'CultureBowl',
  style,
}: {
  className?: string;
  stackClassName?: string;
  alt?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`cb-stack ${stackClassName}`} style={style}>
      <img
        aria-hidden="true"
        className="cb-stack-line"
        src="/assets/logo-culturebowl-outline-red.svg"
        alt=""
        width={2115}
        height={1023}
      />
      <img className={`cb-stack-mark ${className}`} src="/assets/logo-culturebowl-white.svg" alt={alt} width={2115} height={1023} />
    </span>
  );
}
