import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Coupon = {
  __typename?: 'Coupon';
  code: Scalars['String'];
  id: Scalars['Int'];
};

export type CouponCreateInput = {
  code: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  expiresAt: Scalars['Date'];
  id: Scalars['Int'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCoupon: Coupon;
  login?: Maybe<LoginResponse>;
  redeemCoupon: Coupon;
  registerUser?: Maybe<User>;
  startGame: StartGameResponse;
};


export type MutationCreateCouponArgs = {
  coupon: CouponCreateInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRedeemCouponArgs = {
  couponCode: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  input: UserCreateInput;
};


export type MutationStartGameArgs = {
  randomNumber: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getCoupons: Array<Coupon>;
  me?: Maybe<User>;
};

export type StartGameResponse = {
  __typename?: 'StartGameResponse';
  attemptsRemaining: Scalars['Int'];
  numberGenerated: Scalars['Int'];
  pointsAdded: Scalars['Int'];
  totalPoints: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  attempts: Scalars['Int'];
  dob: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  points: Scalars['Int'];
};

export type UserCreateInput = {
  dob: Scalars['Date'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'User', attempts: number, dob: any, email: string, id: string, points: number } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', expiresAt: any, id: number, token: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', attempts: number, dob: any, email: string, id: string, points: number } | null };

export type StartGameMutationVariables = Exact<{
  randomNumber: Scalars['Int'];
}>;


export type StartGameMutation = { __typename?: 'Mutation', startGame: { __typename?: 'StartGameResponse', attemptsRemaining: number, numberGenerated: number, pointsAdded: number, totalPoints: number } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', getCoupons: Array<{ __typename?: 'Coupon', code: string, id: number }> };

export type CreateCouponMutationVariables = Exact<{
  coupon: CouponCreateInput;
}>;


export type CreateCouponMutation = { __typename?: 'Mutation', createCoupon: { __typename?: 'Coupon', code: string, id: number } };

export type RedeemCouponMutationVariables = Exact<{
  couponCode: Scalars['String'];
}>;


export type RedeemCouponMutation = { __typename?: 'Mutation', redeemCoupon: { __typename?: 'Coupon', code: string, id: number } };


export const RegisterDocument = gql`
    mutation Register($input: UserCreateInput!) {
  registerUser(input: $input) {
    attempts
    dob
    email
    id
    points
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    expiresAt
    id
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    attempts
    dob
    email
    id
    points
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const StartGameDocument = gql`
    mutation StartGame($randomNumber: Int!) {
  startGame(randomNumber: $randomNumber) {
    attemptsRemaining
    numberGenerated
    pointsAdded
    totalPoints
  }
}
    `;
export type StartGameMutationFn = Apollo.MutationFunction<StartGameMutation, StartGameMutationVariables>;

/**
 * __useStartGameMutation__
 *
 * To run a mutation, you first call `useStartGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startGameMutation, { data, loading, error }] = useStartGameMutation({
 *   variables: {
 *      randomNumber: // value for 'randomNumber'
 *   },
 * });
 */
export function useStartGameMutation(baseOptions?: Apollo.MutationHookOptions<StartGameMutation, StartGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartGameMutation, StartGameMutationVariables>(StartGameDocument, options);
      }
export type StartGameMutationHookResult = ReturnType<typeof useStartGameMutation>;
export type StartGameMutationResult = Apollo.MutationResult<StartGameMutation>;
export type StartGameMutationOptions = Apollo.BaseMutationOptions<StartGameMutation, StartGameMutationVariables>;
export const QueryDocument = gql`
    query Query {
  getCoupons {
    code
    id
  }
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const CreateCouponDocument = gql`
    mutation CreateCoupon($coupon: CouponCreateInput!) {
  createCoupon(coupon: $coupon) {
    code
    id
  }
}
    `;
export type CreateCouponMutationFn = Apollo.MutationFunction<CreateCouponMutation, CreateCouponMutationVariables>;

/**
 * __useCreateCouponMutation__
 *
 * To run a mutation, you first call `useCreateCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCouponMutation, { data, loading, error }] = useCreateCouponMutation({
 *   variables: {
 *      coupon: // value for 'coupon'
 *   },
 * });
 */
export function useCreateCouponMutation(baseOptions?: Apollo.MutationHookOptions<CreateCouponMutation, CreateCouponMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCouponMutation, CreateCouponMutationVariables>(CreateCouponDocument, options);
      }
export type CreateCouponMutationHookResult = ReturnType<typeof useCreateCouponMutation>;
export type CreateCouponMutationResult = Apollo.MutationResult<CreateCouponMutation>;
export type CreateCouponMutationOptions = Apollo.BaseMutationOptions<CreateCouponMutation, CreateCouponMutationVariables>;
export const RedeemCouponDocument = gql`
    mutation RedeemCoupon($couponCode: String!) {
  redeemCoupon(couponCode: $couponCode) {
    code
    id
  }
}
    `;
export type RedeemCouponMutationFn = Apollo.MutationFunction<RedeemCouponMutation, RedeemCouponMutationVariables>;

/**
 * __useRedeemCouponMutation__
 *
 * To run a mutation, you first call `useRedeemCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedeemCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redeemCouponMutation, { data, loading, error }] = useRedeemCouponMutation({
 *   variables: {
 *      couponCode: // value for 'couponCode'
 *   },
 * });
 */
export function useRedeemCouponMutation(baseOptions?: Apollo.MutationHookOptions<RedeemCouponMutation, RedeemCouponMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RedeemCouponMutation, RedeemCouponMutationVariables>(RedeemCouponDocument, options);
      }
export type RedeemCouponMutationHookResult = ReturnType<typeof useRedeemCouponMutation>;
export type RedeemCouponMutationResult = Apollo.MutationResult<RedeemCouponMutation>;
export type RedeemCouponMutationOptions = Apollo.BaseMutationOptions<RedeemCouponMutation, RedeemCouponMutationVariables>;