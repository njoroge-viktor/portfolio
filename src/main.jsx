import React from 'react'
import ReactDOM from 'react-dom/client'

// Bootstrap first (reboot + grid + utilities), then Tailwind layers, then the
// design system last so its tokens and 3D rules win any specificity ties.
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import './styles/theme.css'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
