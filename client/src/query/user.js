import { gql } from '@apollo/client';

export const GET_ALL_TEMPLATES = gql`

    query {
        getAllApplicationTemplates {
            name
            description
        }
    }

`