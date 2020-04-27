import gql from "graphql-tag";

const RoleSummaryFieldsFragment = gql`
  fragment RoleSummaryFields on role {
    id
    title
    timeCommitmentMin
    timeCommitmentMax
    workingCircle {
      title
      id
    }
    localGroup {
      title
      id
    }
  }
`;

const RoleFieldsFragment = gql`
  fragment RoleFields on role {
    id
    title
    responsibilities
    description
    requirements
    timeCommitmentMin
    timeCommitmentMax
    email
    mattermostId
    phone
    createdDate
    dueDate
    workingCircle {
      title
      id
    }
    localGroup {
      title
      id
    }
  }
`;

export const RolesQuery = gql`
  query Roles(
    $limit: Int!
    $offset: Int!
    $localGroupIds: [Int!]
    $workingCircleIds: [Int!]
    $timeCommitmentMin: Int!
    $timeCommitmentMax: Int!
    $search: String!
  ) {
    roles(
      where: {
        _and: [
          { localGroupId: { _in: $localGroupIds } }
          { workingCircleId: { _in: $workingCircleIds } }
          { timeCommitmentMin: { _gte: $timeCommitmentMin } }
          { timeCommitmentMax: { _lte: $timeCommitmentMax } }
          { title: { _ilike: $search } }
        ]
      }
      order_by: { createdDate: desc }
      limit: $limit
      offset: $offset
    ) {
      ...RoleSummaryFields
    }
  }
  ${RoleSummaryFieldsFragment}
`;

export const RoleQuery = gql`
  query Role($roleId: Int!) {
    role(id: $roleId) {
      ...RoleFields
    }
  }
  ${RoleFieldsFragment}
`;

export const CreateRoleMutation = gql`
  mutation CreateRole($input: [role_insert_input!]!) {
    insert_role(objects: $input) {
      returning {
        ...RoleFields
      }
    }
  }
  ${RoleFieldsFragment}
`;

export const UpdateRoleMutation = gql`
  mutation UpdateRole($id: Int!, $input: role_set_input!) {
    update_role(where: { id: { _eq: $id } }, _set: $input) {
      affected_rows
      returning {
        ...RoleFields
      }
    }
  }
  ${RoleFieldsFragment}
`;

export const DeleteRoleMutation = gql`
  mutation DeleteRole($id: Int!) {
    delete_role(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
