export const minTextLength = min => value => (value && value.length < min) ? `min is ${min}` : undefined;
