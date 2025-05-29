"use client";
import { deleteSubject } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useActionState, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import type { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
	subject: deleteSubject,
	class: deleteSubject,
	teacher: deleteSubject,
	student: deleteSubject,
	exam: deleteSubject,
	// TODO: OTHER DELETE ACTIONS
	parent: deleteSubject,
	lesson: deleteSubject,
	assignment: deleteSubject,
	result: deleteSubject,
	attendance: deleteSubject,
	event: deleteSubject,
	announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
	loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
	loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
	loading: () => <h1>Loading...</h1>,
});

const forms: {
	[key: string]: (
		setOpen: Dispatch<SetStateAction<boolean>>,
		type: "create" | "update",
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		data?: any,
	) => JSX.Element;
} = {
	teacher: (setOpen, type, data) => (
		<TeacherForm setOpen={setOpen} type={type} data={data} />
	),
	student: (setOpen, type, data) => (
		<StudentForm setOpen={setOpen} type={type} data={data} />
	),
	subject: (setOpen, type, data) => (
		<SubjectForm setOpen={setOpen} type={type} data={data} />
	),
};

const FormModal = ({ table, type, data, id }: FormContainerProps) => {
	const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
	const bgColor =
		type === "create"
			? "bg-atioYellow"
			: type === "update"
				? "bg-atioSky"
				: "bg-atioPurple";

	const [open, setOpen] = useState(false);
	const Form = () => {
		const [state, formAction] = useActionState(deleteActionMap[table], {
			success: false,
			error: false,
		});

		const router = useRouter();
		useEffect(() => {
			if (state.success) {
				toast("Subject has been deleted!");
				setOpen(false);
				router.refresh();
			}
		}, [state, router]);

		return type === "delete" && id ? (
			<form action={formAction} className="p-4 flex flex-col gap-4">
				<input type="text | number" name="id" defaultValue={id} hidden />
				<span className="text-center font-medium">
					All data will be lost. Are you sure you want to delete this {table}?
				</span>
				<button
					type="submit"
					className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
				>
					Delete
				</button>
			</form>
		) : type === "create" || type === "update" ? (
			forms[table](setOpen, type, data)
		) : (
			"Form not found!"
		);
	};
	return (
		<>
			<button
				type="button"
				className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
				onClick={() => setOpen(true)}
			>
				<Image src={`/${type}.png`} alt="" width={16} height={16} />
			</button>
			{open && (
				<div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
					<div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
						<Form />

						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							className="absolute top-4 right-4 cursor-pointer"
							onClick={() => setOpen(false)}
						>
							<Image src="/close.png" alt="" width={14} height={14} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FormModal;
