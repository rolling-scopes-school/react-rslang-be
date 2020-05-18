/* eslint-disable prettier/prettier */
const addMethods = schema => {
  // eslint-disable-next-line func-names
  schema.method('toResponse', function () {
    const { _id, ...rest } = this.toJSON();
    delete rest.password;
    delete rest.__v;
    return { id: _id, ...rest };
  });
  // eslint-disable-next-line func-names
  schema.method('fromRequest', function () {
    console.log(this);
  });
};

module.exports = { addMethods };
