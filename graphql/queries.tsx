import { gql } from "@apollo/client";

export const LOAD_REPOS = gql`
  {
    user(login: "AndreiSoporean") {
      avatarUrl(size: 10)
      bio
      name
      repositories(first: 5) {
        totalCount
        nodes {
          id
          pushedAt
          stargazerCount
          url
          name
          createdAt
          primaryLanguage {
            name
          }
          defaultBranchRef {
            name
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;