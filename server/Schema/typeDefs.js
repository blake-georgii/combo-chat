const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedGames: [Int]
    }

    type Comment {
        user: String
        text: String
    }

    type Game {
        gameId: String
        title: String
        image: String
        comments: [Comment]
    }
    type Auth {
        token: ID!
        user: User
      }
    type Query {
        me: User
        getAllGames: [Game]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addGameToDB(gameId: Int!, title: String!, image:String): Game
        addGameToList(savedGames: Int!): User
        removeGameFromList(gameId:String!): User
        addComment(user: String!, text: String): Game
    }   
`;

module.exports = typeDefs;