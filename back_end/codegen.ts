import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/modules/user/generated-types/user-resolvers-types.ts': {
      schema: './src/modules/user/typedefs/user.graphql',
      config: {
        useIndexSignature: true,
        mappers: {
          User: '../../../types/models/user.model#SanitizedUser',
        },
        inputMaybeValue: 'undefined | T',
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './src/modules/coupon/generated-types/coupon-resolvers-types.ts': {
      schema: './src/modules/coupon/typedefs/coupon.graphql',
      config: {
        useIndexSignature: true,
        mappers: {
          User: '../../../types/models/user.model#SanitizedUser',
        },
        inputMaybeValue: 'undefined | T',
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './react/apollo.ts': {
      schema: [
        './src/modules/user/typedefs/user.graphql',
        './src/modules/coupon/typedefs/coupon.graphql',
      ],
      documents: ['./react/operations/*.graphql'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        inputMaybeValue: 'undefined | T',
      },
    },
  },
};
export default config;
