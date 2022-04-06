const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        gameCount: Int
        savedGames: [Game]
    }

    type Game {
        author: [String]
        description: String
        gameId: String
        image: String
        link: String
        title: String
        comments: [Comment]
    }

    type Comment {
        user: String
        text: String
        createdAt: Date
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(bookId: String!, title: String!, image:String, link:String, author:[String], description: String!): User
        removeBook(bookId:String!): User
    }   
`;

module.exports = typeDefs;