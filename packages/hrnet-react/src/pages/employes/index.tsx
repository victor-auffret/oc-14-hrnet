import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
}

const PageEmployes: FunctionComponent<IProps> = (props: IProps) => {
 return <div id="employee-div" className="container">
  <h1>Current Employees</h1>
  <table id="employee-table" className="display"></table>
  <NavLink className={`error-back`} to={'/'}> Home </NavLink>
 </div>
}

export { PageEmployes }