import {
	Modal,
	TextField,
	Button,
	Typography,
	Box,
	BoxProps,
	makeStyles,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useEventDataContext } from '../contexts/EventData';
import LoginSuccessToast from './shared/LoginSuccessToast';
import theme from '../themes/theme';
import { ILogin } from '../types/interfaces';

interface ILoginModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledFormContainer = styled(Box)<BoxProps>(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '20px',
	background: theme.palette.neutral.dark,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	[theme.breakpoints.down('sm')]: {
		width: '95%',
	},
}));

const StyledForm = styled('form')<{}>(({}) => ({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
}));

const StyledBtnContainer = styled(Box)<BoxProps>(({}) => ({
	display: 'flex',
	justifyContent: 'center',
	marginTop: '20px',
}));

export default function LoginModal(props: ILoginModalProps) {
	const CORRECT_CREDENTIALS = {
		username: 'test',
		password: 'test123',
	};
	const { open, setOpen } = props;
	const { setIsAuthenticated } = useEventDataContext();
	const [formData, setFormData] = useState<ILogin>({
		username: '',
		password: '',
	});
	const [error, setError] = useState<boolean>(false);
	const [toastOpen, setToastOpen] = useState<boolean>(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			formData.username === CORRECT_CREDENTIALS.username &&
			formData.password === CORRECT_CREDENTIALS.password
		) {
			setError(false);
			setIsAuthenticated(true);
			setToastOpen(true);
			handleClose();
		} else {
			setError(true);
		}
	};

	return (
		<>
			<LoginSuccessToast open={toastOpen} setOpen={setToastOpen} />
			<Modal open={open} onClose={handleClose}>
				<StyledFormContainer>
					<Typography variant="h4">Log In</Typography>
					<StyledForm onSubmit={handleSubmit}>
						<TextField
							type="text"
							variant="filled"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							error={error}
						/>
						<TextField
							type="password"
							variant="filled"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							error={error}
							helperText={error && 'Invalid username or password.'}
						/>
						<StyledBtnContainer>
							<Button variant="contained" color="primary" type="submit">
								Log in
							</Button>
						</StyledBtnContainer>
					</StyledForm>
				</StyledFormContainer>
			</Modal>
		</>
	);
}
