import React from "react";
import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import { prisma } from "@/lib/prisma";
import { getLatestMonday } from "@/lib/utils";

const AttendanceChartContainer = async () => {
	const latestMonday = getLatestMonday();

	const resData = await prisma.attendance.findMany({
		where: {
			date: {
				gte: latestMonday,
			},
		},
		select: {
			date: true,
			present: true,
		},
	});

	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
	const attendanceMap: { [key: string]: { present: number; absent: number } } =
		{
			Mon: { present: 0, absent: 0 },
			Tue: { present: 0, absent: 0 },
			Wed: { present: 0, absent: 0 },
			Thu: { present: 0, absent: 0 },
			Fri: { present: 0, absent: 0 },
		};

	for (const item of resData) {
		const itemDate = new Date(item.date);
		const dayOfWeek = itemDate.getUTCDay();

		// Monday is 1, Friday is 5
		if (dayOfWeek >= 1 && dayOfWeek <= 5) {
			const dayName = daysOfWeek[dayOfWeek - 1];

			if (item.present) {
				attendanceMap[dayName].present += 1;
			} else {
				attendanceMap[dayName].absent += 1;
			}
		}
	}
	const data = daysOfWeek.map((day) => ({
		name: day,
		present: attendanceMap[day].present,
		absent: attendanceMap[day].absent,
	}));

	return (
		<div className="bg-white rounded-xl w-full h-full p-4 ">
			<div className="flex justify-between items-center">
				<h1 className="text-lg font-semibold">Attendance</h1>
				<Image src="/moreDark.png" alt="" width={20} height={20} />
			</div>
			<AttendanceChart data={data} />
		</div>
	);
};

export default AttendanceChartContainer;
