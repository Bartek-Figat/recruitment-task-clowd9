import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const ArrowBack = ({ skip, handelPrev, classes }) => {
	return (
		<Fragment>
			{skip > 0 ? (
				<IconButton fontSize="small" onClick={handelPrev} disabled={false}>
					<ArrowBackIosIcon fontSize="small" className={classes} />
				</IconButton>
			) : (
				<IconButton fontSize="small" onClick={handelPrev} disabled={true}>
					<ArrowBackIosIcon fontSize="small" className={classes} />
				</IconButton>
			)}
		</Fragment>
	);
};

const ArrowForward = ({ users, skip, rowPerPage, handelSkip, classes, limit }) => {
	return (
		<Fragment>
			{users < rowPerPage || users <= limit ? (
				<IconButton onClick={handelSkip} disabled={true}>
					{console.log('Total users==1', users)}
					{console.log('Skip==1', skip)}
					{console.log('rowPerPage==1', rowPerPage)}
					{console.log('limit==1', limit)}
					<ArrowForwardIosIcon fontSize="small" className={classes} />
				</IconButton>
			) : (
				<IconButton onClick={handelSkip} disabled={false}>
					{console.log('Total users==2', users)}
					{console.log('Skip==2', skip)}
					{console.log('rowPerPage==2', rowPerPage)}
					{console.log('limit==2', limit)}
					<ArrowForwardIosIcon fontSize="small" className={classes} />
				</IconButton>
			)}
		</Fragment>
	);
};

export { ArrowBack, ArrowForward };
