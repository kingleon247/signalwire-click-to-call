import * as React from "react"
import Toolbar from "@mui/material/Toolbar"
import PainterIcon from "@mui/icons-material/FormatPaint"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import MainListItems from "../components/Dashboard/MainListItems"


const DrawerContent = ({pathName}) => {
	return (
		<>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					px: [1],
				}}
			>

				{/* Header Logo */}
				<PainterIcon sx={{
					md: 'flex',
					mr: '4px',
					fontSize: 28
				}}/>
				<Typography
					variant="h5"
					color="inherit"
					noWrap
					sx={{
						flexGrow: 1,
						fontSize: 18,
						fontWeight: 700,
						letterSpacing: '.001rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					GreatPainters
				</Typography>
			</Toolbar>
			<Divider/>
			<List component="nav">
				<MainListItems pathName={pathName} />
			</List>
		</>
	)
}

export default DrawerContent
