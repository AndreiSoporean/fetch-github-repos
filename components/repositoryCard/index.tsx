import { Repository } from "../../pages"
import Link from "next/link"

import styles from '../../styles/RepositoryCard.module.css'

interface RepositoryCardProps {
  repository: Repository
}

const formatDateToString = (date: string) => {
  const newDate = new Date(date);
  return newDate.toDateString();
}

const RepositoryCard = (props: RepositoryCardProps): React.ReactElement => {
  const { repository: { node: { owner, name, createdAt, id, stargazerCount, primaryLanguage } } } = props;

  const date = new Date(createdAt)

  return (
    <Link href={`repositories/${id}`} passHref>
      <div className={styles.repositoryCard}>
        <div className={styles.repositoryDetails}>
          <p>{`Owner: ${owner.login}`}</p>
          <p>{`Language: ${primaryLanguage ? primaryLanguage.name : `unknown`}`}</p>
        </div>
        <div className={styles.repositoryMain}>
          <h2>{name}</h2>
          <div className={styles.repositoryCardBottom}>
            <p>Created At: {formatDateToString(createdAt)}</p>
            <p>⭐️ {stargazerCount}</p>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default RepositoryCard