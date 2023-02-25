import { styled } from '@mui/material/styles';
import { List, ListProps } from '@mui/material';
import { TEvent } from '../types/schema';
import EventItem from './EventItem';

interface IEventListProps {
	shownEvents: TEvent[];
}

const StyledList = styled(List)<ListProps>(({ theme }) => ({
	width: '70%',
	overflow: 'auto',
	padding: '0px 5px 5px 5px',
	height: '80vh',
	'&::-webkit-scrollbar': {
		width: '0.5em',
		height: '0.1em',
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: theme.palette.primary.main,
		borderRadius: '0.25em',
	},
	'&::-webkit-scrollbar-track': {
		borderRadius: '0.25em',
		backgroundColor: theme.palette.background,
	},
	[theme.breakpoints.down('sm')]: {
		width: '100%',
	},
}));

const EventList = (props: IEventListProps) => {
	const { shownEvents } = props;

	return (
		<StyledList>
			{shownEvents.length != 0 ? (
				shownEvents.map((event) => {
					const eventProps = {
						name: event.name,
						description: event.description,
						eventType: event.event_type,
						startTime: new Date(event.start_time),
						endTime: new Date(event.end_time),
						speakers: event.speakers,
						publicUrl: event.public_url,
						privateUrl: event.private_url,
						relatedEventIds: event.related_events,
					};
					return <EventItem key={event.id} {...eventProps} />;
				})
			) : (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					No events
				</div>
			)}
		</StyledList>
	);
};

export default EventList;
