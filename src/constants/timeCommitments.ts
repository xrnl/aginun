interface TimeCommitment {
  min: number;
  max: number;
}

export const timeCommitments: TimeCommitment[] = [
  { min: 1, max: 5 },
  { min: 6, max: 10 },
  { min: 11, max: 20 },
  { min: 21, max: 30 }
];
export const timeCommitmentRange: TimeCommitment = {
  min: timeCommitments[0].min,
  max: timeCommitments[timeCommitments.length - 1].max
};
