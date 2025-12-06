import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { Calendar, Clock } from "./assets/icon";

const DateTimeType = ({ field, control, errors }: any) => {
	const [date, setDate] = useState<Date | null>();
	const [time, setTime] = useState<Date | null>();
	const [showClock, setShowClock] = useState(false);
	const [showCalender, setShowCalender] = useState(false);

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
						{field.type === "date" && (
							<View>
								<Text>
									{field.label}:
									<Text style={{ color: "red" }}>
										{field.required ? "*" : ""}
									</Text>
								</Text>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 5,
										borderColor: errors[field.name]
											? "red"
											: "#ccc",
										flexDirection: "row", // Row layout
										alignItems: "center",
									}}
								>
									<TextInput
										showSoftInputOnFocus={false}
										placeholder={field.placeholder}
										onPress={() => setShowCalender(true)}
										style={{
											flex: 1,
											padding: 10,
										}}
										value={
											date
												? `${date.toLocaleString(
														"en-US",
														{
															year: "numeric",
															month: "short",
															day: "numeric",
														}
												  )}`
												: ""
										}
									/>
									<Pressable
										style={{
											alignItems: "flex-end",
											padding: 10,
										}}
										onPress={() => setShowCalender(true)}
									>
										<Calendar width={20} height={20} />
									</Pressable>
									{showCalender && (
										<DateTimePicker
											design="material"
											value={date ?? new Date()}
											mode={"date"} // Change to 'time' for time picker
											display="default"
											onChange={(event, selectedDate) => {
												setDate(selectedDate);
												fieldOnChange(selectedDate);
												setShowCalender(false);
											}}
										/>
									)}
								</View>
								{typeof errors[field.name]?.message ===
									"string" && (
									<Text
										style={{
											color: "red",
											marginBottom: 8,
										}}
									>
										{errors[field.name]?.message as string}
									</Text>
								)}
							</View>
						)}
						{field.type === "time" && (
							<View>
								<Text>
									{field.label}:
									<Text style={{ color: "red" }}>
										{field.required ? "*" : ""}
									</Text>
								</Text>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 5,
										borderColor: errors[field.name]
											? "red"
											: "#ccc",
										flexDirection: "row", // Row layout
										alignItems: "center",
									}}
								>
									<TextInput
										showSoftInputOnFocus={false}
										onPress={() => setShowClock(true)}
										placeholder={field.placeholder}
										style={{
											flex: 1,
											padding: 10,
										}}
										value={
											time
												? `${time.toLocaleString(
														"en-US",
														{
															hour: "2-digit",
															minute: "2-digit",
														}
												  )}`
												: ""
										}
									/>

									<Pressable
										style={{
											alignItems: "flex-end",
											padding: 10,
										}}
										onPress={() => setShowClock(true)}
									>
										<Clock width={20} height={20} />
									</Pressable>

									{showClock && (
										<DateTimePicker
											design="material"
											value={time ?? new Date()}
											mode={"time"} // Change to 'time' for time picker
											display="default"
											onChange={(event, selectedTime) => {
												setTime(selectedTime);
												fieldOnChange(selectedTime);
												setShowClock(false);
											}}
										/>
									)}
								</View>
								{typeof errors[field.name]?.message ===
									"string" && (
									<Text
										style={{
											color: "red",
											marginBottom: 8,
										}}
									>
										{errors[field.name]?.message as string}
									</Text>
								)}
							</View>
						)}
					</>
				);
			}}
		/>
	);
};

export default DateTimeType;
