import gql from "graphql-tag";

// queries

export const GetRoles = gql`
  query GetRoles(
    $limit: Int
    $searchString: String
    $selectedLocalGroupIds: [Int!]
    $selectedWorkingGroupIds: [Int!]
    $selectedTimeCommitmentMin: Int
    $selectedTimeCommitmentMax: Int
  ) {
    role(
      where: {
        local_group: { id: { _in: $selectedLocalGroupIds } }
        working_group: { id: { _in: $selectedWorkingGroupIds } }
        time_commitment_min: { _gte: $selectedTimeCommitmentMin }
        time_commitment_max: { _lte: $selectedTimeCommitmentMax }
        name: { _ilike: $searchString }
      }
      limit: $limit
    ) {
      id
      name
      location
      time_commitment_min
      time_commitment_max
      date_added
      due_date
      local_group {
        name
      }
      working_group {
        name
      }
    }
  }
`;

export const GetTimeCommitmentRangeRole = gql`
  query GetTimeCommitmentRangeRole {
    getRoleData @client {
      timeCommitmentRange
    }
  }
`;

export const GetFilter = gql`
  query GetFilter {
    roleData @client {
      filter {
        # ...RoleFilterFragment
        limit
        searchString
        selectedLocalGroups
        selectedWorkingGroups
        selectedTimeCommitmentMin
        selectedTimeCommitmentMax
      }
    }
  }
`;

export const RoleDetailServer = gql`
  query RoleDetailServer($id: Int!) {
    role(where: { id: { _eq: $id } }) {
      email
      phone
      mattermost_id
      description
      requirements
      responsibilities
      due_date
      date_added
    }
  }
`;

export const RoleDetailClient = gql`
  query RoleDetailClient($id: Int!) {
    getRoleData @client {
      roleDetail(id: $id) {
        id
        name
        location
        time_commitment_min
        time_commitment_max
        date_added
        due_date
        local_group {
          name
        }
        working_group {
          name
        }
        email
        phone
        mattermost_id
        description
        requirements
        responsibilities
        due_date
        date_added
      }
    }
  }
`;

export const RoleAllInfoServer = gql`
  query RoleAllInfoServer($id: Int!) {
    role(where: { id: { _eq: $id } }) {
      id
      name
      location
      time_commitment_min
      time_commitment_max
      date_added
      due_date
      local_group {
        name
      }
      working_group {
        name
      }
      email
      phone
      mattermost_id
      description
      requirements
      responsibilities
      due_date
      date_added
    }
  }
`;

export const TimeCommitmentRanges = gql`
  query TimeCommitmentRanges {
    getRoleData @client {
      timeCommitmentRanges {
        min
        max
      }
    }
  }
`;

export const GetRoleData = gql`
  query GetRoleData {
    roleData @client {
      filter {
        limit
        searchString
        selectedLocalGroups
        selectedWorkingGroups
        selectedTimeCommitmentMin
        selectedTimeCommitmentMax
      }
      amount
      filtered {
        roles {
          id
          name
          location
          time_commitment_min
          time_commitment_max
          date_added
          due_date
          local_group {
            name
          }
          working_group {
            name
          }
        }
      }
      timeCommitmentRange
    }
  }
`;

// mutations

export const UpdateSearchString = gql`
  mutation UpdateSearchString($search: String!) {
    updateSearchString(search: $search) @client
  }
`;

export const UpdateRoleFilter = gql`
  mutation UpdateRoleFilter(
    $localGroups: [String!]
    $workingGroups: [String!]
    $timeCommitment: [Int!]
    $searchString: String
  ) {
    updateRoleFilter(
      searchString: $searchString
      localGroups: $localGroups
      workingGroups: $workingGroups
      timeCommitment: $timeCommitment
    ) @client
  }
`;

export const ClearRoleFilter = gql`
  mutation ClearRoleFilter {
    clearRoleFilter @client
  }
`;

export const RoleAmount = gql`
  mutation RoleAmount($amount: Int!) {
    updateRoleAmount(amount: $amount) @client
  }
`;

export const InsertRole = gql`
  mutation InsertRole(
    $name: String!
    $location: String
    $time_commitment_min: Int!
    $time_commitment_max: Int!
    $local_group_id: Int
    $working_group_id: Int
    $email: String!
    $phone: String
    $mattermost_id: String
    $description: String!
    $requirements: String!
    $responsibilities: String!
    $date_added: date
    $due_date: date
  ) {
    insert_role(
      objects: {
        name: $name
        location: $location
        time_commitment_min: $time_commitment_min
        time_commitment_max: $time_commitment_max
        local_group_id: $local_group_id
        working_group_id: $working_group_id
        email: $email
        phone: $phone
        mattermost_id: $mattermost_id
        description: $description
        requirements: $requirements
        responsibilities: $responsibilities
        date_added: $date_added
        due_date: $due_date
      }
    ) {
      affected_rows
    }
  }
`;

export const DeleteRole = gql`
  mutation DeleteRole($id: Int!) {
    __typename
    delete_role(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
