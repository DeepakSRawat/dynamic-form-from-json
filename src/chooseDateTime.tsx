import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
type ShowType = {
	showVal: boolean;
	type: "date" | "time";
};

const DateTimeType = ({ field, control, errors }: any) => {
	const [date, setDate] = useState<Date | null>();
	const [show, setShow] = useState<ShowType>({
		showVal: false,
		type: "date",
	});

	const showDatePicker = () => {
		setShow((prev) => ({ ...prev, showVal: true }));
	};
	const onChangeHandler = (event: any, selectedDate: any) => {
		const currentDate = selectedDate || date;
		//console.log("selected time:", currentDate)

		//const nDate = convertToIST(currentDate)

		//console.log('Date: ----- >>> ', nDate?.date);

		setDate(currentDate);
		if (show.type === "date") {
			setShow((prev) => ({ ...prev, type: "time" }));
			return;
		}
		setShow({ type: "date", showVal: false });
	};
	return (
		<Controller
			control={control}
			name={field.name}
			rules={{
				required: field.required ? `${field.label} is required` : false,
			}}
			render={({ field: { onChange: fieldOnChange } }: any) => {
				return (
					<>
						<View>
							<Text>
								{field.label}:
								<Text>{field.required ? "*" : ""}</Text>
							</Text>
							<View>
								<Text onPress={showDatePicker}>
									{date
										? `${date.toLocaleString("en-US", {
												year: "numeric",
												month: "short",
												day: "numeric",
												hour: "2-digit",
												minute: "2-digit",
												weekday: "long",
										  })}`
										: "Choose Date & Time"}
								</Text>
								<Pressable onPress={showDatePicker}></Pressable>
								{/* <Button title="Enter date and time" /> */}
								{show.showVal && (
									<DateTimePicker
										value={date ?? new Date()}
										mode={show.type} // Change to 'time' for time picker
										display="default"
										onChange={(event, selectedDate) => {
											onChangeHandler(
												event,
												selectedDate
											);
											fieldOnChange(selectedDate);
										}}
									/>
								)}
							</View>
							{typeof errors[field.name]?.message ===
								"string" && (
								<Text style={{ color: "red", marginBottom: 8 }}>
									{errors[field.name]?.message as string}
								</Text>
							)}
						</View>
					</>
				);
			}}
		/>
	);
};

export default DateTimeType;
