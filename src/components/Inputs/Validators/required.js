// returns error if value or array are empty
export const required = value => {
  const message = 'required'
  if (!value) {
    return message
  }
  if (Array.isArray(value) && !value.length) {
    return message;
  }
}
