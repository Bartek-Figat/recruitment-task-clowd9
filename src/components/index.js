/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState, Fragment } from 'react';
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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { tableRow } from './tableRow';
import data from '../db/mock.json';
import usersAPI from '../util/index';

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
		marginLeft: '1rem',
		padding: '0.2rem'
	},
	arrow: {
		marginLeft: '1rem',
		cursor: 'pointer'
	},
	button: {
		margin: '0.5rem'
	}
});

export default function BasicTable() {
	const classes = useStyles();
	const [rowPerPage, setRowPerPage] = useState(5);
	const [users, setUsers] = useState([]);
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(rowPerPage);
	const [sortName, useSortName] = useState(false);
	const [recognized, useRecognized] = useState('');

	useEffect(() => {
		async function fetchDataFrom() {
			try {
				await usersAPI(data).then(data => {
					return setUsers(data);
				});
			} catch (error) {
				console.log(error.message);
			}
		}
		fetchDataFrom();
	}, []);

	const handelSkip = () => {
		setSkip(skip + 5);
		setLimit(limit + rowPerPage);
	};

	const handelPrev = () => {
		setSkip(skip - 5);
		setLimit(limit - rowPerPage);
	};

	const handelRecognized = ({ target }) => {
		console.log(target);
		setRowPerPage(parseInt(target.textContent));
		return target.textContent;
	};

	function HandelSortByName() {
		return useSortName(!sortName);
	}

	const rowNumber = [5, 10, 15, 25];

	const showUserData = (skip, limit) => {
		return users
			.filter(details => (recognized === '' ? true : details.accountType === recognized))
			.sort((a, b) => (!sortName ? a.firstName > b.firstName : a.firstName < b.firstName))
			.slice(skip, limit)
			.map(resolve => {
				return tableRow(resolve, classes.select);
			});
	};
	return (
		<>
			<TableContainer className={classes.table} component={Paper}>
				<Button
					className={classes.button}
					onClick={HandelSortByName}
					variant="contained"
					size="small"
					color="primary"
				>
					Sort by name
				</Button>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="right">First nad Last Name</TableCell>
							<TableCell align="right">User Name</TableCell>
							<TableCell align="right">Account Type</TableCell>
							<TableCell align="right">Create Date</TableCell>
							<TableCell align="right">Permission</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{showUserData(skip, skip + rowPerPage)}</TableBody>
				</Table>
				<TableHead>
					<TableCell align="left">
						<span className={classes.span} id="demo-simple-select-helper-label">
							Rows per page:
						</span>
						<Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled">
							{rowNumber.map(number => {
								return <MenuItem onClick={handelRecognized}>{number}</MenuItem>;
							})}
						</Select>
						<span className={classes.spanData} id="demo-simple-select-helper-label">
							{skip} - {limit}
						</span>
						<span id="demo-simple-select-helper-label">of: {users.length}</span>
						{skip > 0 ? (
							<IconButton fontSize="small" onClick={handelPrev} disabled={false}>
								<ArrowBackIosIcon fontSize="small" className={classes.arrow} />
							</IconButton>
						) : (
							<IconButton fontSize="small" onClick={handelPrev} disabled={true}>
								<ArrowBackIosIcon fontSize="small" className={classes.arrow} />
							</IconButton>
						)}
						{skip + rowPerPage}
						{users.length === skip + rowPerPage ? (
							<IconButton onClick={handelSkip} disabled={true}>
								<ArrowForwardIosIcon fontSize="small" className={classes.arrow} />
							</IconButton>
						) : (
							<IconButton onClick={handelSkip} disabled={false}>
								<ArrowForwardIosIcon fontSize="small" className={classes.arrow} />
							</IconButton>
						)}
					</TableCell>
				</TableHead>
			</TableContainer>
		</>
	);
}
