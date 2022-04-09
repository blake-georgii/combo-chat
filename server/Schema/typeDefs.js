const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedGames: [Int]
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
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me: User
        listAllSavedGames(gameId: Int!): [Game]
        returnGame: Game
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addGameToDB(gameId: String!, title: String!, image:String, link:String, author:[String], description: String!): Game
        addGameToList(gameId: String!, title: String!, image:String, link:String, author:[String], description: String!): User
        removeGameFromList(gameId:String!): User
        addComment(user: String!, text: String): Game
    }   
`;

module.exports = typeDefs;