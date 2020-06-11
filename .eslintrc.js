/*
👋 “Hey” from the Praxis team
This configuration file already implements our standard lint rules, including compatability with prettier.
*/

module.exports = {
  // see https://git.target.com/Praxis-Framework/create-praxis-app/tree/master/packages/eslint-config-praxis
  extends: ['@praxis/eslint-config-praxis'],
  rules: {
    'no-console': 0, //change this depending on your development needs
    // add or override additional rules here: https://eslint.org/docs/rules/
  },
}
