import { makeStyles } from '@material-ui/core/styles';
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
		padding: '0.1rem',
		cursor: 'pointer'
	},
	button: {
		margin: '0.5rem'
	},
	searchInput: {
		width: '75%'
	},
	toolSelect: {
		margin: '0.5rem',
		width: '15%'
	}
});

export { useStyles };
