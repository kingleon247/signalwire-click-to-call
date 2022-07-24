import React, { useState } from "react"
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'

import usePagination from "@/components/pagination/Pagination"
import { dataTableData } from "@/components/pagination/dataTableData"

export default function App() {
    // console.log('table - data: ', data)
    // console.log('table - data.rows: ', data.rows)
    let [page, setPage] = useState(1)
    const itemsPerPage = 24
    const { calls: data } = dataTableData

    const count = Math.ceil(data.length / itemsPerPage)
    const paginationData = usePagination(data, itemsPerPage)

    const handleChange = (e, page) => {
        setPage(page)
        paginationData.jump(page)
    }

    return (
        <Box p="5">
            <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />

            <List p="10" pt="3" spacing={2}>
                {paginationData.activeData().map(item => {
                    return (
                        <ListItem key={item.sid}>
                            <span>{item.from_formatted}</span>{" "}
                            <Divider display="inline" orientation="vertical" />

                            <span> {item.start_time}</span>{" "}
                            <Divider display="inline" orientation="vertical" />

                            <span>
                                <Chip label={item.duration} sx={{ color: '#0f4211' }} />
                            </span>
                        </ListItem>
                    )
                })}
            </List>

            <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
        </Box>
    )
}
