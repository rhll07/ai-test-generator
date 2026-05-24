const DIMENSIONS = 256;

const tokenize = (text) => {
  return String(text).toLowerCase().match(/[a-z0-9_./:-]+/g) || [];
};

const hashToken = (token) => {
  let hash = 2166136261;
  for (let index = 0; index < token.length; index += 1) {
    hash ^= token.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const createEmbedding = (text) => {
  const vector = Array.from({ length: DIMENSIONS }, () => 0);

  for (const token of tokenize(text)) {
    const hash = hashToken(token);
    const index = hash % DIMENSIONS;
    const sign = hash % 2 === 0 ? 1 : -1;
    vector[index] += sign;
  }

  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => Number((value / magnitude).toFixed(6)));
};
