import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Button, ButtonProps, Avatar } from '@mui/material';
import { GET_EVENTS } from '../queries/getEvents';
import { TEvent } from '../types/schema';
import EventList from '../components/EventList';
import DaySelect from '../components/DaySelect';
import LoadingIcon from '../components/shared/LoadingIcon';
import LoginModal from '../components/LoginModal';
import { useEventDataContext } from '../contexts/EventData';

const StyledContainer = styled(Box)<BoxProps>(({ theme }) => ({
	width: '100%',
	display: 'flex',
	[theme.breakpoints.down('sm')]: {
		flexDirection: 'column',
	},
	[theme.breakpoints.up('sm')]: {
		flexDirection: 'row',
	},
	maxWidth: 1000,
	justifyContent: 'center',
	alignItems: 'top',
	margin: '0 auto',
}));

const StyledLoginBtn = styled(Button)<ButtonProps>(() => ({
	position: 'absolute',
	right: 10,
	top: 10,
}));

const StyledPageContainer = styled(Box)<BoxProps>(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		paddingTop: 40,
	},
}));

const StyledAvatarContainer = styled(Box)<BoxProps>(({ theme }) => ({
	width: '20%',
	position: 'absolute',
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	right: '1vw',
	top: 10,
}));

const EventPage = () => {
	const { isAuthenticated, eventsList, setEventsList } = useEventDataContext();
	const [shownEvents, setShownEvents] = useState<TEvent[]>([]);
	const [days, setDays] = useState<Date[]>([]);
	const [selectedDay, setSelectedDay] = useState<Date>();
	const [loginOpen, setLoginOpen] = useState<boolean>(false);

	const { loading } = useQuery(GET_EVENTS, {
		onCompleted: (data) => {
			const sortedList = [...data.sampleEvents].sort(
				(a: TEvent, b: TEvent) => a.start_time - b.start_time
			);
			setEventsList(sortedList);

			// Get all days
			const uniqueDaysArray = Array.from(
				new Set(
					data.sampleEvents.map((event: TEvent) =>
						new Date(event.start_time).toDateString()
					)
				)
			) as string[];
			setDays(uniqueDaysArray.map((date: string) => new Date(date)));

			// Set default day
			setSelectedDay(new Date(uniqueDaysArray[0]));
		},
	});

	useEffect(() => {
		let filteredEvents = [...eventsList];
		if (!isAuthenticated) {
			filteredEvents = filteredEvents.filter(
				(event: TEvent) => event.permission == 'public'
			);
		}
		if (selectedDay) {
			filteredEvents = filteredEvents.filter(
				(event: TEvent) =>
					new Date(event.start_time).toDateString() ==
					selectedDay.toDateString()
			);
		}
		setShownEvents(filteredEvents);
	}, [isAuthenticated, selectedDay]);

	const handleOpen = () => {
		setLoginOpen(true);
	};

	if (loading) {
		return <LoadingIcon />;
	}

	return (
		<StyledPageContainer>
			<LoginModal open={loginOpen} setOpen={setLoginOpen} />
			{isAuthenticated ? (
				<StyledAvatarContainer>
					<Avatar />
					<Box sx={{ pl: 2 }}>User</Box>
				</StyledAvatarContainer>
			) : (
				<StyledLoginBtn
					variant="contained"
					color="primary"
					onClick={handleOpen}
				>
					Log in
				</StyledLoginBtn>
			)}

			<Box sx={{ textAlign: 'center' }}>
				<h1>
					{selectedDay &&
						selectedDay.toLocaleDateString('en-us', {
							weekday: 'long',
							month: 'short',
							day: 'numeric',
						})}
				</h1>
			</Box>

			<StyledContainer>
				<DaySelect days={days} setSelectedDay={setSelectedDay} />
				<EventList shownEvents={shownEvents} />
			</StyledContainer>
		</StyledPageContainer>
	);
};

export default EventPage;
