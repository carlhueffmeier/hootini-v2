const gql = require('graphql-tag');

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(data: { name: $name, email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(data: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

exports.ME_QUERY = ME_QUERY;
exports.SIGNUP_MUTATION = SIGNUP_MUTATION;
exports.SIGNIN_MUTATION = SIGNIN_MUTATION;
