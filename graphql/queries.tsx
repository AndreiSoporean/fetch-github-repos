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
              owner {
                login
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

export const GET_PROFILE = gql`
    query getprofile {
      user(login: "AndreiSoporean") {
        avatarUrl(size: 200)
        bio
        name
        repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
          totalCount
        }
        repositories(first: 10) {
          totalCount
          nodes {
            languages(first: 10) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
`
