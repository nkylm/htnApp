import {
	ListItem,
	ListItemProps,
	Box,
	BoxProps,
	IconButton,
	Collapse,
	Button,
	ButtonProps,
} from '@mui/material';
import { useState } from 'react';
import { TEventType, TSpeaker } from '../types/schema';
import { styled } from '@mui/material/styles';
import EventTypeChip from './shared/EventTypeChip';
import SpeakersList from './SpeakersList';
import RelatedEventsList from './RelatedEventsList';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useEventDataContext } from '../contexts/EventData';
import UrlLinkButton from './UrlLinkButton';

interface IEventItemProps {
	name: string;
	description: string | undefined;
	eventType: TEventType;
	startTime: Date;
	endTime: Date;
	speakers: TSpeaker[];
	publicUrl: string | undefined;
	privateUrl: string;
	relatedEventIds: number[];
}

const StyledListItem = styled(ListItem)<ListItemProps>(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	padding: '3%',
	margin: '5px 0px 5px 0px',
	background: theme.palette.neutral.dark,
	borderRadius: '10px',
}));

const StyledRowContainer = styled(Box)<BoxProps>(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
}));

const StyledBlockContainer = styled(Box)<BoxProps>(({ theme }) => ({
	background: theme.palette.neutral.light,
	padding: '15px',
	borderRadius: '10px',
}));

const StyledButtonContainer = styled(Box)<BoxProps>(() => ({
	display: 'flex',
	width: '40%',
	justifyContent: 'flex-end',
	paddingTop: '15px',
}));

const EventItem = (props: IEventItemProps) => {
	const {
		name,
		description,
		eventType,
		startTime,
		endTime,
		speakers,
		publicUrl,
		privateUrl,
		relatedEventIds,
	} = props;
	const [open, setOpen] = useState<boolean>(false);
	const { isAuthenticated } = useEventDataContext();

	const dateTo12Hour = (date: Date) => {
		const options = { hour12: true };
		const timeString = date
			.toLocaleTimeString('en-US', options)
			.replace(/(.*)\D\d+/, '$1');

		return timeString;
	};

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<StyledListItem>
			<StyledRowContainer>
				<h3>{name}</h3>
				<EventTypeChip type={eventType} />
			</StyledRowContainer>
			<StyledRowContainer>
				<span>
					{dateTo12Hour(startTime)} - {dateTo12Hour(endTime)}
				</span>
				<IconButton onClick={handleClick}>
					{open ? <ExpandLess /> : <ExpandMore />}
				</IconButton>
			</StyledRowContainer>

			<Collapse in={open} timeout="auto" unmountOnExit>
				<StyledRowContainer>
					<SpeakersList speakers={speakers} />
					<StyledButtonContainer>
						{isAuthenticated && (
							<UrlLinkButton text={'Private'} url={privateUrl} />
						)}
						{publicUrl?.length != 0 && (
							<UrlLinkButton text={'Public'} url={publicUrl} />
						)}
					</StyledButtonContainer>
				</StyledRowContainer>
				<p>{description}</p>

				<StyledBlockContainer>
					<span style={{ fontWeight: 'bold' }}>Related events</span>
					<RelatedEventsList relatedEventIds={relatedEventIds} />
				</StyledBlockContainer>
			</Collapse>
		</StyledListItem>
	);
};

export default EventItem;
