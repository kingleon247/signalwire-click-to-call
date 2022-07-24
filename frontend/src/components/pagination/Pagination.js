import React, { useState } from "react"

function usePagination(data, itemsPerPage) {
    const [activePage, setActivePage] = useState(1)
    const maxPage = Math.ceil(data.length / itemsPerPage)

    function activeData() {
        const begin = (activePage - 1) * itemsPerPage
        const end = begin + itemsPerPage
        return data.slice(begin, end)
    }

    function jump(page) {
        const pageNumber = Math.max(1, page)
        setActivePage(activePage => Math.min(pageNumber, maxPage))
    }

    function prev() {
        setActivePage(activePage => Math.max(activePage - 1, 1))
    }

    function next() {
        setActivePage(activePage => Math.min(activePage + 1, maxPage))
    }

    return { next, prev, jump, activeData, activePage, maxPage }
}

export default usePagination
