import { gql } from "@apollo/client";

export const LOAD_REPOS = gql`
    query allrepos($itemsPerPage: Int!, $before: String $after: String) {
      user(login: "AndreiSoporean") {
        repositories(first: $itemsPerPage, before: $before, after: $after) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
          }
          edges {
            node {
              id
              name
              createdAt
              stargazerCount
              primaryLanguage {
                name
              }
            }
            cursor
          }
        }
      }
    }
`

export const GET_REPO_BY_ID = gql`
  query repositoryById($id: ID!){ 
    node(id:$id){
      ... on Repository {
        id
        name
        url
        stargazerCount
        readme: object(expression: "master:README.md") {
          ... on Blob {
            text
          }
        }
        commits: object(expression:"main") {
          ... on Commit {
            history {
              totalCount
            }
          }
        }
        languages(first: 3) {
          totalCount
          nodes {
            name
            color
          }
          edges {
            size
          }
        }
      }
    }
  } 
`

// export const SEARCH_REPO = gql`
//     searchrepo(first: $first, after:$cursor, query: $query, type: $type) {
//       edges {
//           node {
//               ... on Repository {
//                   name
//                   description
//                   forkCount
//                   owner {
//                       avatarUrl
//                   }
//               }
//           }
//       }
//       pageInfo {
//           hasNextPage
//           endCursor
//       }
//     }
// `
