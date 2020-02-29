import { GetRoleData } from "../gql/role.gql";
// import gql from "graphql-tag";

export const getRoleData = async (
  parent,
  variables,
  { cache, client },
  info
) => {
  console.log("[query] getRoleData");
  const data = await client.readQuery({
    query: GetRoleData,
  });
  // console.log("getRoleData", variables, data);
  return data.roleData;
};
