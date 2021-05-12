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
  mutation ($login: String!, $password: String!) {
    login(input: { login: $login, password: $password }) {
      id
      login
      password
    }
  }
`;

export const GetUserQuery = gql`
  mutation ($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      middleName
      email
      phone
      gender {
        genderName
      }
      department {
        name
        number
      }
    }
  }
`;

export const ChangeUser = gql`
  mutation (
    $id: ID!
    $firstName: String!
    $lastName: String!
    $middleName: String!
    $email: String!
    $phone: String!
  ) {
    changeUser(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        middleName: $middleName
        email: $email
        phone: $phone
      }
    ) {
      id
      firstName
      lastName
      middleName
      email
      phone
    }
  }
`;

export const CreateApplication = gql`
  mutation ($name: String!, $description: String!, $userId: Int!) {
    createApplication(
      input: { name: $name, description: $description, userId: $userId }
    ) {
      id
      name
      description
    }
  }
`;

export const CreateApplicationStatus = gql`
  mutation ($date: String!, $applicationId: Int!, $statusId: Int) {
    createApplicationStatus(
      input: { date: $date, applicationId: $applicationId, statusId: $statusId }
    ) {
      id
      date
    }
  }
`;
