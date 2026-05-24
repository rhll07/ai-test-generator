export const cosineSimilarity = (left, right) => {
  if (!left?.length || !right?.length || left.length !== right.length) return 0;

  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index];
    leftMagnitude += left[index] * left[index];
    rightMagnitude += right[index] * right[index];
  }

  const denominator = Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude);
  return denominator ? dot / denominator : 0;
};

export const rankBySimilarity = (queryEmbedding, candidates, limit = 5) => {
  return candidates
    .map((candidate) => ({
      ...candidate,
      score: cosineSimilarity(queryEmbedding, candidate.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
