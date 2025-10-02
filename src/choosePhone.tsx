import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

const PhoneType = ({ field, control, errors, setValue }: any) => {
	useEffect(() => {
		if (field.value) {
			setValue(field.name, field.value);
		}
	}, []);
	return (
		<>
			<Controller
				control={control}
				rules={{
					required: field.required
						? `${field.label} is required`
						: false,
					pattern: {
						value: /^\d{10}$/,
						message: "Invalid phone number",
					},
					minLength: {
						value: 10,
						message: `${field.label} must be 10 digits`,
					},
				}}
				render={({
					field: { onChange, onBlur, value },
				}: {
					field: {
						onChange: (text: string) => void;
						onBlur: () => void;
						value: string;
					};
				}) => (
					<View style={{ flexDirection: "column", gap: 4 }}>
						<Text>
							{field.label}:
							<Text style={{ color: "red" }}>
								{field.required ? "*" : ""}
							</Text>
						</Text>
						<View
							style={{
								borderWidth: 1,
								borderColor: errors[field.name]
									? "red"
									: "#ccc",
								borderRadius: 5,
								paddingHorizontal: 5,
								flexDirection: "row",
								alignItems: "center",
								gap: 4,
							}}
						>
							<Text>
								{field.countryCode ? field.countryCode : "+91"}
							</Text>
							<TextInput
								maxLength={10}
								inputMode="numeric"
								placeholder={field.placeholder}
								onBlur={onBlur}
								onChangeText={(text) => {
									const numeric = text.replace(/[^0-9]/g, "");
									onChange(numeric);
								}}
								value={value}
								editable={!field.value}
							/>
						</View>
						{errors[field.name]?.message && (
							<Text style={{ color: "red", marginBottom: 8 }}>
								{errors[field.name]?.message as string}
							</Text>
						)}
					</View>
				)}
				name={field.name}
			/>
		</>
	);
};

export default PhoneType;
