import React from 'react'
import ReactDOM from 'react-dom'
import { onError } from '@praxis/component-logging'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { theme } from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

// Standard errors will be automatically logged to STDOUT when thrown.
// The logging sidecar in TAP will process and send logs to the appropriate environment in Kibana.
// Learn more about TAP sidecars: https://tapdocs.prod.target.com/runtime/sidecars/#_platform_sidecars
window.onerror = onError

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
