import { Outlet } from 'react-router-dom'

import './App.css'

const App = () => {
  return (
    <div className="app">
      <main id="main">
        <Outlet />
      </main>
    </div>
  )
}

export default App
