import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const tableRow = (resolve, classes) => {
	return (
		<TableRow key={resolve.id}>
			<TableCell align="right">
				{resolve.firstName} {resolve.lastName}
			</TableCell>
			<TableCell align="right">{resolve.userName}</TableCell>
			<TableCell align="right">{resolve.accountType}</TableCell>
			<TableCell align="right">{resolve.createDate}</TableCell>
			<TableCell align="right">
				{resolve.permissions.length ? (
					<Select className={classes}>
						{resolve.permissions.map(item => (
							<MenuItem className={classes} key={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				) : null}
			</TableCell>
		</TableRow>
	);
};

export { tableRow };
