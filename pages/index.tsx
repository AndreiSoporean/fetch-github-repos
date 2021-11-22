import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_REPOS } from '../graphql/queries';
import { getDataFromTree } from "@apollo/client/react/ssr";
import Head from 'next/head'
import Progress from "../components/progress"
import RepositoryCard from "../components/repositoryCard";
import Pagination from "../components/pagination";
import withApollo from "../lib/withApollo";

import styles from '../styles/Home.module.css'
import Header from "../components/header";
interface Language {
  name: string;
}

interface Owner {
  login: string;
}

interface RepositoryNode {
  createdAt: string;
  id: string;
  name: string;
  primaryLanguage: Language;
  stargazerCount: number;
  owner: Owner;
}
export interface Repository {
  cursor: string;
  node: RepositoryNode;
}

const itemsPerPage = 6;

function Home() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false)
  const [totalRepos, setTotalRepos] = useState<number>(0)
  const [afterValue, setAfterValue] = useState<string>(null);
  const [beforeValue, setBeforeValue] = useState<string>(null);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [endCursor, setEndCursor] = useState<string>();

  const { loading, data, refetch } = useQuery(LOAD_REPOS, {
    variables: {
      itemsPerPage,
      after: afterValue,
      before: beforeValue,
    }
  });

  useEffect(() => {
    if (data) {
      const { user: { repositories } } = data
      setHasNextPage(repositories.pageInfo.hasNextPage);
      setHasPrevPage(repositories.pageInfo.hasPreviousPage);
      setEndCursor(repositories.pageInfo.endCursor)
      setTotalRepos(repositories.totalCount);
      setRepos(repositories.edges);
    }
  }, [data])


  if (loading) {
    return <Progress />
  }

  const getNewData = (value: number) => {
    if (value > currentPage) {
      setAfterValue(endCursor);
      setBeforeValue(null);
    } else {
      setAfterValue(null);
      setBeforeValue(endCursor);
    }

    setCurrentPage(value);
    refetch()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Github Repositories</title>
        <meta name="description" content="Created with next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          {repos.length > 0 && (
            repos.map((repo: Repository) => <RepositoryCard key={repo.node.id} repository={repo} />)
          )}
        </div>
        <Pagination value={currentPage} perPage={itemsPerPage} hasNext={hasNextPage} hasPrev={hasPrevPage} total={totalRepos} onChangeValue={(value) => getNewData(value)} />
      </main>
    </div>
  )
}


export default withApollo(Home, { getDataFromTree })