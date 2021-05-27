const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { readFileSync } = require("fs");
const express = require("express");
const cors = require("cors");
const Service = require("./service/service");

const app = express();

app.use(cors());

// Read GraphQL file
const schemaString = readFileSync("./service/schema.graphql", {
  encoding: "utf8",
});

const Schema = buildSchema(schemaString);

// GraphQL implementation methods
const root = {
  getAllApplicationTemplates: () => {
    return Service.GetAllApplicationTemplates();
  },
  createApplicationTemplate: (input) => {
    return Service.CreateApplicationTemplate(input.input);
  },
  login: (input) => {
    return Service.Login(input.input);
  },
  getUserById: (input) => {
    return Service.GetUserById(input.id);
  },
  changeUser: (input) => {
    return Service.ChangeUser(input.input);
  },
  createApplication: (input) => {
    return Service.CreateApplication(input.input);
  },
  createApplicationStatus: (input) => {
    return Service.CreateApplicationStatus(input.input);
  },
  getAllApplications: (input) => {
    return Service.GetAllApplications(input.input);
  },
  deleteApplication: (input) => {
    return Service.DeleteApplication(input.id);
  },
  getAllRole: () => {
    return Service.GetAllRoles();
  },
  getAllGender: () => {
    return Service.GetAllGender();
  },
  getAllDepartment: () => {
    return Service.GetAllDepartment();
  },
  createLogin: (input) => {
    return Service.CreateLogin(input.input);
  },
  createUser: (input) => {
    return Service.CreateUser(input.input);
  },
  getAllLogin: () => {
    return Service.GetAllLogin();
  },
  getAllApplicationsAdmin: () => {
    return Service.GetAllApplicationsAdmin();
  },
  getAllStatus: () => {
    return Service.GetAllStatus();
  },
  changeStatus: (input) => {
    return Service.ChangeStatus(input.input);
  },
  createDepartment: (input) => {
    return Service.CreateDepartment(input.input);
  },
};

// GUI GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
    pretty: true,
    rootValue: root,
  })
);

app.listen(5000, () =>
  console.log(`
    Server started
    
    server url => \t http://localhost:5000 
    graphql url => \t http://localhost:5000/graphql
    `)
);
