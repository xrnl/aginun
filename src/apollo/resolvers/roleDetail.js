import {
  FilteredRoles,
  RoleDetailServer,
  RoleAllInfoServer,
} from "../gql/role.gql";

const parseResponsibilities = r => {
  if (r.indexOf("|") === -1) {
    return r;
  }
  let p = r
    // .replace(/^\[/g, "")
    // .replace(/\]$/g, "")
    // .replace(/"/g, "")
    .split("|");
  return p;
};

export const roleDetail = async (_, { id }, { cache, client }) => {
  // let role = cache.data.data[`role:${id}`];
  // console.log("roleDetail", id, `role:${id}`, cache.data.data["local_group:1"]);
  // const roles = cache.readQuery({
  //   query: FilteredRoles,
  // });

  // let role = roles.roles.filter(r => r.id === parseInt(id, 10))[0];
  // if (role) {
  //   const data = await client.query({
  //     query: RoleDetailServer,
  //     variables: { id },
  //   });
  //   const details = parseDetails(data.data.role[0]);
  //   return {
  //     ...role,
  //     // ...details,
  //   };
  // }

  const data = await client.query({
    query: RoleAllInfoServer,
    variables: { id },
  });

  const role = data.data.role[0];
  role.responsibilities = parseResponsibilities(role.responsibilities);

  // client.writeQuery({
  //   query: FilteredRoles,
  //   data: { roles: [role] },
  // });

  return role;
};
