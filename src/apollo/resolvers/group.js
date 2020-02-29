import { LocalGroups, WorkingGroups } from "../gql/other.gql";
import { SelectedLocalGroups, SelectedWorkingGroups } from "../gql/role.gql";
import { getRoles } from "./role";
/*
export const updateLocalGroups = (_, { names }, { cache, client }) => {
  const { local_group: groups } = cache.readQuery({
    query: LocalGroups,
  });
  cache.writeQuery({
    query: SelectedLocalGroups,
    data: { selectedLocalGroupIds: mapNames(names, groups) },
  });
  // console.log(cache.data.data.ROOT_QUERY.selectedLocalGroups);
  getRoles(cache, client);
  return null;
};

export const updateWorkingGroups = (...[, { names }, { cache, client }]) => {
  const { working_group: groups } = cache.readQuery({
    query: WorkingGroups,
  });
  cache.writeQuery({
    query: SelectedWorkingGroups,
    data: { selectedWorkingGroups: mapNames(names, groups) },
  });
  getRoles(cache, client);
  // console.log(cache.data.data.ROOT_QUERY.selectedWorkingGroups);
  return null;
};
*/
