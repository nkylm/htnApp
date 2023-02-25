import theme from '../themes/theme';
import { styled } from '@mui/material/styles';
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Box,
	BoxProps,
} from '@mui/material';
import { TSpeaker } from '../types/schema';

const StyledContainer = styled(Box)<BoxProps>(({ theme }) => ({
	paddingTop: '20px',
	left: 0,
}));

interface ISpeakersListProps {
	speakers: TSpeaker[];
}

const SpeakersList = (props: ISpeakersListProps) => {
	const { speakers } = props;

	return (
		<StyledContainer>
			<ul style={{ paddingLeft: 0 }}>
				{speakers.map((speaker, index) => (
					<ListItem key={index}>
						<ListItemAvatar>
							<Avatar src={speaker.profile_pic} alt={speaker.name} />
						</ListItemAvatar>
						<ListItemText primary={speaker.name} />
					</ListItem>
				))}
			</ul>
		</StyledContainer>
	);
};

export default SpeakersList;
