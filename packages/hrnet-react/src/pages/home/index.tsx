import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SelectStateComponent } from "../../components/select-state"
import { states } from "../../utils/states"

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

  const [employees, setEmployees] = useState<IEmployee[]>([])

  useEffect(() => {
    let save = globalThis.localStorage.getItem('employees')
    if (save != null) {
      setEmployees(JSON.parse(save))
    }
  }, [])

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

      setEmployees(old => [...old, employee])
      globalThis.localStorage.setItem('employees', JSON.stringify(employees));

    },
    [employees]
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
          <SelectStateComponent states={states} childRef={state} />

          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" ref={zipCode} />

        </fieldset>

        <label htmlFor="department">Department</label>
        <select name="department" id="department" ref={department} >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
      </form>

      <button onClick={saveEmployee}>Save</button>
    </div>
    <div id="confirmation" className="modal">Employee Created!</div>
  </>
}

export { PageHome }
