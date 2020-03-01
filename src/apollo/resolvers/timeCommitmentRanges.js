import gql from "graphql-tag";

const query = gql`
  query TimeCommitmentRanges {
    time_commitment_ranges {
      range
    }
  }
`;

const parseArray = data => {
  let p = data.range
    .replace(/^\[/g, "")
    .replace(/\]$/g, "")
    .replace(/"/g, "")
    .split(",");
  return {
    __typename: "Range",
    min: parseInt(p[0], 10),
    max: parseInt(p[1], 10),
  };
};

export const timeCommitmentRanges = async (...[, , { client }]) => {
  const {
    data: { time_commitment_ranges },
  } = await client.query({
    query,
  });
  return time_commitment_ranges.map(d => parseArray(d));
};
