"use client";
import {
	Calendar,
	momentLocalizer,
	type View,
	Views,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
const localizer = momentLocalizer(moment);

const BigCalendar = ({
	data,
}: { data: { title: string; start: Date; end: Date }[] }) => {
	const [view, setView] = useState<View>(Views.WORK_WEEK);
	const handleOnChangeView = (selectedView: View) => {
		setView(selectedView);
	};
	return (
		<Calendar
			localizer={localizer}
			events={data}
			startAccessor="start"
			endAccessor="end"
			views={["work_week", "day"]}
			view={view}
			style={{ height: "98%" }}
			onView={handleOnChangeView}
			min={new Date(2025, 4, 27, 8, 0, 0)} // 27 de mayo (mes es 0-indexed)
			max={new Date(2025, 4, 27, 17, 0, 0)}
		/>
	);
};
export default BigCalendar;
