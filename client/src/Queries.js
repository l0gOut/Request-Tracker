import { gql } from "@apollo/client";

export const GET_ALL_TEMPLATES = gql`
  query {
    getAllApplicationTemplates {
      name
      description
    }
  }
`;

export const LoginMutation = gql`
  mutation($login: String!, $password: String!) {
    login(input: { login: $login, password: $password }) {
      id
      login
      password
    }
  }
`;
