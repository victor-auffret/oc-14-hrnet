import { FunctionComponent, useCallback, useMemo, useState } from 'react';

import "./index.css"

interface IElements {
 value: string,
 text: string,
}

interface IProps {
 listElements: IElements[],
 nameId: string,
 childRef: any
}

const SelectStateComponent: FunctionComponent<IProps> = (props: IProps) => {

 const [currentValue, setPrivateCurrentValue] = useState(0)
 const [open, setOpen] = useState(false)

 const ToggleList = useCallback(() => setOpen(v => !v), [])
 const setCurrentValue = (v: number) => {
  setPrivateCurrentValue(v)
  //console.log(props.listElements)
  props.childRef.current.value = props.listElements[v].value ?? props.childRef.current.value
  //console.log(props.childRef.current.value)
  setOpen(false)
 }

 const List = useMemo(() => {
  return open ? (<div className="select-fake-list">
   {
    props.listElements.map((e, i) => <span className="select-fake-list-item" key={`select-${e.value}-${i}`} onClick={() => setCurrentValue(i)}>{e.text}</span>)
   }
  </div>) : null
 }, [open, currentValue])

 return <div>
  <select className="select-real-hide" name={props.nameId} id={props.nameId} ref={props.childRef}>
   {props.listElements.map((e, i) => <option key={`select-${e.value}-${i}`} value={e.value}>{e.text}</option>)}
  </select>
  <div className="select-fake-container">
   <div className="select-fake-current-value" onClick={ToggleList}>
    {props.listElements[currentValue]?.text ?? ""}
    <span className="icon-triangle" ></span>
   </div>
   {List}
  </div>
 </div>
}

export { SelectStateComponent }
