import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
// import { NavLink } from 'react-router-dom';

import "./index.css"

interface IColumn {
 title: string,
 data: string
}

interface IProps {
 data: any[],
 columns: IColumn[]
}

const SHOW = [10, 25, 50, 100]

const DataTableComponent: FunctionComponent<IProps> = (props: IProps) => {

 const [tri, setTri] = useState({ prop: "", desc: true })

 // TODO : filtres search

 const data = useMemo(() => {

  let order = props.data.sort((a, b) => {
   if (tri.prop in a && tri.prop in b) {
    if (a[tri.prop] < b[tri.prop]) {
     return 1
    }
    if (a[tri.prop] > b[tri.prop]) {
     return -1
    }
   }
   return 0
  })
  return tri.desc ? order : order.reverse()
 }, [props.data, tri.desc, tri.prop, tri])

 const tableauTri = useMemo(() => {
  const up = (title: string) => {
   return () => setTri({ prop: title, desc: true })
  }
  const down = (title: string) => {
   return () => setTri({ prop: title, desc: false })
  }
  return (<thead>
   <tr>
    {
     props.columns.map(cols => (<th scope="col">
      {cols.title}
      <button onClick={up(cols.data)}> UP </button>
      <button onClick={down(cols.data)}> DOWN </button>
     </th>))
    }
   </tr>
  </thead>)
 }, [])

 return <div>
  <header>
   <nav>
    <form action="#">
     <label htmlFor='show'>Show</label>
     <select name="show" id="show">
      {SHOW.map(n => <option value={n}> {n} </option>)}
     </select>
     entries

     <label htmlFor="search">Search: </label>
     <input type="text" name="search" id="search" />
    </form>
   </nav>
  </header>

  <div>

   <table id="employee-table" className="display">

    {tableauTri}

    {
     <tbody>
      {
       data.map(emp => (
        <tr>
         {props.columns.map(col => (<td>{emp[col.data]}</td>))}
        </tr>
       ))
      }
     </tbody>
    }

    <tfoot>
     <p> Showing 0 to 0 of 0 entries </p>
     <nav>
      <button>Previous</button>
      <button>Next</button>
     </nav>
    </tfoot>
   </table>

  </div>
 </div >
}

export { DataTableComponent }
