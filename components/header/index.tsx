import Link from "next/link"
import styles from '../../styles/Header.module.css'

const Header = (): React.ReactElement => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title} >
        GITHUB <span> REPOSITORIES</span>
      </h1>
      <ul className={styles.navigation}>
        <Link href={`/`} passHref>
          <li>HOME</li>
        </Link>
        <Link href={`/profile`} passHref>
          <li>PROFILE</li>
        </Link>
      </ul>
    </div>

  )
}

export default Header
