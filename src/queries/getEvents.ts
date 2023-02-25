import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  	query {
		sampleEvents { 
			id 
			name 
			event_type 
			permission 
			start_time 
			end_time 
			description 
			speakers { 
				name 
				profile_pic 
			} 
			public_url 
			private_url 
			related_events 
		}  
	}
`;