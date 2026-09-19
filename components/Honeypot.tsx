import { HONEYPOT } from '@/lib/useJsonForm';

/** Off-screen field that humans never see. Kept out of the tab order and hidden from assistive tech. */
export default function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
      <label htmlFor={id}>Website</label>
      <input id={id} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
