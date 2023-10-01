import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import { router } from "./Router"

import { EmployeContext, IEmploye } from './utils/context';

import "./index.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Main = () => {
  const [employes, setEmployes] = useState<IEmploye[]>([])
  const addEmploye = (employe: IEmploye) => {
    setEmployes([...employes, employe])
  }

  return <React.StrictMode>
    <EmployeContext.Provider value={{ employes, addEmploye }}>
      <RouterProvider router={router} />
    </EmployeContext.Provider>
  </React.StrictMode>

}

root.render(<Main />)
