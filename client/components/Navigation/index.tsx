import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>Homepage</Link>{' '}
        </li>
        <li>
          <Link href='/wedding'>Wedding</Link>{' '}
        </li>
      </ul>
    </nav>
  )
}
