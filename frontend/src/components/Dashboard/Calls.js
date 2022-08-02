import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from "@mui/material/TablePagination"
import usePagination from "@mui/material/usePagination"
import {useTheme} from "@mui/material/styles"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import LastPageIcon from "@mui/icons-material/LastPage"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import { Title } from './Title'

function formatDate (dateString) {
	const dateTime = new Date(dateString)
	const timeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
	return dateTime.toLocaleTimeString('en-US', timeOptions)
}
function formatDuration (seconds) {
	return new Date(seconds * 1000).toISOString().slice(11, 19)
}
function TablePaginationActions(props) {
	const theme = useTheme()
	const { count, page, rowsPerPage, onPageChange } = props

	function handleFirstPageButtonClick(e) {
		onPageChange(e, 0)
	}

	function handleBackButtonClick(e) {
		onPageChange(e, page - 1)
	}

	function handleNextButtonClick(e) {
		onPageChange(e, page + 1)
	}

	function handleLastPageButtonClick(e) {
		onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
	}

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	)
}
function getActivePageData(data, activePage, itemsPerPage) {
	const begin = (activePage) * itemsPerPage
	const end = begin + itemsPerPage
	return data.slice(begin, end)
}


const Calls = ({callsData: {calls}}) => {

	const [activePage, setActivePage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const paginationItemData = usePagination(calls, rowsPerPage)
	const activePageData = getActivePageData(calls, activePage, rowsPerPage)

	function handleChangePage (event, newPage) {
		setActivePage(newPage)
	}

	function handleChangeRowsPerPage (event) {
		setRowsPerPage(parseInt(event.target.value, 10))
		setActivePage(1)
	}

	return (
		<>
			<Title>Recent Calls</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>From</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Duration</TableCell>
						<TableCell align='right'>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						activePageData.map(call => {
							// calls.map(call => {
							return(
								<TableRow key={call.sid}>
									<TableCell>{call.formatted_from}</TableCell>
									<TableCell>{formatDate(call.start_time)}</TableCell>
									<TableCell>{formatDuration(call.duration)}</TableCell>
									<TableCell align="right">{call.status}</TableCell>
								</TableRow>
							)
						})}
				</TableBody>
			</Table>
			<TablePagination
				component="div"
				count={calls.length}
				page={activePage}
				ActionsComponent={TablePaginationActions}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	)
}

export default Calls
