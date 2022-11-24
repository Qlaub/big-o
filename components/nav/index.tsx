import Link from "next/link";
import styles from './Nav.module.css';


export const Nav = () => {
  return (
    <ul className="flex flex-row gap-3">
      <li className={styles.inner}>
        <Link href={'/'}>
          Home
        </Link>
      </li>
      <li>
        <Link href={'/demonstration'}>
          Demonstration
        </Link>
      </li>
    </ul>
  )
};