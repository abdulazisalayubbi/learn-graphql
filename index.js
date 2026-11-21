import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type CurrentWeather {
    time: String
    temperature_2m: Float
    weather_code: Int
  }

  type Weather {
    latitude: Float
    longitude: Float
    current: CurrentWeather
  }

  type Query {
    weather: Weather
  }
`;
// 2. Define your resolvers
const resolvers = {
  Query: {

    weather: async () => {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.85&current=temperature_2m,weather_code'
      );
      return res.json();
    },
  },
};

// 3. Start the server
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);

