import prisma from '../../db/db';
import authenticationMiddleware from '../../middlewares/authentication.middleware';
import { Resolvers } from '../user/generated-types/user-resolvers-types';
import UserService from './services/user.service';
const services = new UserService();
export const userResolver: Resolvers = {
  Query: {
    me: authenticationMiddleware((parent, args, context) => {
      return services.getLoggedInUser(context.user.id);
    }),
  },
  Mutation: {
    login: async (parent, args, context) => {
      return services.loginUser(args.input);
    },
    registerUser: async (parent, args, context) => {
      return services.registerUser(args.input);
    },
  },
};
