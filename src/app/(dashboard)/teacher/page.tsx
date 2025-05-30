import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const TeacherPage = async () => {
	const { userId } = await auth();
	if (!userId) {
		throw new Error("User not authenticated");
	}
	const students = await prisma.student.findMany({
		where: {
			class: {
				supervisorId: userId,
			},
		},
	});
	return (
		<div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
			{/* LEFT SIDE */}
			<div className="w-full xl:w-2/3">
				{students.map((student) => (
					<div className="w-full " key={student.id}>
						<div className="h-full bg-white p-4 rounded-md">
							<h1 className="text-xl font-semibold">
								Schedule ({`${student.name} ${student.surname}`})
							</h1>
							<BigCalendarContainer type="teacherId" id={userId} />
						</div>
					</div>
				))}
			</div>
			{/* RIGHT SIDE */}
			<div className="w-full xl:w-1/3 flex flex-col gap-8">
				<Announcements />
			</div>
		</div>
	);
};

export default TeacherPage;
