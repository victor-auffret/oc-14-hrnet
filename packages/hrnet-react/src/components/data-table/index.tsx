import { FunctionComponent, useMemo, useState } from 'react';
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

 console.log(props)

 const [tri, setTri] = useState("")
 const [desc, setDesc] = useState(false)

 const data = useMemo(() => {
  return props.data.sort((a, b) => {
   const order = desc ? 1 : -1
   if (a[tri] < b[tri]) {
    return -order
   }
   if (a[tri] > b[tri]) {
    return order
   }
   return 0
  })
 }, [props.data, tri, desc])

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
    <thead>
     <tr>
      {
       props.columns.map(cols => (<th scope="col">{cols.title}</th>))
      }
     </tr>
    </thead>
    <tbody>
     DONNES
     {
      data.map(emp => (
       <tr>
        {props.columns.map(col => (<td>{emp[col.data]}</td>))}
       </tr>
      ))
     }
    </tbody>
    <tfoot>
     <p> Showing 0 to 0 of 0 entries </p>
     <nav>
      <button>Previous</button>
      <button>Next</button>
     </nav>
    </tfoot>
   </table>

  </div>
 </div>
}

export { DataTableComponent }
