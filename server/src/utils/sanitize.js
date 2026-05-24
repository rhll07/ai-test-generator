const dangerousKeyPattern = /^\$|\./;

export const sanitizeText = (value = '') => {
  return String(value)
    .replace(/\0/g, '')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .trim();
};

export const sanitizeObject = (input) => {
  if (Array.isArray(input)) return input.map(sanitizeObject);
  if (!input || typeof input !== 'object') {
    return typeof input === 'string' ? sanitizeText(input) : input;
  }

  return Object.entries(input).reduce((acc, [key, value]) => {
    if (!dangerousKeyPattern.test(key)) {
      acc[key] = sanitizeObject(value);
    }
    return acc;
  }, {});
};

export const isLikelyPromptInjection = (value = '') => {
  const text = value.toLowerCase();
  return [
    'ignore previous instructions',
    'ignore all instructions',
    'system prompt',
    'developer message',
    'reveal your prompt',
    'bypass safety'
  ].some((phrase) => text.includes(phrase));
};
