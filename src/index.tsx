import React from "react";
import { useForm } from "react-hook-form";
import { Button, ScrollView, View } from "react-native";
import CheckboxType from "./chooseCheckBox";
import NumType from "./chooseNum";
import PhoneType from "./choosePhone";
import SelectType from "./chooseSelect";
import TextType from "./chooseText";
import RadioType from "./chooseRadio";
import DateTimeType from "./chooseDateTime";

export default function DynamicForm({
	schema,
	handleFormSubmit,
	disabled = false,
	buttonName = "Submit",
}: {
	schema: any;
	handleFormSubmit: (data: any) => void;
	disabled?: boolean;
	buttonName?: string;
}) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		mode: "onBlur",
		reValidateMode: "onChange",
		// defaultValues: schema.reduce((acc: any, field: any) => {
		//   acc[field.name] = field.type === "checkbox" ? false : "";
		//   return acc;
		// }, {}),
	});

	const textType = ["text", "email", "password", "link"];
	return (
		<View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
			<ScrollView>
				{schema.map((field: any) => {
					const commonProps = {
						field,
						control,
						errors,
						watch,
						setValue,
					};
					if (textType.includes(field.type)) {
						return (
							<View style={{ marginBottom: 10 }} key={field.name}>
								<TextType {...commonProps} field={field} />
							</View>
						);
					}
					if (field.type === "phone") {
						return (
							<View style={{ marginBottom: 10 }} key={field.name}>
								<PhoneType {...commonProps} field={field} />
							</View>
						);
					}
					if (field.type === "number") {
						return (
							<View style={{ marginBottom: 10 }} key={field.name}>
								<NumType {...commonProps} field={field} />
							</View>
						);
					}
					if (field.type === "checkbox") {
						return (
							<View style={{ marginBottom: 10 }} key={field.name}>
								<CheckboxType {...commonProps} field={field} />
							</View>
						);
					}
					if (field.type === "select") {
						return (
							<View style={{ marginBottom: 10 }} key={field.name}>
								<SelectType {...commonProps} field={field} />
							</View>
						);
					}
					if (field.type === "radio") {
						return (
							<View style={{ marginBottom: 10 }} key={field.name}>
								<RadioType {...commonProps} />
							</View>
						);
					}
					if (field.type === "date") {
						return (
							<View style={{ marginBottom: 10 }} key={field.name}>
								<DateTimeType {...commonProps} />
							</View>
						);
					}
					if (field.type === "time") {
						return (
							<View style={{ marginBottom: 10 }} key={field.name}>
								<DateTimeType {...commonProps} />
							</View>
						);
					}
					return null;
				})}

				<View style={{ marginTop: 16 }}>
					<Button
						title={buttonName}
						disabled={disabled}
						onPress={handleSubmit(handleFormSubmit)}
					/>
				</View>
			</ScrollView>
		</View>
	);
}
