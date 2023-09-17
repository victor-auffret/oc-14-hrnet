import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DataTableComponent } from 'oc-14-hrnet-plugin-react-table';
// ça marche
import "../../../../../node_modules/oc-14-hrnet-plugin-react-table/dist/style.css";

// ça ne marche pas 
//import "oc-14-hrnet-plugin-react-table/style.css";

interface IProps {
}

const PageEmployes: FunctionComponent<IProps> = (props: IProps) => {

 const [data, setData] = useState([])

 useEffect(() => {
  const items = globalThis.localStorage.getItem('employees')
  if (items != null) {
   const employees = JSON.parse(items)
   setData(employees)
  }
 }, [])

 const columns = useMemo(() => {
  return [
   { title: 'First Name', data: 'firstName' },
   { title: 'Last Name', data: 'lastName' },
   { title: 'Start Date', data: 'startDate' },
   { title: 'Department', data: 'department' },
   { title: 'Date of Birth', data: 'dateOfBirth' },
   { title: 'Street', data: 'street' },
   { title: 'City', data: 'city' },
   { title: 'State', data: 'state' },
   { title: 'Zip Code', data: 'zipCode' },
  ]
 }, [])

 return <div id="employee-div" className="container">
  <h1>Current Employees</h1>

  <DataTableComponent data={data} columns={columns} listNbPerPage={[10, 25, 50, 100]} />

  <NavLink className={`error-back`} to={'/'}> Home </NavLink>
 </div>
}

export { PageEmployes }