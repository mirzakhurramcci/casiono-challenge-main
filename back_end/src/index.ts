import { Application, urlencoded, json, static as estatic } from 'express';
import rateLimiter from './middlewares/rate.limit.middleware';
import passport from 'passport';
import passportMiddleware from './middlewares/passport.middleware';
import cors from 'cors';
import helmet = require('helmet');
import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from './graphql';
import { expressMiddleware } from '@apollo/server/express4';
import path = require('path');
export default class Server {
  constructor(app: Application) {
    (async () => {
      await this.config(app);
    })();
  }

  public async config(app: Application): Promise<void> {
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(rateLimiter()); //  apply to all requests
    passportMiddleware(passport);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          return { req, res };
        },
      })
    );
    app.use('/', estatic(path.join(__dirname, '../www')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../www/index.html'));
    });
  }
}

process.on('beforeExit', function (err) {
  console.error(err);
});
