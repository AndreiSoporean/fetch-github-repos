import { gql } from "@apollo/client";

export const LOAD_REPOS = gql`
    query allrepos {
      user(login: "AndreiSoporean") {
        repositories(first: 6) {
          totalCount
          nodes {
            id
            stargazerCount
            url
            name
            createdAt
            primaryLanguage {
              name
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    }
`