import { getRoleData } from "./resolvers/getRoleData";
import { updateRoleFilter } from "./resolvers/updateRoleFilter";
import { timeCommitmentRange } from "./resolvers/timeCommitmentRange";
import { timeCommitmentRanges } from "./resolvers/timeCommitmentRanges";
import { updateRoleAmount } from "./resolvers/updateRoleAmount";
import { roleDetail } from "./resolvers/roleDetail";
import { clearRoleFilter } from "./resolvers/clearRoleFilter";
// import { filtered } from "./resolvers/filteredRoles";

const resolvers = {
  Query: {
    getRoleData,
  },
  Mutation: {
    updateRoleFilter,
    clearRoleFilter,
    updateRoleAmount,
  },
  RoleData: {
    roleDetail,
    timeCommitmentRange,
    timeCommitmentRanges,
    // filtered,
  },
};

// console.log("Resolvers", resolvers);

export { resolvers };
