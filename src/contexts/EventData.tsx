import { createContext, useState, useContext } from 'react';
import { TEvent } from '../types/schema';

interface IEventDataContextProps {
	children: React.ReactNode;
}

interface IEventDataContext {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	eventsList: TEvent[];
	setEventsList: React.Dispatch<React.SetStateAction<TEvent[]>>;
}

export const EventDataContext =
	createContext<IEventDataContext | undefined>(undefined);

export const useEventDataContext = () => {
	const context = useContext(EventDataContext);
	if (!context) {
		throw new Error(
			'useEventDataContext must be used within an EventDataProvider'
		);
	}
	return context;
};

const EventDataProvider = ({ children }: IEventDataContextProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [eventsList, setEventsList] = useState<TEvent[]>([]);

	return (
		<EventDataContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, eventsList, setEventsList }}
		>
			{children}
		</EventDataContext.Provider>
	);
};

export default EventDataProvider;
