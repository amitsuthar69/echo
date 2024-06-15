import { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import moment from 'moment';
import EventModal from './EventModal';
import EventForm from './EventForm';

function PinnedEventsCarousel() {
	const events = JSON.parse(localStorage.getItem('events')) || [];
	const [pinnedEventIndexes, setPinnedEventIndexes] = useState(
		JSON.parse(localStorage.getItem('pinnedEventIndexes')) || []
	);
	const formatDate = (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a');

	const [itemsToShow, setItemsToShow] = useState(1);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [selectedEventIndex, setSelectedEventIndex] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedGradient, setSelectedGradient] = useState(null);

	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		const updateItemsToShow = () => {
			if (window.innerWidth >= 1024) {
				setItemsToShow(3);
			} else if (window.innerWidth >= 600) {
				setItemsToShow(2);
			} else {
				setItemsToShow(1);
			}
		};

		window.addEventListener('resize', updateItemsToShow);
		updateItemsToShow();

		const handleStorageChange = (event) => {
			if (event.key === 'pinnedEventIndexes') {
				setPinnedEventIndexes(JSON.parse(event.newValue));
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('resize', updateItemsToShow);
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	const openModal = (event, gradient) => {
		setSelectedEvent(event);
		setSelectedGradient(gradient);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const openEditForm = (eventIndex) => {
		setSelectedEvent(events[eventIndex]);
		setSelectedEventIndex(eventIndex);
		setFormOpen(true);
	};

	const closeForm = () => {
		setFormOpen(false);
		setSelectedEvent(null);
	};

	const gradients = [
		"linear-gradient(to right, #bb377d, #fbd3e9)",
		"linear-gradient(to right, #a1c4fd, #c2e9fb)",
		"linear-gradient(to right, #f6d365, #fda085)",
		"linear-gradient(to right, #ff9a9e, #fad0c4)",
		"linear-gradient(to right, #a8edea, #fed6e3)",
	];

	const getGradient = (index) => gradients[index % gradients.length];

	const groups = [];
	for (let i = 0; i < pinnedEventIndexes.length; i += itemsToShow) {
		groups.push(pinnedEventIndexes.slice(i, i + itemsToShow));
	}

	const deletePinnedEvent = (eventIndex) => {
		const updatedEvents = events.filter((_, index) => index !== eventIndex);
		localStorage.setItem('events', JSON.stringify(updatedEvents));

		const updatedPinnedIndexes = pinnedEventIndexes.filter((index) => index !== eventIndex);

		const updatedIndexes = updatedPinnedIndexes.map(index => {
			if (index > eventIndex) {
				return index - 1;
			}
			return index;
		});

		localStorage.setItem('pinnedEventIndexes', JSON.stringify(updatedIndexes));
		setPinnedEventIndexes(updatedIndexes);

		if (selectedEvent && selectedEvent.index === eventIndex) {
			closeModal();
		}
	};

	const handleSave = (updatedEvent) => {
		const updatedEvents = [...events]; // Copy the events array
		const eventIndex = selectedEventIndex; // Get the selected event index

		if (eventIndex >= 0 && eventIndex < updatedEvents.length) {
			updatedEvents[eventIndex] = updatedEvent; // Update the event at the correct index
			localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update localStorage

			// Update selectedEvent if it matches the edited event
			setSelectedEvent(updatedEvent); // Update selectedEvent with updatedEvent
		}

		closeForm();
	};

	return (
		<>
			<AliceCarousel
				autoPlay
				autoPlayInterval={3000}
				infinite
				items={groups.map((group, index) => (
					<div key={index} className="flex justify-between">
						{group.map((eventIndex) => (
							<div
								key={eventIndex}
								className={`flex items-center justify-center ${itemsToShow === 1 ? 'w-full' : 'w-1/3'
									} px-2`}
								onClick={() =>
									openModal(events[eventIndex], getGradient(eventIndex))
								}
							>
								<div
									className="text-dark-blue-400 rounded-lg shadow-md max-w-md space-y-6 py-8 px-10 relative"
									style={{
										height: '200px',
										width: '400px',
										background: getGradient(eventIndex),
									}}
								>
									<div className="flex justify-between items-center px-1 md:px-6">
										<h3 className="text-4xl font-semibold mb-2 overflow-y-auto">
											{events[eventIndex].title}
										</h3>
										<div className="flex space-x-2">
											<button
												className="hover:bg-purple-200 dark:hover:bg-purple-200 p-1.5 rounded"
												onClick={(e) => {
													e.stopPropagation();
													openEditForm(eventIndex); // Open edit form
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="#0F4C75"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="lucide lucide-pencil"
												>
													<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
													<path d="m15 5 4 4" />
												</svg>
											</button>
											<button
												className="hover:bg-red-100 dark:hover:bg-red-100 p-1.5 rounded"
												onClick={(e) => {
													e.stopPropagation();
													deletePinnedEvent(eventIndex);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="#ff4d4d"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="lucide lucide-trash-2"
												>
													<path d="M3 6h18" />
													<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
													<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
													<line x1="10" x2="10" y1="11" y2="17" />
													<line x1="14" x2="14" y1="11" y2="17" />
												</svg>
											</button>
										</div>
									</div>
									<p
										className="text-lg font-mono mb-2 overflow-y-auto"
										style={{ maxHeight: '48px' }}
									>
										{events[eventIndex].description}
									</p>
									<p className="text-sm font-mono">
										{formatDate(events[eventIndex].date)}
									</p>
								</div>
							</div>
						))}
						{/* Empty divs to fill the space if there are fewer than 3 items */}
						{itemsToShow === 3 && group.length !== 3 && (
							<div className="flex items-center justify-center w-1/3 px-2"></div>
						)}
						{itemsToShow === 2 && group.length !== 2 && (
							<div className="flex items-center justify-center w-1/3 px-2"></div>
						)}
					</div>
				))}
			/>
			{modalOpen && (
				<EventModal
					event={selectedEvent}
					gradient={selectedGradient}
					onClose={closeModal}
				/>
			)}
			{formOpen && (
				<EventForm
					onClose={closeForm}
					onSave={handleSave}
					eventData={selectedEvent}
				/>
			)}
		</>
	);
}

export default PinnedEventsCarousel;
