import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import ComponentsRoutes from './ComponentsRoutes'
import serviceWorker from './serviceWorker'
const state = window.__state__
delete window.__state__

const App = () => (
    <Router>
      <ComponentsRoutes state={state} />
    </Router>
)

ReactDOM.hydrate(<App suppressHydrationWarning={true} />, document.getElementById('root'))
//serviceWorker()