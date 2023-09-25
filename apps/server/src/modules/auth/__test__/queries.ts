import { CreateAuthInput, UpdateAuthInput } from "../../../libs/types";

export const getAuthById = (_id: string) => {
  return {
    query: ` 
      query getAuthById($_id: ID!) {
        getAuthById(_id: $_id) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
      `,
    variables: {
      _id: _id,
    },
  };
};

export const getAllAuth = (
  search: string,
  filter: any,
  sort: any,
  limit: number,
  offset: number
) => {
  return {
    query: `
      query getAllAuth($search:String, $filter: JSON, $sort: JSON, $limit: Int, $offset: Int) {
        getAllAuth(search:$search, filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
  `,
    variables: {
      search: search,
      filter: filter,
      sort: sort,
      limit: limit,
      offset: offset,
    },
  };
};

export const getOneAuth = (filter: any, sort: any) => {
  return {
    query: `
      query getOneAuth($filter: JSON, $sort: JSON) {
        getOneAuth(filter: $filter, sort: $sort) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
  `,
    variables: {
      filter: filter,
      sort: sort,
    },
  };
};

export const getAllAuthCount = (search: string, filter: any) => {
  return {
    query: `
      query getAllAuthCount($search: String, $filter: JSON) {
        getAllAuthCount(filter: $filter, search: $search) 
      }
  `,
    variables: {
      search: search,
      filter: filter,
    },
  };
};

export const createAuth = (data: CreateAuthInput) => {
  return {
    query: `
      mutation createAuth($data: CreateAuthInput!) {
        createAuth(data: $data) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const createManyAuth = (datas: CreateAuthInput[]) => {
  return {
    query: `
      mutation createManyAuth($datas: [CreateAuthInput!]!) {
        createManyAuth(datas: $datas) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const updateAuth = (data: UpdateAuthInput) => {
  return {
    query: `
      mutation updateAuth($data: UpdateAuthInput!) {
        updateAuth(data: $data) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const updateManyAuth = (datas: UpdateAuthInput[]) => {
  return {
    query: `
      mutation updateManyAuth($datas: [UpdateAuthInput!]!) {
        updateManyAuth(datas: $datas) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const deleteAuth = (_id: string) => {
  return {
    query: `
      mutation deleteAuth($_id: ID!) {
        deleteAuth(_id: $_id) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
  `,
    variables: {
      _id: _id,
    },
  };
};

export const deleteManyAuth = (filter: any) => {
  return {
    query: `
      mutation deleteManyAuth($filter: JSON!) {
        deleteManyAuth(filter: $filter) {
          _id
          createdAt
          updatedAt
          token
refreshToken
userId
        }
      }
  `,
    variables: {
      filter: filter,
    },
  };
};
