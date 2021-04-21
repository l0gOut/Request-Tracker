import { gql } from '@apollo/client';

export const GET_LOGIN = (login, password) => {

    return gql`

    getLogin(input: {
        login: ${login}
        password: ${password}
    })

`

}