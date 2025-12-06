<h1 align="center">dynamic-form-from-json</h1> 
<p align="center">
  <strong>Create Forms Fast and Easy</strong><br>
  for React Native Expo app
</p>

dynamic-form-from-json is a React Native library built on top of react-hook-form.

It’s designed to make creating forms quick and simple. You just need to create an array of objects to define input fields type, with optional settings like “required”, "placeholeder" and "Validation".

# Install
```
npm install form-from-json
```

# Demo
<img width="40%" height="full" alt="Screenshot_20251206-135603" src="https://github.com/user-attachments/assets/6ab9bc8c-87e2-4812-89a6-cf57e4d7a18b" />

# Usage Example
```
import DynamicForm from "dynamic-form-from-json";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const createFormSchema = [
	{
		name: "username",
		label: "Name",
		type: "text",
		required: false, //optional
		validation: { minLength: 3, maxLength: 30 }, //optional
		placeholder: "Jhon Doe", //optional
	},
	{
		name: "useremail",
		label: "Email",
		type: "email",
		required: false, //optional
		validation: { minLength: 3, maxLength: 30 }, //optional
		placeholder: "jhoneDoe@email.com", //optional
	},
	{
		name: "phonenumber",
		label: "phone Number",
		type: "phone",
		required: true,
		placeholder: "enter your phone number",
	},
	{
		name: "password",
		label: "password",
		type: "password",
		required: true,
		placeholder: "Enter password", //optional
	},
	{
		name: "userAge",
		label: "Age",
		type: "number",
		required: true,
		placeholder: "45",
		validation: {
			min: 12,
			max: 60,
		},
	},
	{
		name: "UserSocialMediaLink",
		label: "userSocialMediaLink",
		type: "link",
		required: false, //optional
		validation: { minLength: 3, maxLength: 30 }, //optional
		placeholder: "example.com", //optional
	},
	{
		name: "date",
		label: "Date",
		type: "date", // you can map this to a DateTimePicker component
		required: true,
		placeholder: "Select date",
	},
	{
		name: "time",
		label: "time",
		type: "time", // you can map this to a DateTimePicker component
		required: true,
		placeholder: "Select time",
	},
	{
		name: "gender",
		label: "Gender",
		type: "select",
		required: true,
		options: [
			{ label: "Select Gender", value: "" },
			{ label: "Male", value: "male" },
			{ label: "Female", value: "female" },
			{ label: "Other", value: "other" },
		],
	},
	{
		name: "userfavouriteColor",
		label: "Favorite color from below three",
		type: "radio",
		required: true,
		options: ["Red ", "Green", "Blue"],
	},
	{
		name: "userfavouritehobby",
		label: "what you like to do most:",
		type: "checkbox",
		required: true,
		options: ["Reading", "Playing", "singing"],
	},
];

export default function CreateDynamicForm() {
	return (
		<SafeAreaView style={styles.bg}>
			<DynamicForm
				schema={createFormSchema}
				handleFormSubmit={(e) => {
					console.log(e);
				}}
				disabled={false}
				buttonName="Add Details"
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	bg: {
		height: "100%",
		backgroundColor: "#fff",
	},
});

```
