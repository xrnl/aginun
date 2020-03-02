import gql from "graphql-tag";

// incomplete! but it works nonetheless

export const RoleFilter = gql`
  type RoleFilter {
    limit: Int!
    searchString: String!
    selectedLocalGroupIds: [Int!]!
    selectedWorkingGroupIds: [Int!]!
    selectedTimeCommitmentMin: Int!
    selectedTimeCommitmentMax: Int!
  }
`;
