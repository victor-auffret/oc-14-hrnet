import { useCallback, useMemo, useState } from "react"

interface IPageOption {
 currentPage: number
 maxPage: number
}

const usePagination = (pageOption: IPageOption) => {
 const [currentPage, setCurrentPage] = useState(pageOption.currentPage)

 const canPrev = useMemo(() => currentPage > 0, [currentPage])
 const canNext = useMemo(() => currentPage + 1 < pageOption.maxPage, [currentPage, pageOption.maxPage])

 const prev = useCallback(() => {
  if (canPrev) {
   setCurrentPage(p => p - 1)
  }
 }, [canPrev])

 const next = useCallback(() => {
  if (canNext) {
   setCurrentPage(p => p + 1)
  }
 }, [canNext])

 return { currentPage, prev, next, canPrev, canNext }
}

export { usePagination }
