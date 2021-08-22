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
					<ArrowForwardIosIcon fontSize="small" className={classes} />
				</IconButton>
			) : (
				<IconButton onClick={handelSkip} disabled={false}>
					<ArrowForwardIosIcon fontSize="small" className={classes} />
				</IconButton>
			)}
		</Fragment>
	);
};

export { ArrowBack, ArrowForward };
