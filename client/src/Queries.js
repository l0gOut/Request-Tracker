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
      userId
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
        id
        name
        number
      }
      role {
        roleName
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

export const GetAllApplications = gql`
  mutation ($id: ID!) {
    getAllApplications(input: $id) {
      id
      date
      application {
        id
        name
        description
      }
      status {
        status
      }
    }
  }
`;

export const DeleteApplication = gql`
  mutation ($id: ID!) {
    deleteApplication(id: $id)
  }
`;

export const GetAllRole = gql`
  query {
    getAllRole {
      id
      roleName
    }
  }
`;

export const GetAllGender = gql`
  query {
    getAllGender {
      id
      codeGender
      genderName
    }
  }
`;

export const GetAllDepartment = gql`
  query {
    getAllDepartment {
      id
      name
      number
    }
  }
`;

export const CreateUser = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $middleName: String!
    $email: String!
    $phone: String!
    $role: ID!
    $gender: ID!
    $department: ID!
  ) {
    createUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        middleName: $middleName
        email: $email
        phone: $phone
        role: $role
        gender: $gender
        department: $department
      }
    ) {
      id
    }
  }
`;

export const CreateLogin = gql`
  mutation ($login: String!, $password: String!, $user: ID!) {
    createLogin(input: { login: $login, password: $password, user: $user }) {
      id
      login
      password
    }
  }
`;

export const GetAllLoginList = gql`
  mutation {
    getAllLogin {
      login
    }
  }
`;

export const GetAllApplicationsAdmin = gql`
  mutation {
    getAllApplicationsAdmin {
      id
      date
      application {
        id
        name
        description
        userId
        user {
          department {
            name
            number
          }
        }
      }
      status {
        id
        status
      }
    }
  }
`;

export const GetAllStatus = gql`
  mutation {
    getAllStatus {
      id
      status
    }
  }
`;

export const ChangeStatus = gql`
  mutation ($id: ID!, $statusId: ID!) {
    changeStatus(input: { id: $id, statusId: $statusId }) {
      date
    }
  }
`;
