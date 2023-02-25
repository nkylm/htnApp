import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';
import { Link } from '@mui/icons-material';

interface IUrlLinkButtonProps {
	url?: string;
	text: string;
}

const StyledLinkButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.neutral.dark,
	backgroundColor: theme.palette.neutral.light,
}));

const StyledAnchor = styled('a')<{}>(({ theme }) => ({
	color: theme.palette.neutral.light,
	textDecoration: 'none',
	marginLeft: 10,
}));

const UrlLinkButton = (props: IUrlLinkButtonProps) => {
	const { url, text } = props;

	return (
		<StyledAnchor target="_blank" href={url}>
			<StyledLinkButton variant="contained">
				<Link sx={{ color: 'white' }} />
				<span style={{ paddingLeft: 5, color: 'white' }}>{text}</span>
			</StyledLinkButton>
		</StyledAnchor>
	);
};

export default UrlLinkButton;
