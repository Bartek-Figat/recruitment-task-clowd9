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
import Button from '@material-ui/core/Button';
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
	},
	button: {
		margin: '0.5rem'
	}
});

export default function BasicTable() {
	const classes = useStyles();
	const [rowPerPage, setRowPerPage] = useState(5);
	const [userCredentials, setUserCredentials] = useState([]);
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(rowPerPage);
	const [sortName, useSortName] = useState(false);
	const [recognized, useRecognized] = useState('');

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

	function HandelSortByName() {
		return useSortName(!sortName);
	}

	const showUserData = (skip, limit) => {
		return userCredentials
			.filter(details => (recognized === '' ? details : details.accountType === recognized))
			.slice(skip, limit)
			.sort((a, b) => (!sortName ? a.firstName > b.firstName : a.firstName < b.firstName))
			.map(resolve => {
				return (
					<TableRow key={resolve.id}>
						<TableCell align="right">{resolve.firstName}</TableCell>
						<TableCell align="right">{resolve.lastName}</TableCell>
						<TableCell align="right">{resolve.userName}</TableCell>
						<TableCell align="right">{resolve.accountType}</TableCell>
						<TableCell align="right">{resolve.createDate}</TableCell>
						<TableCell align="right">
							{resolve.permissions.length ? (
								<Select className={classes.select}>
									{resolve.permissions.map(item => (
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
		</>
	);
}
