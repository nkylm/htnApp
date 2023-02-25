import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemProps } from '@mui/material';
import { TEvent } from '../types/schema';
import { useEventDataContext } from '../contexts/EventData';

interface IRelatedEventsProps {
	relatedEventIds: number[];
}

const StyledListItem = styled(ListItem)<ListItemProps>(() => ({
	padding: 'none',
}));

const RelatedEventsList = (props: IRelatedEventsProps) => {
	const { eventsList } = useEventDataContext();
	const { relatedEventIds } = props;

	return (
		<List component="div" disablePadding>
			{relatedEventIds.map((id) => {
				const relatedEvent = eventsList.find((event: TEvent) => event.id == id);
				return (
					<StyledListItem key={`relatedEvent${id}`}>
						<div>{relatedEvent?.name}</div>
					</StyledListItem>
				);
			})}
		</List>
	);
};

export default RelatedEventsList;
