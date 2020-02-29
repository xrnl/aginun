import { GetFilter } from "../gql/role.gql";

export const filter = (...[, , { client }]) => {
  const {
    roleData: { filter },
  } = client.readQuery({
    query: GetFilter,
  });

  return {
    searchString: filter.searchString
      ? filter.searchString.replace(/%/g, "")
      : null,
    selectedTimeCommitment: [
      filter.selectedTimeCommitmentMin,
      filter.selectedTimeCommitmentMax,
    ],
    selectedLocalGroups: filter.selectedLocalGroups
      ? filter.selectedLocalGroups.map(({ name }) => name)
      : [],
    selectedWorkingGroups: filter.selectedWorkingGroups
      ? filter.selectedWorkingGroups.map(({ name }) => name)
      : [],
  };
};
