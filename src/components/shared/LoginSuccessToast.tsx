import { Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

interface ILoginToastProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginSuccessToast = (props: ILoginToastProps) => {
	const { open, setOpen } = props;

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Login successful
				</Alert>
			</Snackbar>
		</>
	);
};

export default LoginSuccessToast;
