import { FunctionComponent, useEffect, useMemo, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { ToogleSortBtn } from "./toogle-sort";
import { usePagination } from './hoock';

import "./index.css"

const SHOW = [10, 25, 50, 100]

interface IColumn {
 title: string,
 data: string
}

interface IProps {
 data: any[],
 columns: IColumn[],
 listNbPerPage: number[]
}

// TODO 

/*
1) récupérer tout les élements du storage 
2) sauvegarder ces éléments dans un state 
3) appliquer un tri (sort) sur ces éléments 
4) appliquer un filtre sur ces éléments (search)
5) appliquer le système de pagination
6) afficher le résultat
*/

const DataTableComponent: FunctionComponent<IProps> = (props: IProps = {
 data: [],
 columns: [],
 listNbPerPage: SHOW
}) => {

 const [tri, setTri] = useState({ prop: "", desc: true })

 const [maxPerPageIndex, setMaxPerPageIndex] = useState(0)

 const maxPage = useMemo(() => {
  return Number(Math.round(props.data.length / SHOW[maxPerPageIndex]))
 }, [maxPerPageIndex, props.data.length])

 const { currentPage, prev, next, canPrev, canNext } = usePagination({ currentPage: 0, maxPage })

 // TODO : filtres search
 const [search, setSearch] = useState("")

 const handleSearch = (e: any) => setSearch(e.target.value)

 const filtredResult = useMemo(() => {
  if (search == "") {
   return props.data
  }
  let res = []
  for (let i = 0; i < props.data.length; i++) {
   let trouve = false
   for (const [key, value] of Object.entries<string>(props.data[i])) {
    if (!trouve && value.toLowerCase().includes(search.toLowerCase())) {
     res.push(props.data[i])
     trouve = true
     break;
    }
   }
  }
  return res
 }, [search, props.data])

 const sortedResult = useMemo(() => {

  let order = filtredResult.sort((a, b) => {
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
 }, [filtredResult, tri.desc, tri.prop, tri])

 const tableauTri = useMemo(() => {

  const toogleSort = (title: string) => {
   return () => setTri((t) => {
    document.querySelectorAll(".sorting, .sorting_asc, .sorting_desc").forEach(e => {
     e.classList.remove("sorting_asc")
     e.classList.remove("sorting_desc")
     e.classList.remove("sorting")
     if (e.id != `col-${title.toLowerCase().split(" ").join("-")}`) {
      e.classList.add("sorting")
     } else {
      const suffix = t.desc ? "_desc" : "_asc"
      e.classList.add(`sorting${suffix}`)
     }
    })
    return { prop: title, desc: !t.desc }
   })
  }
  return (<thead>
   <tr>
    {
     props.columns.map((cols, i) => (<th
      scope="col"
      key={`col-${i}`}
      id={`col-${cols.title.toLowerCase().split(" ").join("")}`}
      className={`sorting${cols.title != tri.prop ? "" : (tri.desc ? "_desc" : "_asc")}`}
      onClick={toogleSort(cols.data)}
     >
      {cols.title}
     </th>)
     )
    }
   </tr>
  </thead>)
 }, [])

 return <div>
  <header>
   <nav>
    <form action="#">
     <label htmlFor='show'>Show</label>
     <select name="show" id="show" onChange={(e) => setMaxPerPageIndex(Number(e.target.value))}>
      {SHOW.map((n, i) => <option value={i}> {n} </option>)}
     </select>
     entries

     <label htmlFor="search">Search: </label>
     <input type="text" name="search" id="search" onChange={handleSearch} />
    </form>
   </nav>
  </header>

  <div>

   <table id="employee-table" className="display dataTable">

    {tableauTri}

    {
     <tbody>
      {
       sortedResult.map((emp, i) => (
        <tr role="row" className={`${i % 2 == 0 ? "odd" : "even"}`}>
         {props.columns.map(col => (<td>{emp[col.data]}</td>))}
        </tr>
       ))
      }
     </tbody>
    }

    <tfoot>
     <p> Showing 0 to 0 of {props.data.length} entries </p>
     <nav>
      <button onClick={prev} disabled={!canPrev}>Previous</button>
      <span> {currentPage + 1} </span>
      <button onClick={next} disabled={!canNext}>Next</button>
     </nav>
    </tfoot>
   </table>

  </div>
 </div >
}

export { DataTableComponent }
