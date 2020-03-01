import gql from "graphql-tag";

export const NavbarHeight = gql`
  query NavbarHeight {
    navbarHeight @client
  }
`;

export const WorkingGroups = gql`
  query WorkingGroups {
    working_group {
      id
      name
    }
  }
`;

export const LocalGroups = gql`
  query LocalGroups {
    local_group {
      id
      name
    }
  }
`;
