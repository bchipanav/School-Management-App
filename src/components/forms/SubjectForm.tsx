"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, type SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";

const SubjectForm = ({
	type,
	data,
	setOpen,
	relatedData,
}: {
	type: "create" | "update";
	setOpen: Dispatch<SetStateAction<boolean>>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data?: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	relatedData?: any;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubjectSchema>({
		resolver: zodResolver(subjectSchema),
	});

	// AFTER REACT 19 IT'LL BE USEACTIONSTATE

	const [state, formAction] = useActionState(
		type === "create" ? createSubject : updateSubject,
		{
			success: false,
			error: false,
		},
	);

	const onSubmit = handleSubmit((data) => {
		console.log("valid:", data);
		formAction(data);
	});

	const router = useRouter();

	useEffect(() => {
		if (state.success) {
			toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
			setOpen(false);
			router.refresh();
		}
	}, [state, type, router, setOpen]);

	return (
		<form className="flex flex-col gap-8" onSubmit={onSubmit}>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create a new subject" : "Update the subject"}
			</h1>

			<div className="flex justify-between flex-wrap gap-4">
				<InputField
					label="Subject name"
					name="name"
					defaultValue={data?.name}
					register={register}
					error={errors?.name}
				/>
			</div>
			{data && (
				<InputField
					label="Id"
					name="id"
					defaultValue={data?.id}
					register={register}
					error={errors?.id}
					hidden
				/>
			)}
			<div className="flex flex-col gap-2 w-full md:w-1/4">
				{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
				<label className="text-xs text-gray-500">Teachers</label>
				<select
					multiple
					className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					{...register("teachers")}
					defaultValue={data?.teachers}
				>
					{relatedData?.teachers?.length ? (
						relatedData.teachers.map(
							(teacher: { name: string; id: string; surname: string }) => (
								<option
									value={teacher.id}
									key={teacher.id}
								>{`${teacher.name} ${teacher.surname}`}</option>
							),
						)
					) : (
						<option disabled>No teachers found</option>
					)}
				</select>
				{errors.teachers?.message && (
					<p className="text-xs text-red-400">
						{errors.teachers.message.toString()}
					</p>
				)}
			</div>
			{state.error && (
				<span className="text-red-500">Something went wrong!</span>
			)}
			<button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
				{type === "create" ? "Create" : "Update"}
			</button>
		</form>
	);
};

export default SubjectForm;
