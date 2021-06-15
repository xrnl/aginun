import gql from "graphql-tag";

const RoleSummaryFieldsFragment = gql`
  fragment RoleSummaryFields on role {
    id
    title
    timeCommitmentMin
    timeCommitmentMax
    dueDate
    workingCircleId
    localGroupId
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
    filledDate
    workingCircleId
    localGroupId
  }
`;

/* 
queries all roles with:
 - a title, responsibilities, description or requirements containing $search (for the selected language)
 - no filledDate
 - dueDate in the future or no dueDate
 - all other conditions specified in the where clause.
*/
export const RolesSearchQuery = gql`
  query RolesSearch(
    $limit: Int!
    $offset: Int!
    $localGroupIds: [Int!]
    $workingCircleIds: [Int!]
    $timeCommitmentMin: Int!
    $timeCommitmentMax: Int!
    $search: String!
    $language: String!
  ) {
    rolesSearch(
      args: { selected_language: $language, search: $search }
      where: {
        _and: [
          { localGroupId: { _in: $localGroupIds } }
          { workingCircleId: { _in: $workingCircleIds } }
          { timeCommitmentMin: { _lte: $timeCommitmentMax } }
          { timeCommitmentMax: { _gte: $timeCommitmentMin } }
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
      returning {
        ...RoleFields
      }
    }
  }
  ${RoleFieldsFragment}
`;

export const FillRoleMutation = gql`
  mutation FillRole($id: Int!, $filledDate: timestamptz!) {
    update_role(
      where: { id: { _eq: $id } }
      _set: { filledDate: $filledDate }
    ) {
      returning {
        id
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
