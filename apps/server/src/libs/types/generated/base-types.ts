import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IUserDocument } from '../../../modules/user/user.model';
import { IAuthDocument } from '../../../modules/auth/auth.model';
import { ServerContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type FieldWrapper<T> = T;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  EmailAddress: { input: string; output: string; }
  JSON: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type Auth = {
  __typename?: 'Auth';
  _id: FieldWrapper<Scalars['ID']['output']>;
  createdAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  refreshToken?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  token?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  updatedAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  userId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type CachePurgeInput = {
  identifier?: InputMaybe<Scalars['String']['input']>;
  types: Array<Scalars['String']['input']>;
};

export type CreateAuthInput = {
  refreshToken: Scalars['String']['input'];
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuth: FieldWrapper<Auth>;
  createManyAuth: Array<FieldWrapper<Auth>>;
  createManyUser: Array<FieldWrapper<User>>;
  createUser: FieldWrapper<User>;
  deleteAuth: FieldWrapper<Auth>;
  deleteManyAuth: Array<FieldWrapper<Auth>>;
  deleteManyUser: Array<FieldWrapper<User>>;
  deleteUser: FieldWrapper<User>;
  updateAuth: FieldWrapper<Auth>;
  updateManyAuth: Array<FieldWrapper<Auth>>;
  updateManyUser: Array<FieldWrapper<User>>;
  updateUser: FieldWrapper<User>;
};


export type MutationCreateAuthArgs = {
  data: CreateAuthInput;
};


export type MutationCreateManyAuthArgs = {
  datas: Array<CreateAuthInput>;
};


export type MutationCreateManyUserArgs = {
  datas: Array<CreateUserInput>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteAuthArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteManyAuthArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeleteManyUserArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUpdateAuthArgs = {
  data: UpdateAuthInput;
};


export type MutationUpdateManyAuthArgs = {
  datas: Array<UpdateAuthInput>;
};


export type MutationUpdateManyUserArgs = {
  datas: Array<UpdateUserInput>;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllAuth: Array<Maybe<FieldWrapper<Auth>>>;
  getAllAuthCount: FieldWrapper<Scalars['Int']['output']>;
  getAllUser: Array<Maybe<FieldWrapper<User>>>;
  getAllUserCount: FieldWrapper<Scalars['Int']['output']>;
  getAuthById?: Maybe<FieldWrapper<Auth>>;
  getOneAuth?: Maybe<FieldWrapper<Auth>>;
  getOneUser?: Maybe<FieldWrapper<User>>;
  getUserById?: Maybe<FieldWrapper<User>>;
  serverHello: FieldWrapper<Scalars['String']['output']>;
};


export type QueryGetAllAuthArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllAuthCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllUserArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllUserCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAuthByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetOneAuthArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetOneUserArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetUserByIdArgs = {
  _id: Scalars['ID']['input'];
};

export type UpdateAuthInput = {
  _id: Scalars['ID']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  _id: Scalars['ID']['input'];
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: FieldWrapper<Scalars['ID']['output']>;
  bio?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  createdAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  email?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  isAdmin?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  password?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  status?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  updatedAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type UnwrappedObject<T> = {
        [P in keyof T]: T[P] extends infer R | Promise<infer R> | (() => infer R2 | Promise<infer R2>)
          ? R & R2 : T[P]
      };
export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Auth: ResolverTypeWrapper<IAuthDocument>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  CachePurgeInput: CachePurgeInput;
  CreateAuthInput: CreateAuthInput;
  CreateUserInput: CreateUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  UpdateAuthInput: UpdateAuthInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<IUserDocument>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Auth: IAuthDocument;
  ID: Scalars['ID']['output'];
  String: Scalars['String']['output'];
  CachePurgeInput: CachePurgeInput;
  CreateAuthInput: CreateAuthInput;
  CreateUserInput: CreateUserInput;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Query: {};
  Int: Scalars['Int']['output'];
  UpdateAuthInput: UpdateAuthInput;
  UpdateUserInput: UpdateUserInput;
  User: IUserDocument;
}>;

export type CachePurgeDirectiveArgs = {
  payloads: Array<CachePurgeInput>;
};

export type CachePurgeDirectiveResolver<Result, Parent, ContextType = ServerContext, Args = CachePurgeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheSetDirectiveArgs = {
  identifier: Scalars['String']['input'];
  maxAge?: Maybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type CacheSetDirectiveResolver<Result, Parent, ContextType = ServerContext, Args = CacheSetDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsMhAdminDirectiveArgs = { };

export type IsMhAdminDirectiveResolver<Result, Parent, ContextType = ServerContext, Args = IsMhAdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Auth']>, { __typename: 'Auth' } & GraphQLRecursivePick<UnwrappedObject<ParentType>, {"_id":true}>, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createAuth?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationCreateAuthArgs, 'data'>>;
  createManyAuth?: Resolver<Array<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationCreateManyAuthArgs, 'datas'>>;
  createManyUser?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateManyUserArgs, 'datas'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  deleteAuth?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationDeleteAuthArgs, '_id'>>;
  deleteManyAuth?: Resolver<Array<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationDeleteManyAuthArgs, 'filter'>>;
  deleteManyUser?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteManyUserArgs, 'filter'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, '_id'>>;
  updateAuth?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationUpdateAuthArgs, 'data'>>;
  updateManyAuth?: Resolver<Array<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationUpdateManyAuthArgs, 'datas'>>;
  updateManyUser?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateManyUserArgs, 'datas'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
}>;

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllAuth?: Resolver<Array<Maybe<ResolversTypes['Auth']>>, ParentType, ContextType, Partial<QueryGetAllAuthArgs>>;
  getAllAuthCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllAuthCountArgs>>;
  getAllUser?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryGetAllUserArgs>>;
  getAllUserCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllUserCountArgs>>;
  getAuthById?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<QueryGetAuthByIdArgs, '_id'>>;
  getOneAuth?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, Partial<QueryGetOneAuthArgs>>;
  getOneUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetOneUserArgs>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, '_id'>>;
  serverHello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['User']>, { __typename: 'User' } & GraphQLRecursivePick<UnwrappedObject<ParentType>, {"_id":true}>, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ServerContext> = ResolversObject<{
  Auth?: AuthResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ServerContext> = ResolversObject<{
  cachePurge?: CachePurgeDirectiveResolver<any, any, ContextType>;
  cacheSet?: CacheSetDirectiveResolver<any, any, ContextType>;
  isMHAdmin?: IsMhAdminDirectiveResolver<any, any, ContextType>;
}>;
