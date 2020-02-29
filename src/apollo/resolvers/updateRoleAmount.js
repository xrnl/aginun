import gql from "graphql-tag";

const query = gql`
  query GetRoleAmount {
    roleData @client {
      amount
    }
  }
`;

export const updateRoleAmount = (...[, { amount }, { cache }]) => {
  cache.writeQuery({
    query,
    data: {
      roleData: {
        id: "data",
        __typename: "RoleData",
        amount,
      },
    },
  });

  return amount;
};
