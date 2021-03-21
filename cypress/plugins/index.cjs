module.exports = (on, config) => {
  // custom tasks for sending and reporting code coverage
  on('task', require('@cypress/code-coverage/task'))


  // this line instruments spec files and loaded unit test code
  on(
    'file:preprocessor',
    require('@cypress/code-coverage/use-browserify-istanbul')
  )
}