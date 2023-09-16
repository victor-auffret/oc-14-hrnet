import { FunctionComponent, useEffect, useMemo, useState } from 'react';
// import { NavLink } from 'react-router-dom';

import { usePagination } from './hoock';

import "./index.css"

const SHOW = [10, 25, 50, 100]

interface IColumn {
 title: string,
 data: string
}

interface ITriParam {
 prop: string,
 desc: boolean
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

 const [tabMaxPerPage] = useState(props.listNbPerPage.length > 0 ? props.listNbPerPage : SHOW)

 const [tri, privateSetTri] = useState<ITriParam>({ prop: "", desc: false })

 const setTri = (t: React.SetStateAction<ITriParam>) => {
  privateSetTri(t)
  setCurrentPage(0)
 }

 const [maxPerPageIndex, setMaxPerPageIndex] = useState(0)

 const maxPage = useMemo(() => {
  return Number(Math.round(props.data.length / tabMaxPerPage[maxPerPageIndex]))
 }, [maxPerPageIndex, props.data.length])

 const { currentPage, prev, next, canPrev, canNext, setCurrentPage } = usePagination({ currentPage: 0, maxPage })

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
   for (const [_, value] of Object.entries<string>(props.data[i])) {
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
   return () => setTri((t: any) => {
    document.querySelectorAll(".sorting, .sorting_asc, .sorting_desc").forEach(e => {
     e.classList.remove("sorting_asc")
     e.classList.remove("sorting_desc")
     e.classList.remove("sorting")
     if (e.id != `col-${title.toLowerCase().split(" ").join("-")}`) {
      e.classList.add("sorting")
     } else {
      const suffix = !t.desc ? "_desc" : "_asc"
      e.classList.add(`sorting${suffix}`)
     }
    })
    return { prop: title, desc: !t.desc }
   })
  }
  return (<thead>
   <tr>
    {
     /* className={`sorting${cols.title == tri.prop ? (tri.desc ? "_desc" : "_asc") : ""}`} */
     props.columns.map((cols, i) => (<th
      scope="col"
      key={`col-${i}`}
      id={`col-${cols.title.toLowerCase().split(" ").join("")}`}
      className={`sorting${i == 0 ? "_asc" : ""}`}
      onClick={toogleSort(cols.data)}
     >
      {cols.title}
     </th>)
     )
    }
   </tr>
  </thead>)
 }, [tri])

 const handleChangeMaxPerPage = (e: any) => {
  setCurrentPage(0)
  setMaxPerPageIndex(Number(e.target.value))
 }

 useEffect(() => {
  setTri({ prop: props.columns[0].data, desc: tri.desc })
 }, [])

 return <div id="employee-table_wrapper" className="dataTables_wrapper no-footer">

  <div className="dataTables_length" id="employee-table_length">
   <label htmlFor="show">
    Show <select name="employee-table_length" aria-controls="employee-table" onChange={handleChangeMaxPerPage}> {SHOW.map((n, i) => <option value={i} key={`max-per-page-${i}`}> {n} </option>)} </select> entries
   </label>
  </div>

  <div id="employee-table_filter" className="dataTables_filter">
   <label htmlFor="search">
    Search:
    <input type="text" name="search" id="search" aria-controls="employee-table" onChange={handleSearch} />
   </label>
  </div>

  <table id="employee-table" className="display dataTable">

   {tableauTri}

   {
    <tbody>
     {
      sortedResult.filter((_, i) => {
       const min = currentPage * tabMaxPerPage[maxPerPageIndex]
       const max = min + tabMaxPerPage[maxPerPageIndex]
       return (min <= i && i < max)
      }).map((emp, i) => (<tr role="row" className={`${i % 2 == 0 ? "odd" : "even"}`} key={`data-line-${i}`}>
       {props.columns.map((col, j) => (<td key={`elem-${i}-to-${j}`} >{emp[col.data]}</td>))}
      </tr>)
      )
     }
    </tbody>
   }
  </table>

  <div className="dataTables_info" id="employee-table_info" role="status">
   Showing {currentPage * tabMaxPerPage[maxPerPageIndex] + 1} to {Math.min(props.data.length, currentPage * tabMaxPerPage[maxPerPageIndex] + tabMaxPerPage[maxPerPageIndex])} of {props.data.length} entries
  </div>

  <div className="dataTables_paginate paging_simple_numbers" id="employee-table_paginate">
   <a
    className={`paginate_button previous ${!canPrev ? "disabled" : ""}`}
    id="employee-table_previous"
    onClick={prev}
    aria-controls="employee-table"
    data-dt-idx={0}
    tabIndex={-1}
   >
    Previous
   </a>
   <span>
    {
     Array.from(Array((sortedResult.length - (sortedResult.length % tabMaxPerPage[maxPerPageIndex])) / tabMaxPerPage[maxPerPageIndex] + 1),
      (_, i) => {
       return (
        <a
         className={`paginate_button ${currentPage == i ? "current" : ""}`}
         aria-controls="employee-table"
         data-dt-idx={i + 1}
         tabIndex={0}
         onClick={() => setCurrentPage(i)}
         key={`pagination-page-${i}`}
        >
         {i + 1}
        </a>
       )
      })
    }
   </span>
   { /* <button onClick={next} disabled={!canNext}>Next</button> */}
   <a
    className={`paginate_button next ${!canNext ? "disabled" : ""}`}
    aria-controls="employee-table"
    data-dt-idx="3" tabIndex={0}
    id="employee-table_next"
    onClick={next}
   >
    Next
   </a>
  </div>

 </div>

}

export { DataTableComponent }
