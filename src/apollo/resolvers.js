import { getRoleData } from "./resolvers/getRoleData";
import { updateRoleFilter } from "./resolvers/updateRoleFilter";
import { timeCommitmentRange } from "./resolvers/timeCommitmentRange";
import { timeCommitmentRanges } from "./resolvers/timeCommitmentRanges";

// import { filtered } from "./resolvers/filteredRoles";
import { updateRoleAmount } from "./resolvers/updateRoleAmount";
import { roleDetail } from "./resolvers/roleDetail";
import { clearRoleFilter } from "./resolvers/clearRoleFilter";

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
    timeCommitmentRange,
    timeCommitmentRanges,
    roleDetail,
    // filtered,
  },
};

// console.log("Resolvers", resolvers);

export { resolvers };
