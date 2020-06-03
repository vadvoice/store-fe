export const minArrayItems = min => value => (value && value.length < min) ? `must be at least ${min} elements selected` : undefined;
