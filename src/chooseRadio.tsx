import React from "react";
import { Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

const RadioType = ({ field, control, errors }: any) => {
	return (
		<>
			<Text>
				{field.label}
				<Text>{field.required ? "*" : ""}</Text>
			</Text>

			<Controller
				control={control}
				name={field.name}
				rules={{
					required: field.required
						? `${field.label} is required`
						: false,
				}}
				defaultValue={""} // radio = single value, not an array
				render={({ field: { value, onChange } }) => (
					<View>
						{field.options?.map((option: string, index: number) => {
							const isSelected = value === option;
							return (
								<Pressable
									key={index}
									onPress={() => onChange(option)}
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 4,
									}}
								>
									<View
										style={{
											width: 10,
											height: 10,
											borderRadius: "50%",
											borderColor: "#000",
											borderWidth: 1,
											backgroundColor: `${
												isSelected ? `#000` : "#fff"
											}`,
										}}
									/>
									<Text>{option}</Text>
								</Pressable>
							);
						})}
					</View>
				)}
			/>

			{typeof errors[field.name]?.message === "string" && (
				<Text style={{ color: "red", marginBottom: 8 }}>
					{errors[field.name]?.message}
				</Text>
			)}
		</>
	);
};

export default RadioType;
