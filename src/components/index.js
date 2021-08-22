/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Select,
	MenuItem,
	Toolbar,
	TableSortLabel
} from '@material-ui/core';
import { tableRow } from './tableRow';
import { useStyles } from './style';
import { ArrowBack, ArrowForward } from './button';
import data from '../db/mock.json';
import usersAPI from '../util/index';

export default function BasicTable() {
	const classes = useStyles();
	const [rowPerPage, setRowPerPage] = useState(5);
	const [users, setUsers] = useState([]);
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(rowPerPage);
	const [sortName, useSortName] = useState(false);
	const [recognized, useType] = useState('');

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

	const handelRowPerPage = ({ target }) => {
		setRowPerPage(parseInt(target.textContent));
	};

	const handelRecognizedType = e => {
		useType(e.target.textContent);
	};

	function HandelSortByName() {
		return useSortName(!sortName);
	}

	const rowNumber = [5, 10, 15, 25];

	const removeDuplicatesInAccountTypes = type => {
		return type
			.map(duplicate => duplicate.accountType)
			.filter((information, index, input) => {
				return input.indexOf(information) === index;
			});
	};

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
				<Toolbar>
					<Select
						className={classes.toolSelect}
						labelId="demo-simple-select-filled-label"
						id="demo-simple-select-filled"
					>
						{removeDuplicatesInAccountTypes(users).map(type => {
							return (
								<MenuItem value={recognized} onClick={handelRecognizedType}>
									{console.log(recognized)}
									{type}
								</MenuItem>
							);
						})}
					</Select>
				</Toolbar>

				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="right">
								<TableSortLabel
									onClick={HandelSortByName}
									direction={!sortName ? 'asc' : 'desc'}
									active={sortName}
								>
									First nad Last Name
								</TableSortLabel>
							</TableCell>
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
								return <MenuItem onClick={handelRowPerPage}>{number}</MenuItem>;
							})}
						</Select>
						<span className={classes.spanData} id="demo-simple-select-helper-label">
							{skip} - {limit}
						</span>
						<span id="demo-simple-select-helper-label">of: {users.length}</span>
						<ArrowBack skip={skip} handelPrev={handelPrev} classes={classes.arrow} />
						<ArrowForward
							users={users.length}
							skip={skip}
							rowPerPage={rowPerPage}
							handelSkip={handelSkip}
							classes={classes.arrow}
							limit={limit}
						/>
					</TableCell>
				</TableHead>
			</TableContainer>
		</>
	);
}
