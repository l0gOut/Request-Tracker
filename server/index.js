const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')
const { readFileSync } = require('fs');
const express = require('express');
const cors = require('cors');
const Service = require('./service/service')

const app = express();

app.use(cors());

// Read GraphQL file
const schemaString = readFileSync('./service/schema.graphql', { 
    encoding: 'utf8' 
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
    getLogin: (input) => {
        return Service.GetLogin(input.input);
    },
}

// GUI GraphQL
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true,
    pretty: true,
    rootValue: root,
}));

app.listen(5000, () => 
    console.log(`
    Server started
    
    server url => \t http://localhost:5000 
    graphql url => \t http://localhost:5000/graphql
    `)
);



