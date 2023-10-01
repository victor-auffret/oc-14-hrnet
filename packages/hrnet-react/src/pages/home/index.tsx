import { FunctionComponent, useCallback, useRef, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { SelectStateComponent } from "../../components/select-state"
import { states } from "../../utils/states"
import { ModaleComponent } from '../../components/modale';
import { EmployeContext } from '../../utils/context';

const DEPARTEMENTS = [
  { value: "Sales", text: "Sales" },
  { value: "Marketing", text: "Marketing" },
  { value: "Engineering", text: "Engineering" },
  { value: "Human Resources", text: "Human Resources" },
  { value: "Legal", text: "Legal" }
]

interface IProps {
}

interface IEmployee {
}

const PageHome: FunctionComponent<IProps> = (props: IProps) => {

  const firstName = useRef<HTMLInputElement>(null)
  const lastName = useRef<HTMLInputElement>(null)
  const startDate = useRef<HTMLInputElement>(null)
  const department = useRef<HTMLSelectElement>(null)
  const dateOfBirth = useRef<HTMLInputElement>(null)
  const street = useRef<HTMLInputElement>(null)
  const city = useRef<HTMLInputElement>(null)
  const state = useRef<HTMLSelectElement>(null)
  const zipCode = useRef<HTMLInputElement>(null)

  const [hide, setHide] = useState(true)

  const { employes: employees, addEmploye } = useContext(EmployeContext)

  const saveEmployee = useCallback(
    () => {

      const employee: IEmployee = {
        firstName: firstName.current?.value ?? null,
        lastName: lastName.current?.value ?? null,
        dateOfBirth: dateOfBirth.current?.value ?? null,
        startDate: startDate.current?.value ?? null,
        department: department.current?.value ?? null,
        street: street.current?.value ?? null,
        city: city.current?.value ?? null,
        state: state.current?.value ?? null,
        zipCode: zipCode.current?.value ?? null
      };

      addEmploye(employee)

      //console.log("add employe", employee)

      setHide(false)
    },
    [employees, setHide]
  );

  return <>
    <div className="title">
      <h1>HRnet</h1>
    </div>
    <div className="container">
      <NavLink className={`error-back`} to={'/employes'}> View Current Employees </NavLink>
      <h2>Create Employee</h2>

      <form action="#" id="create-employee">

        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" ref={firstName} />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" ref={lastName} />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input id="date-of-birth" type="date" ref={dateOfBirth} />

        <label htmlFor="start-date">Start Date</label>
        <input id="start-date" type="date" ref={startDate} />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" ref={street} />

          <label htmlFor="city">City</label>
          <input id="city" type="text" ref={city} />

          <label htmlFor="state">State</label>
          <SelectStateComponent nameId="state" listElements={states.map((v, i) => {
            return {
              value: v.abbreviation,
              text: v.name
            }
          })} childRef={state} />

          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" ref={zipCode} />

        </fieldset>

        <label htmlFor="department">Department</label>
        <SelectStateComponent nameId="department" listElements={DEPARTEMENTS} childRef={department} />

      </form>

      <br />

      <button onClick={saveEmployee}>Save</button>
    </div>
    <ModaleComponent hidden={hide} setHidden={setHide}>
      Employee Created!
    </ModaleComponent>
  </>
}

export { PageHome }
