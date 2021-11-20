import { Repository } from "../../pages"
import styles from '../../styles/RepositoryCard.module.css'

interface RepositoryCardProps {
  repository: Repository
}

const formatDateToString = (date: string) => {
  const newDate = new Date(date);
  return newDate.toDateString();
}

const RepositoryCard = (props: RepositoryCardProps): React.ReactElement => {
  const { repository: { name, createdAt, id, stargazerCount, url, primaryLanguage } } = props;

  const date = new Date(createdAt)


  console.log(date.toDateString())
  return <a href={url} className={styles.repositoryCard}>
    <h2>{name}</h2>
    <div className={styles.repositoryCardBottom}>
      <p>Created At: {formatDateToString(createdAt)}</p>
      <p>⭐️ {stargazerCount}</p>
    </div>
  </a>

}

export default RepositoryCard