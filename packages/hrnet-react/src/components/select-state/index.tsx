import { FunctionComponent, useMemo } from 'react';

import { states } from "../../constantes/states"

import "./index.css"

interface IProps {

}

const SelectStateComponent: FunctionComponent<IProps> = (props: IProps) => {
 return <select name="state" id="state">
  {states.map(e => <option value={e.abbreviation}>{e.name}</option>)}
 </select>
}

export { SelectStateComponent }
