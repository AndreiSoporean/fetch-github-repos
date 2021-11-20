import { useState, useEffect } from "react";

import Head from 'next/head'
import Image from 'next/image'

import { useQuery } from "@apollo/client";
import { LOAD_REPOS } from '../graphql/queries';

import styles from '../styles/Home.module.css'
import RepositoryCard from "../components/repositoryCard";

interface Language {
  name: string;
}
export interface Repository {
  name: string;
  createdAt: string;
  id: string;
  stargazerCount: number;
  url: string;
  primaryLanguage: Language;
}

export default function Home() {
  const { loading, data } = useQuery(LOAD_REPOS);

  const [repos, setRepos] = useState<Repository[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [totalRepos, setTotalRepos] = useState<number>(0)

  useEffect(() => {
    if (data) {
      const { user: { repositories } } = data
      console.log({ repositories })
      setHasNextPage(repositories.pageInfo.hasNextPage);
      setTotalRepos(repositories.totalCount);
      setRepos(repositories.nodes)
    }
  }, [data])


  return (
    <div className={styles.container}>
      <Head>
        <title>Github Repositories</title>
        <meta name="description" content="Created with next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Github Repositories
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {repos.length > 0 && (
            repos.map((repo: Repository) => <RepositoryCard key={repo.id} repository={repo} />)
          )}

        </div>
      </main>
    </div>
  )
}
