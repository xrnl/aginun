import { updateRoleFilter } from "./updateRoleFilter";
import gql from "graphql-tag";

const query1 = gql`
  query GetTimeCommitmentRangeRoleFromServer {
    role_aggregate {
      aggregate {
        min {
          time_commitment_min
        }
        max {
          time_commitment_max
        }
      }
    }
  }
`;

const query2 = gql`
  query GetTimeCommitmentRangeRoleFromCache {
    roleData @client {
      timeCommitmentRange
    }
  }
`;

export const timeCommitmentRange = async (...[, , { cache, client }]) => {
  const data = await client.query({
    query: query1,
  });
  // console.log(data);
  const range = [
    data.data.role_aggregate.aggregate.min.time_commitment_min,
    data.data.role_aggregate.aggregate.max.time_commitment_max,
  ];
  console.log("[field] timeCommitmentRange", range);

  cache.writeQuery({
    query: query2,
    data: {
      roleData: {
        id: "data",
        __typename: "RoleData",
        timeCommitmentRange: range,
      },
    },
  });

  // update the filter: set the default commitment range to the full time range
  updateRoleFilter({}, { timeCommitment: range }, { cache, client });

  return range;
};
