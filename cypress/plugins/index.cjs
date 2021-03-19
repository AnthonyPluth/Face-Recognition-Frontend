import babelrc from '@cypress/code-coverage/use-babelrc';

module.exports = (on, config) => {
  require("@cypress/code-coverage/task")(on, config);
  on("file:preprocessor", babelrc);

  return config;
};
