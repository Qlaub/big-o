import Link from "next/link";

export const Nav = () => {
  return (
    <ul className="flex flex-row gap-3">
      <li>
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