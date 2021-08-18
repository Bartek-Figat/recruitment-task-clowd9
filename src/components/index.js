/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

import mockData from '../util/index';

const useStyles = makeStyles({
	wrapper: {
		width: '100vw',
		height: '100hw'
	},
	table: {
		margin: '0 auto',
		maxWidth: '800px'
	},
	select: {
		width: '100%'
	},
	span: {
		marginLeft: '20rem'
	},
	spanData: {
		marginLeft: '3rem',
		padding: '0.2rem'
	},
	arrow: {
		marginLeft: '1rem',
		cursor: 'pointer'
	}
});

export default function BasicTable() {
	const classes = useStyles();
	const [rowPerPage, setRowPerPage] = useState(5);
	const [userCredentials, setUserCredentials] = useState([]);
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(rowPerPage);

	useEffect(() => {
		async function fetchDataFrom() {
			try {
				const data = await mockData;
				setUserCredentials(data);
				return data;
			} catch (error) {
				console.log(error);
			}
		}
		fetchDataFrom();
	}, []);

	const handelSkip = () => {
		setSkip(skip + 5);
		setLimit(limit + 5);
	};

	const handelPrev = () => {
		setSkip(skip - 5);
		setLimit(limit - 5);
	};

	const showUserData = (skip, limit) => {
		return userCredentials.slice(skip, limit).map(items => {
			return (
				<TableRow key={items.id}>
					<TableCell align="right">{items.firstName}</TableCell>
					<TableCell align="right">{items.lastName}</TableCell>
					<TableCell align="right">{items.userName}</TableCell>
					<TableCell align="right">{items.accountType}</TableCell>
					<TableCell align="right">{items.createDate}</TableCell>
					<TableCell align="right">
						{items.permissions.length ? (
							<Select className={classes.select}>
								{items.permissions.map(item => (
									<MenuItem className={classes.select} key={item}>
										{item}
									</MenuItem>
								))}
							</Select>
						) : null}
					</TableCell>
				</TableRow>
			);
		});
	};
	return (
		<TableContainer className={classes.table} component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="right">First Name</TableCell>
						<TableCell align="right">Last Name</TableCell>
						<TableCell align="right">User Name</TableCell>
						<TableCell align="right">Account Type</TableCell>
						<TableCell align="right">Create Date</TableCell>
						<TableCell align="right">Permission</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{showUserData(skip, limit)}</TableBody>
			</Table>
			<TableHead>
				<TableCell align="left">
					<span className={classes.span} id="demo-simple-select-helper-label">
						Rows per page:
					</span>
					<Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled">
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={15}>15</MenuItem>
						<MenuItem value={25}>25</MenuItem>
					</Select>
					<span className={classes.spanData} id="demo-simple-select-helper-label">
						{skip} - {limit}
					</span>
					<span id="demo-simple-select-helper-label">of: {userCredentials.length}</span>
					{console.log(userCredentials.length)}
					<AiOutlineArrowLeft onClick={handelPrev} className={classes.arrow} />
					<AiOutlineArrowRight onClick={handelSkip} className={classes.arrow} />
				</TableCell>
			</TableHead>
		</TableContainer>
	);
}
