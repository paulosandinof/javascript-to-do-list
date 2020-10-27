const { v4: uuid } = require("uuid");

module.exports = function (description, responsible) {
  return {
    id: uuid(),
    description,
    responsible,
  };
};
