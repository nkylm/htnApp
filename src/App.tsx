import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';
import EventPage from './pages/EventPage';
import EventDataProvider from './contexts/EventData';

const App = () => {
	const client = new ApolloClient({
		link: new HttpLink({
			uri: 'https://api.hackthenorth.com/v3/graphql',
			fetchOptions: {
				mode: 'no-cors',
			},
		}),
		cache: new InMemoryCache(),
	});

	return (
		<ThemeProvider theme={theme}>
			<EventDataProvider>
				<ApolloProvider client={client}>
					<CssBaseline />
					<EventPage />
				</ApolloProvider>
			</EventDataProvider>
		</ThemeProvider>
	);
};

export default App;
