import { FunctionComponent } from 'react';

import "./index.css"

interface IState {
 abbreviation: string,
 name: string
}

interface IProps {
 states: IState[],
 childRef: any
}

const SelectStateComponent: FunctionComponent<IProps> = (props: IProps) => {
 return <select name="state" id="state" ref={props.childRef}>
  {props.states.map(e => <option value={e.abbreviation}>{e.name}</option>)}
 </select>
}

export { SelectStateComponent }
