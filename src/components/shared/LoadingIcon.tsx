import { styled } from '@mui/material/styles';
import { CircularProgress, CircularProgressProps } from '@mui/material';

const StyledCircularProgress = styled(CircularProgress)<CircularProgressProps>(
	({ theme }) => ({
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	})
);

const LoadingIcon = () => {
	return <StyledCircularProgress />;
};

export default LoadingIcon;
