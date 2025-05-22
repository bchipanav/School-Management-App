import React from "react";

const announcements = [
	{
		id: 1,
		title: "Number #1",
		date: "2025-01-01",
		description: "Lorem ipsun long story short tito llora",
	},
	{
		id: 2,
		title: "Number #2",
		date: "2025-01-01",
		description: "Lorem ipsun long story short tito llora",
	},
	{
		id: 3,
		title: "Number #3",
		date: "2025-01-01",
		description: "Lorem ipsun long story short tito llora",
	},
];

const bgColors = ["#EDF9FD", "#F1F0FF", "#FEFCE8"];

const Announcements = () => {
	return (
		<div className="bg-white p-4 rounded-md">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Announcements</h1>
				<span className="text-xs text-gray-400">View All</span>
			</div>
			<div className="flex flex-col gap-4 mt-4">
				{announcements.map((announcement, index) => (
					<div
						key={announcement.id}
						style={{ backgroundColor: bgColors[index % bgColors.length] }}
						className="p-4 rounded-md"
					>
						<div className="flex items-center justify-between">
							<h2 className="font-medium ">{announcement.title}</h2>
							<span className="text-gray-400 text-xs bg-white rounded-md px-1 py-1">
								{announcement.date}
							</span>
						</div>
						<p className="mt-1 text-gray-400 text-sm">
							{announcement.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Announcements;
