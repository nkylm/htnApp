import { styled } from '@mui/material/styles';
import {
	Box,
	BoxProps,
	ButtonGroup,
	Button,
	ButtonGroupProps,
	ButtonProps,
	useMediaQuery,
	Theme,
} from '@mui/material';

interface IDaySelectProps {
	days: Date[];
	setSelectedDay: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
	backgroundColor: theme.palette.neutral.dark,
}));

const StyledContainer = styled(Box)<BoxProps>(({ theme }) => ({
	width: '20%',
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
}));

const DaySelect = (props: IDaySelectProps) => {
	const { days, setSelectedDay } = props;
	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('sm')
	);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const newSelectedDay = new Date(e.currentTarget.value);
		setSelectedDay(newSelectedDay);
	};

	const dayButtons = days.map((day: Date, index: number) => {
		let dateOptions = {};
		if (isSmallScreen) {
			dateOptions = {
				month: 'short',
				day: 'numeric',
			};
		} else {
			dateOptions = {
				weekday: 'short',
				month: 'short',
				day: 'numeric',
			};
		}
		return (
			<StyledButton
				key={index}
				value={day.toDateString()}
				onClick={(e) => handleClick(e)}
			>
				{day.toLocaleDateString('en-us', dateOptions)}
			</StyledButton>
		);
	});

	return (
		<StyledContainer>
			<ButtonGroup
				orientation={isSmallScreen ? 'horizontal' : 'vertical'}
				variant="contained"
			>
				{dayButtons}
			</ButtonGroup>
		</StyledContainer>
	);
};

export default DaySelect;
