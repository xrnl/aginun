import {
  SelectedLocalGroups,
  SelectedWorkingGroups,
  SelectedTimeCommitment,
  LocalGroupById,
  RoleAmount,
} from "../gql/client.gql";
import { LocalGroups, WorkingGroups } from "../gql/server.gql";

const mapNames = (names, groups) => {
  const matched = names.map(name => {
    let group;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].name === name) {
        group = groups[i];
        break;
      }
    }
    return group;
  });
  return matched;
};

const testLocalQuery = async (_, { client, getCacheKey }) => {
  const data = await client.query({
    query: LocalGroupById,
    variables: { id: 1 },
  });
  console.log(data);
};

const updateLocalGroups = (_, { names }, { cache }) => {
  const { local_group: groups } = cache.readQuery({
    query: LocalGroups,
  });
  cache.writeQuery({
    query: SelectedLocalGroups,
    data: { selectedLocalGroups: mapNames(names, groups) },
  });
  // console.log(cache.data.data.ROOT_QUERY.selectedLocalGroups);
  return null;
};

const updateWorkingGroups = (_, { names }, { cache }) => {
  const { working_group: groups } = cache.readQuery({
    query: WorkingGroups,
  });
  cache.writeQuery({
    query: SelectedWorkingGroups,
    data: { selectedWorkingGroups: mapNames(names, groups) },
  });
  // console.log(cache.data.data.ROOT_QUERY.selectedWorkingGroups);
  return null;
};

const updateTimeCommitmentRange = (_, { range }, { cache }) => {
  cache.writeQuery({
    query: SelectedTimeCommitment,
    data: { selectedTimeCommitment: range },
  });
  // console.log(cache.data.data.ROOT_QUERY.selectedTimeCommitment);
  return null;
};

const updateRoleAmount = (_, { amount }, { cache }) => {
  cache.writeQuery({
    query: RoleAmount,
    data: { roleAmount: amount },
  });
  // console.log(cache.data.data.ROOT_QUERY.roleAmount);
  return null;
};

const roleById = (_, { id }, { cache }) => {
  // cache.writeQuery({
  //   query: RoleAmount,
  //   data: { roleAmount: id },
  // });
  // console.log(cache.data.data.ROOT_QUERY.roleAmount);
  console.log("ROLE", id);
  return {
    id: 555,
    name: "Your perfect role",
    description: "More perfect than ever!",
  };
};

export const resolvers = {
  Mutation: {
    updateLocalGroups,
    updateWorkingGroups,
    updateTimeCommitmentRange,
    updateRoleAmount,
    roleById,
  },

  Query: {
    localGroupById(parent, variables, { cache, getCacheKey, client }, info) {
      console.log(parent, variables, info);
      return [
        {
          __typename: "LocalGroup",
          id: 555,
          name: "XR Apeldoorn",
        },
      ];
    },
  },
};
