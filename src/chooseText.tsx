import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import EyeClosedIcon from "./assets/eye-closed.svg";
import EyeIcon from "./assets/eye.svg";

const TextType = ({ field, control, errors, setValue }: any) => {
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		if (field.value) {
			setValue(field.name, field.value);
		}
	}, []);

	return (
		<Controller
			control={control}
			rules={{
				required: field.required ? `${field.label} is required` : false,
				minLength: field.validation?.minLength && {
					value: field.validation.minLength,
					message: `${field.label} must be at least ${field.validation.minLength} characters`,
				},
				maxLength: field.validation?.maxLength && {
					value: field.validation.maxLength,
					message: `${field.label} must be at most ${field.validation.maxLength} characters`,
				},
				pattern:
					field.type === "email"
						? {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: `${field.label} format is invalid`,
						  }
						: field.type === "link"
						? {
								value: /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
								message: `${field.label} format is invalid`,
						  }
						: undefined,
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
				<>
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
							borderColor: errors[field.name] ? "red" : "#ccc",
							flexDirection: "row", // Row layout
							alignItems: "center",
						}}
					>
						<TextInput
							secureTextEntry={
								field.type === "password" && !isVisible
							}
							placeholder={field.placeholder}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							editable={!field.value}
							style={{
								flex: 1,
								padding: 10,
							}}
						/>

						{field.type === "password" && (
							<Pressable
								style={{
									alignItems: "flex-end",
									padding: 10,
								}}
								onPress={() => setIsVisible((prev) => !prev)}
							>
								{isVisible ? (
									<EyeIcon width={20} height={20} />
								) : (
									<EyeClosedIcon width={20} height={20} />
								)}
							</Pressable>
						)}
					</View>
					{typeof errors[field.name]?.message === "string" && (
						<Text style={{ color: "red", marginBottom: 8 }}>
							{errors[field.name]?.message as string}
						</Text>
					)}
				</>
			)}
			name={field.name}
		/>
	);
};

export default TextType;
