import { useState, useEffect } from 'react';

function EventModal({ event, onClose, gradient }) {
	const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(event.date));

	const gradients = [
		"linear-gradient(to right, #bb377d, #fbd3e9)",
		"linear-gradient(to right, #a1c4fd, #c2e9fb)",
		"linear-gradient(to right, #f6d365, #fda085)",
		"linear-gradient(to right, #ff9a9e, #fad0c4)",
		"linear-gradient(to right, #a8edea, #fed6e3)",
	];

	// Function to calculate time remaining until event starts
	function calculateTimeRemaining(eventDate) {
		const now = new Date();
		const eventDateTime = new Date(eventDate);
		let difference = eventDateTime - now;

		// If the event date is in the past, set time remaining to 0
		if (difference < 0) {
			difference = 0;
		}

		return difference;
	}

	// Format time remaining for display
	const formatTimeRemaining = () => {
		let remaining = timeRemaining / 1000; // Convert to seconds

		const seconds = Math.floor(remaining % 60);
		remaining /= 60; // Convert to minutes
		const minutes = Math.floor(remaining % 60);
		remaining /= 60; // Convert to hours
		const hours = Math.floor(remaining % 24);
		remaining /= 24; // Convert to days
		const days = Math.floor(remaining);

		if (days > 0) {
			return `${days}d ${hours}h ${minutes}m ${seconds}s`;
		} else if (hours > 0) {
			return `${hours}h ${minutes}m ${seconds}s`;
		} else if (minutes > 0) {
			return `${minutes}m ${seconds}s`;
		} else {
			return `${seconds}s`;
		}
	};

	// Function to update time remaining every second
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeRemaining(calculateTimeRemaining(event.date));
		}, 1000);
		return () => clearInterval(timer);
	}, [event.date]);

	// Randomly select a gradient if not provided
	const getRandomGradient = () => {
		const randomIndex = Math.floor(Math.random() * gradients.length);
		return gradients[randomIndex];
	};

	// Use the provided gradient or a random one
	const modalGradient = gradient || getRandomGradient();

	return (
		<div className="fixed top-0 left-0 w-full h-full px-2 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
			<div className="event-details bg-white rounded-lg shadow-lg p-6 max-w-md overflow-hidden" style={{ background: modalGradient }}>
				<div className="countdown-container text-6xl font-bold text-gray-800 mb-6">
					{formatTimeRemaining()}
				</div>
				<h2 className="text-3xl font-semibold text-gray-800 mb-2">{event.title}</h2>
				<div className="description-container text-gray-800 text-2xl font-mono mb-4 overflow-y-auto" style={{ height: '100px', width: '350px' }}>
					{event.description}
				</div>
				<button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300">Close</button>
			</div>
		</div>
	);
}

export default EventModal;
