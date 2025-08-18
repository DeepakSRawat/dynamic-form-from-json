import { Controller } from "react-hook-form";
import { Text, TextInput } from "react-native";

const NumType = ({ field, control, errors }: any) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: field.required ? `${field.label} is required` : false,
          pattern: {
            value: /^[0-9]*$/,
            message: "Only numbers are allowed",
          },
          min: {
            value: field.validation?.min,
            message: `${field.label} must be at least ${field.validation?.min}`,
          },
          max: {
            value: field.validation?.max,
            message: `${field.label} must be at most ${field.validation?.max}`,
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
          <>
            <Text>
              {field.label}:
              <Text style={{ color: "red" }}>{field.required ? "*" : ""}</Text>
            </Text>
            <TextInput
              inputMode="numeric"
              placeholder={field.placeholder}
              onBlur={onBlur}
              onChangeText={(text) => {
                const numeric = text.replace(/[^0-9]/g, "");
                onChange(numeric);
              }}
              value={value}
              style={{
                marginBottom: 8,
                borderWidth: 1,
                borderColor: errors[field.name] ? "red" : "#ccc",
                borderRadius: 4,
                padding: 8,
              }}
            />
            {errors[field.name]?.message && (
              <Text style={{ color: "red", marginBottom: 8 }}>
                {errors[field.name]?.message as string}
              </Text>
            )}
          </>
        )}
        name={field.name}
      />
    </>
  );
};

export default NumType;
