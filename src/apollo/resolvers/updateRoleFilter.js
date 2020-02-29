import { GetFilter } from "../gql/role.gql";
import { LocalGroups, WorkingGroups } from "../gql/other.gql";
import { getRoleData } from "./getRoleData";

// utility functions that maps the names of the groups in the dropdown boxes in the drawer
// to their corresponding ids in the database
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

export const getGroupData = (type, names, cache) => {
  const query = type === "local_group" ? LocalGroups : WorkingGroups;
  const { [type]: groups } = cache.readQuery({
    query,
  });
  return mapNames(names, groups);
};

export const getGroupIdByName = (type, names, cache) => {
  const query = type === "local_group" ? LocalGroups : WorkingGroups;
  const { [type]: groups } = cache.readQuery({
    query,
  });
  return mapNames(names, groups).map(({ id }) => id);
};

export const getGroupNameById = (type, names, cache) => {
  const query = type === "local_group" ? LocalGroups : WorkingGroups;
  const { [type]: groups } = cache.readQuery({
    query,
  });
  return mapNames(names, groups).map(({ name }) => name);
};

export const updateRoleFilter = (
  _,
  { localGroups, workingGroups, timeCommitment, searchString },
  { cache, client }
) => {
  const {
    roleData: { filter },
  } = cache.readQuery({
    query: GetFilter,
  });
  console.log(cache);

  if (localGroups) {
    if (localGroups.length) {
      filter.selectedLocalGroups = getGroupData(
        "local_group",
        localGroups,
        cache
      );
    } else {
      filter.selectedLocalGroups = null;
    }
  }
  if (workingGroups) {
    if (workingGroups.length) {
      filter.selectedWorkingGroups = getGroupData(
        "working_group",
        workingGroups,
        cache
      );
    } else {
      filter.selectedWorkingGroups = null;
    }
  }
  if (timeCommitment) {
    filter.selectedTimeCommitmentMin = timeCommitment[0];
    filter.selectedTimeCommitmentMax = timeCommitment[1];
  }
  if (searchString) {
    filter.searchString = `%${searchString}%`;
  }

  filter.id = "filter";
  filter.__typename = "Filter";

  client.writeQuery({
    query: GetFilter,
    data: {
      roleData: {
        id: "data",
        __typename: "RoleData",
        filter: {
          ...filter,
        },
      },
    },
  });

  // await getRoleData(_, {}, { cache, client });
  // console.log("[mutation] updateRoleFilter", filter);
  return filter;
};
