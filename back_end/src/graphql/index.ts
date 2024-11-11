import { readFileSync } from 'fs';
import path from 'path';
import { userResolver } from '../modules/user/resolvers';
const userTypes = readFileSync(
  path.join(__dirname, '../modules/user/typedefs/user.graphql')
);
const couponTypes = readFileSync(
  path.join(__dirname, '../modules/coupon/typedefs/coupon.graphql')
);
import { GraphQLScalarType } from 'graphql';
import { couponResolver } from '../modules/coupon/resolvers';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',

  description: 'Date custom scalar type',

  serialize(value) {
    if (value instanceof Date) {
      return value.toJSON(); // Convert outgoing Date to integer for JSON
    }

    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },

  parseValue(value) {
    if (typeof value === 'string') {
      return new Date(value); // Convert incoming JSON Date to Date
    }

    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
});

export const typeDefs = [
  `
${userTypes}
${couponTypes}
`,
];
export const resolvers = [{ Date: dateScalar }, userResolver, couponResolver];
