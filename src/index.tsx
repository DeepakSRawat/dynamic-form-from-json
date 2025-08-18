import React from "react";
import { useForm } from "react-hook-form";
import { Button, ScrollView, View } from "react-native";
import CheckboxType from "./chooseCheckBox";
import NumType from "./chooseNum";
import PhoneType from "./choosePhone";
import SelectType from "./chooseSelect";
import TextType from "./chooseText";

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
          const commonProps = { field, control, errors, watch, setValue };
          if (textType.includes(field.type)) {
            return <TextType {...commonProps} field={field} key={field.name} />;
          }
          if (field.type === "phone") {
            return (
              <PhoneType {...commonProps} field={field} key={field.name} />
            );
          }
          if (field.type === "number") {
            return <NumType {...commonProps} field={field} key={field.name} />;
          }
          if (field.type === "checkbox") {
            return (
              <CheckboxType {...commonProps} field={field} key={field.name} />
            );
          }
          if (field.type === "select") {
            return (
              <SelectType {...commonProps} field={field} key={field.name} />
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
