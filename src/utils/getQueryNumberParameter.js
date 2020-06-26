module.exports = (param, defaultValue) => {
  return param ? parseInt(param, 10) : defaultValue;
};
