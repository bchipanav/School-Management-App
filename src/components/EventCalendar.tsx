"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
	{
		id: 1,
		title: "Number #1",
		time: "12:00 PM - 14:00 PM",
		description: "Lorem ipsun long story short tito llora",
	},
	{
		id: 2,
		title: "Number #2",
		time: "12:00 PM - 14:00 PM",
		description: "Lorem ipsun long story short tito llora",
	},
	{
		id: 3,
		title: "Number #3",
		time: "12:00 PM - 14:00 PM",
		description: "Lorem ipsun long story short tito llora",
	},
];

const EventCalendar = () => {
	const [value, onChange] = useState<Value>(new Date());
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;
	return (
		<div className="bg-white p-4 rounded-md">
			<Calendar onChange={onChange} value={value} />
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold my-4">Events</h1>
				<Image src="/moreDark.png" alt="" width={20} height={20} />
			</div>
			<div className="flex flex-col gap-4">
				{events.map((event) => (
					<div
						key={event.id}
						className="p-5 rounded-md border-2 border-gray-100 bordert-4 odd:border-t-atioSky even:border-t-atioPurple"
					>
						<div className="flex items-center justify-between">
							<h1 className="font-semibold text-gray-600">{event.title}</h1>
							<span className="text-gray-300 text-xs">{event.time}</span>
						</div>
						<p className="mt-2 text-gray-400 text-sm">{event.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default EventCalendar;
