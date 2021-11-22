import { useEffect, useState } from "react";
import Header from "../../components/header"

import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../graphql/queries"
import withApollo from "../../lib/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";

import Image from "next/image"
import Chip from '@mui/material/Chip';
import styles from "../../styles/Profile.module.css"

interface User {
  avatarUrl: string;
  bio: string;
  name: string;
}

const mergeAllLanguages = (repositories) => {
  const merged = repositories?.nodes.map((repo) => {
    const languages = repo.languages.nodes.map(({ name }) => name);
    const newContextOptions = [...languages]
    return newContextOptions
  });
  const flatArray = merged?.flat(1);

  return flatArray;
};

const languagesCount = (languages) => languages?.reduce((acc, cur) => (acc[cur] = acc[cur] + 1 || 1, acc), {});


const languagePercentage = (languages, totalCount) => {
  const withPercs = Object.entries(languages).map(item => {
    const percs = {
      name: item[0],
      value: (item[1] as number * 100) / totalCount,
    }

    return percs;
  })

  return withPercs;
}

const Profile = (): React.ReactElement => {
  const { loading, data } = useQuery(GET_PROFILE);
  const [userProfile, setUserProfile] = useState<User>(null)

  useEffect(() => {
    if (data) {
      const { user: { avatarUrl, bio, name } } = data;
      const userData = {
        avatarUrl,
        bio,
        name,
      }
      setUserProfile(userData)
    }
  }, [data])

  console.log({ userProfile })

  const repositories = data?.user.repositories;
  const result = mergeAllLanguages(repositories);
  const count = languagesCount(result);

  console.log(data)

  const percentages = count && languagePercentage(count, repositories?.totalCount);



  // console.log({ percentages })

  // console.log(repositories)


  // console.log({ count })

  // console.log({ result })
  console.log(userProfile?.avatarUrl)
  return (
    <div className={styles.profileContainer}>
      <Header />
      <main className={styles.profileMain}>
        <div className={styles.profileCard}>
          {userProfile && (
            <>
              <div className={styles.topDetails}>
                <Image className={styles.profileImage} src={userProfile.avatarUrl} width={200} height={200} alt="profile image" />
                <div className={styles.name}>
                  <h2>{userProfile.name}</h2>
                  <p>{userProfile.bio}</p>
                </div>
              </div>
              <div className={styles.bottomDetails}>
                <p>{`Repositories contributed to: ${data?.user.repositoriesContributedTo.totalCount}`}</p>
                <div className={styles.languageInfo}>
                  <h4>Languages in my repositories:</h4>
                  <div className={styles.languageChips}>
                    {percentages.map(({ name, value }) =>
                      <Chip key={name}
                        label={`${name} - ${value}%`}
                        style={{
                          background: "#219ebc",
                          color: "white",
                          padding: "0 1rem",
                          marginRight: "1rem"
                        }}
                      />
                    )}
                  </div>

                </div>

              </div>
            </>
          )}
        </div>

      </main>
    </div>
  )
}

export default withApollo(Profile, { getDataFromTree })