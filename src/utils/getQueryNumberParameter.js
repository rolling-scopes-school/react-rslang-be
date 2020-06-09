module.exports = (param, defaultValue) => {
  const value = defaultValue ? defaultValue : 0;
  return param ? parseInt(param, 10) : value;
};
