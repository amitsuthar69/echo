import React, { useState, useEffect } from 'react';

function EventForm({ onClose, onSave, eventData }) {
	const [eventDetails, setEventDetails] = useState({
		title: '',
		description: '',
		date: ''
	});

	useEffect(() => {
		if (eventData) {
			// Initialize form fields with eventData if provided
			setEventDetails(eventData);
		} else {
			// Reset form fields when eventData is null (for new event)
			setEventDetails({
				title: '',
				description: '',
				date: ''
			});
		}
	}, [eventData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEventDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate form fields
		if (eventDetails.title && eventDetails.description && eventDetails.date) {
			onSave(eventDetails); // Save eventDetails
			onClose(); // Close the form
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full px-2 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
			<form onSubmit={handleSubmit} className="bg-[#7AA2E3] dark:bg-[#3282B8] p-8 rounded-lg">
				<h2 className="text-xl text-[#F8F6E3] dark:text-[#1B262C] font-bold mb-4">
					{eventData ? 'Edit Event' : 'Add New Event'}
				</h2>
				<input
					name="title"
					type="text"
					required
					value={eventDetails.title}
					onChange={handleChange}
					placeholder="Title"
					className="rounded-lg border border-gray-300 p-2 mb-4 w-full dark:bg-[#BBE1FA]"
				/>
				<textarea
					name="description"
					onChange={handleChange}
					required
					value={eventDetails.description}
					placeholder="Description"
					className="rounded-lg border border-gray-300 p-2 mb-4 w-full dark:bg-[#BBE1FA]"
				/>
				<input
					name="date"
					type="datetime-local"
					required
					value={eventDetails.date}
					onChange={handleChange}
					className="rounded-lg border border-gray-300 p-2 mb-4 w-full dark:bg-[#BBE1FA]"
				/>
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-[#BBE1FA] text-slate-800 px-4 py-2 rounded-md mr-2"
					>
						Save
					</button>
					<button
						type="button"
						onClick={onClose}
						className="bg-red-300 text-gray-700 px-4 py-2 rounded-md"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default EventForm;
