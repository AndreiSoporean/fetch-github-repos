import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client";
import { GET_REPO_BY_ID } from "../../graphql/queries"
import withApollo from "../../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import Chip from '@mui/material/Chip';

import styles from '../../styles/Repositories.module.css'
import Progress from "../../components/progress";
import Header from "../../components/header";

interface History {
  totalCount: number;
}

interface Commits {
  history: History;
}

interface Readme {
  text: string;
}

interface LanguageSize {
  size: number;
}

interface LanguageNodes {
  name: string;
  color: string;
}

interface Languages {
  edges: LanguageSize[];
  nodes: LanguageNodes[];
  totalCount: number;
}

interface RepositoryData {
  commits: Commits;
  id: string;
  languages: Languages;
  name: string;
  stargazerCount: number;
  url: string;
  readme: Readme;
}

interface Repository {
  node: RepositoryData;
}

const getTotalSize = (edges: LanguageSize[]) => edges.reduce((acc, curr) => acc + curr.size, 0);

const assignSizeToLanguage = (data: Repository) => {
  const languageWithSize = data.node.languages.nodes.map(({ name, color }, index) => {
    const currentSize = data.node.languages.edges[index].size;
    const complete = {
      name,
      color,
      usePerc: (currentSize * 100 / getTotalSize(data.node.languages.edges)).toFixed(2),
    }

    return complete;
  })
  return languageWithSize;
}

const RepositoriesSingle = (): React.ReactElement => {
  const router = useRouter();
  const [singleRepository, setSingleRepository] = useState<Repository>(null);
  const [completeLanguages, setCompleteLanguages] = useState(null);
  const { loading, data } = useQuery(GET_REPO_BY_ID, {
    variables: {
      id: router.query.id,
    }
  });

  useEffect(() => {
    if (data) {
      setSingleRepository(data);
      const result = assignSizeToLanguage(data);
      setCompleteLanguages(result)
    }
  }, [data])

  if (loading) {
    return <Progress />
  }

  return (
    <div className={styles.repoContainer}>
      <Header />
      <main className={styles.repoMain}>
        <a href={singleRepository?.node.url} target="_blank" rel="noreferrer">
          <div className={styles.repoSingleCard}>
            <h1 className={styles.repoTitle}>
              {data?.node.name}
            </h1>
            {completeLanguages?.length > 0 && (
              <div>
                <h3>Languages:</h3>
                {completeLanguages.map(({ name, color, usePerc }) =>
                  <Chip key={name}
                    label={`${name} - ${usePerc}%`}
                    style={{
                      background: color,
                      color: "white",
                      padding: "0 1rem",
                      marginRight: "1rem"
                    }}
                  />
                )}
              </div>
            )}
            {singleRepository?.node.readme && (
              <div>
                <h3>Readme text:</h3>
                <p className={styles.singleRepoReadme}>{singleRepository.node.readme.text}</p>
              </div>
            )}
            <div className={styles.singleRepoBottom}>
              <p>{`Commits: ${singleRepository?.node.commits?.history.totalCount || 0}`}</p>
              <p>{`Stars: ${singleRepository?.node.stargazerCount} x ⭐️`}</p>
            </div>
          </div>
        </a>
      </main>
    </div>
  )
}

export default withApollo(RepositoriesSingle, { getDataFromTree })


