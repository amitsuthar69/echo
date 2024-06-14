import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';

function EventCalendar() {
	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([]);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const handleOpen = () => {
		const storedEventsString = localStorage.getItem('events');
		if (storedEventsString) {
			const storedEventsArray = JSON.parse(storedEventsString);
			const parsedDates = storedEventsArray.map(event => ({
				...event,
				date: new Date(event.date),
			}));
			setEvents(parsedDates);
		}
		setIsCalendarOpen(!isCalendarOpen)
	}

	const isEventDate = (date) => events.some(event => moment(event.date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'));
	const getEventColor = (date) => {
		const currentDate = new Date();
		const eventDate = moment(date);
		if (eventDate.isSame(currentDate, 'day')) {
			return 'bg-blue-500 text-white';
		} else if ((eventDate.isAfter(currentDate)) && (isEventDate(date))) {
			return 'bg-yellow-400 text-white';
		} else if ((eventDate.isBefore(currentDate)) && (isEventDate(date))) {
			return 'bg-green-500 text-white';
		}
	};

	return (
		<div>
			<button className="bg-[#7AA2E3] dark:bg-[#BBE1FA] rounded-lg fixed bottom-8 right-28 p-1"
				type='submit' onClick={handleOpen}>
				<svg xmlns="http://www.w3.org/2000/svg"
					width="3em"
					height="3em"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#0F4C75"
					strokeWidth="1.75"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-calendar-days">
					<path d="M8 2v4" />
					<path d="M16 2v4" />
					<rect width="18" height="18" x="3" y="4" rx="2" />
					<path d="M3 10h18" /><path d="M8 14h.01" />
					<path d="M12 14h.01" />
					<path d="M16 14h.01" />
					<path d="M8 18h.01" />
					<path d="M12 18h.01" />
					<path d="M16 18h.01" />
				</svg>
			</button>
			{isCalendarOpen && (
					<Calendar
						className="rounded-lg bg-light-blue-400 flex flex-col justify-center items-center mt-24 z-20"
						onChange={(date) => setDate(date)}
						value={date}
						tileClassName={({ date, view }) => {
							return getEventColor(date);
						}}
					/>
			)}
		</div>
	);
}

export default EventCalendar;
