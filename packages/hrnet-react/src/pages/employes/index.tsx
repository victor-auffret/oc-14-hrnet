import { FunctionComponent, useMemo, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DataTableComponent } from 'oc-14-hrnet-plugin-react-table';
// ça marche
import "../../../../../node_modules/oc-14-hrnet-plugin-react-table/dist/style.css";
import { EmployeContext } from '../../utils/context';

// ça ne marche pas 
//import "oc-14-hrnet-plugin-react-table/style.css";


const PageEmployes: FunctionComponent = () => {

 const { employes: data } = useContext(EmployeContext)

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
