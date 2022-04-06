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
        gameComments: [Comment]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addGame(gameId: String!, title: String!, image:String, link:String, author:[String], description: String!): User
        removeGame(gameId:String!): User
        addComment(user: String!, text: String, createdAt: Date) Game
    }   
`;

module.exports = typeDefs;