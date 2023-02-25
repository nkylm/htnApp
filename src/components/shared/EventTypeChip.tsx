import Chip from '@mui/material/Chip';
import theme from '../../themes/theme';

interface ChipProps {
	type: string;
}

const EventTypeChip = (props: ChipProps) => {
	const { type } = props;
	const EVENT_TYPES = ['workshop', 'activity', 'tech_talk'];

	return (
		<>
			{type === 'workshop' && (
				<Chip
					sx={{ backgroundColor: theme.palette.chip.workshop }}
					label="Workshop"
				/>
			)}
			{type === 'activity' && (
				<Chip
					sx={{ backgroundColor: theme.palette.chip.activity }}
					label="Activity"
				/>
			)}
			{type === 'tech_talk' && (
				<Chip
					sx={{ backgroundColor: theme.palette.chip.techTalk }}
					label="Tech Talk"
				/>
			)}
		</>
	);
};

export default EventTypeChip;
