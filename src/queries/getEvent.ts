import { gql } from '@apollo/client';

export const GET_EVENT = gql`
	query {
		sampleEvent (id: Int) {
			id
			name
			event_type
			permission
			start_time
			end_time
			description
		}
	}
`;