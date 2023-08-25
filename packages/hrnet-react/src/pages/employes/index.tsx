import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { DataTableComponent } from '../../components/data-table';

interface IProps {
}

const PageEmployes: FunctionComponent<IProps> = (props: IProps) => {
 return <div id="employee-div" className="container">
  <h1>Current Employees</h1>

  <DataTableComponent data={[]} columns={[]} />

  <NavLink className={`error-back`} to={'/'}> Home </NavLink>
 </div>
}

export { PageEmployes }