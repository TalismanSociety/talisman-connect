import Link from 'next/link';
import './crowdloans.module.css';

/* eslint-disable-next-line */
export interface CrowdloansProps {}

export function Crowdloans(props: CrowdloansProps) {
  return (
    <div>
      <Link href="/">Home</Link>
    </div>
  );
}

export default Crowdloans;
