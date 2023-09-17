import { FunctionComponent, useCallback, useMemo, useState } from 'react';

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
0.1) récupérer tout les élements du storage (déjà fait)
0.2) copie ces éléments dans un state
1) appliquer un filtre sur ces éléments (search)
2) appliquer un tri (sort) sur ces éléments 
3) appliquer le système de pagination
4) afficher le résultat
*/

const DataTableComponent: FunctionComponent<IProps> = (props: IProps = {
  data: [],
  columns: [],
  listNbPerPage: SHOW
}) => {

  // copie des données en entré
  const data = useMemo(() => props.data, [props.data])
  // copie des columns
  const columns = useMemo(() => props.columns, [props.columns])
  // liste du nombre d'élement à afficher par page
  const listNbPerPage = useMemo(() => props.listNbPerPage.length > 0 ? props.listNbPerPage : SHOW, [props.listNbPerPage])

  // pointe vers l'index du tableau tabMaxPerPage pour connaitre le nombre d'élement à afficher
  const [maxPerPageIndex, setMaxPerPageIndex] = useState(0)

  // critère de tri + ordre croissant ou décroissant de tri
  const [critereTri, setCritereTri] = useState(columns[0].data ?? "")
  const [desc, setDesc] = useState(false)

  // champ de recherche pour filtrer les lignes
  const [search, setSearch] = useState("")

  // on input change : on change la valeur de search pour filtrer
  const handleSearch = (e: any) => setSearch(e.target.value)

  // étape 1 : filtrer les résultats
  const filtredResult = useMemo(() => {
    if (search == "") {
      return data
    }
    let res = []
    for (let i = 0; i < data.length; i++) {
      let trouve = false
      for (const [_, value] of Object.entries<string>(data[i])) {
        if (!trouve && value.toLowerCase().includes(search.toLowerCase())) {
          res.push(data[i])
          trouve = true
          break;
        }
      }
    }
    return res
  }, [data, search])


  // pagination
  const [currentPage, setCurrentPage] = useState(0)
  const canPrev = useMemo(() => currentPage > 0, [currentPage])
  const canNext = useMemo(() =>
    (currentPage + 1) * listNbPerPage[maxPerPageIndex] < filtredResult.length,
    [currentPage, listNbPerPage, maxPerPageIndex, filtredResult.length]
  )
  const prev = useCallback(() => {
    if (canPrev) {
      setCurrentPage(n => n - 1)
    }
  }, [canPrev])
  const next = useCallback(() => {
    if (canNext) {
      setCurrentPage(n => n + 1)
    }
  }, [canNext])

  // en-tête du tableau avec les boutons de tri
  const theadOrderLine = useMemo(() => {
    // change l'ordre au clic
    const toogleSort = (title: string) => {
      return () => {
        document.querySelectorAll(".sorting, .sorting_asc, .sorting_desc").forEach(e => {
          e.classList.remove("sorting_asc")
          e.classList.remove("sorting_desc")
          e.classList.remove("sorting")
          if (e.id != `col-${title.toLowerCase().split(" ").join("-")}`) {
            e.classList.add("sorting")
          } else {
            e.classList.add(`sorting${!desc ? "_desc" : "_asc"}`)
          }
        })

        setCritereTri(title)
        setDesc(d => !d)
        setCurrentPage(0)

      }
    }

    return (<thead>
      <tr>
        {
          columns.map((cols, i) => (<th
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
  }, [columns, critereTri, desc])

  // étape 2 : on tri les résultats
  const sortedResult = useMemo(() => {
    let order = filtredResult.sort((a, b) => {
      if (critereTri in a && critereTri in b) {
        if (a[critereTri] < b[critereTri]) {
          return 1
        }
        if (a[critereTri] > b[critereTri]) {
          return -1
        }
      }
      return 0
    })
    return desc ? order : order.reverse()
  }, [filtredResult, critereTri, desc])

  const handleChangeMaxPerPage = (e: any) => {
    // changer le nombre d'element par page
    setMaxPerPageIndex(Number(e.target.value))
    // retour à la première page pour correspondre au comportement de jquery
    setCurrentPage(0)
  }

  // on affiche le tout

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

      {theadOrderLine}

      {
        <tbody>
          {
            sortedResult.filter((_, i) => {
              const min = currentPage * listNbPerPage[maxPerPageIndex]
              const max = min + listNbPerPage[maxPerPageIndex]
              return (min <= i && i < max)
            }).map((emp, i) => (<tr role="row" className={`${i % 2 == 0 ? "odd" : "even"}`} key={`data-line-${i}`}>
              {columns.map((col, j) => (<td key={`elem-${i}-to-${j}`} >{emp[col.data]}</td>))}
            </tr>)
            )
          }
        </tbody>
      }
    </table>

    <div className="dataTables_info" id="employee-table_info" role="status">
      Showing {currentPage * listNbPerPage[maxPerPageIndex] + 1} to {Math.min(data.length, currentPage * listNbPerPage[maxPerPageIndex] + listNbPerPage[maxPerPageIndex])} of {data.length} entries
    </div>

    <div className="dataTables_paginate paging_simple_numbers" id="employee-table_paginate">
      <a
        className={`paginate_button previous ${canPrev ? "" : "disabled"}`}
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
          Array.from(Array((sortedResult.length - (sortedResult.length % listNbPerPage[maxPerPageIndex])) / listNbPerPage[maxPerPageIndex] + 1),
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
      <a
        className={`paginate_button next ${canNext ? "" : "disabled"}`}
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
