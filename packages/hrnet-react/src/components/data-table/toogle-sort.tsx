import { FunctionComponent, useCallback, useMemo } from 'react';

interface ITri {
 props: string,
 desc: boolean
}

interface IProps {
 title: string,
 active: boolean,
 desc: boolean,
 toogleSort: () => void
 /*setTri: (((a: ITri) => ITri) => void);*/
}

const ToogleSortBtn: FunctionComponent<IProps> = (props: IProps) => {
 /*
 const toogleSort = useCallback(() => {
  props.setTri((t: ITri) => { prop: props.title, desc: !t.desc })
 },
  [])*/
 const toogleClass = useMemo(() => {
  if (!props.active) {
   return "sorting"
  }
  return props.desc ? "sorting_desc" : "sorting_asc"
 }, [props.active, props.desc])

 return (<th scope="col" className={toogleClass} onClick={props.toogleSort}>
  {props.title}
 </th>)
}

export { ToogleSortBtn }
