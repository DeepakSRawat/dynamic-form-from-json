import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { Text } from "react-native";

const SelectType = ({ field, control, errors }: any) => {
  return (
    <>
      <Text>
        {field.label}:
        <Text style={{ color: "red" }}>{field.required ? "*" : ""}</Text>
      </Text>
      <Controller
        control={control}
        name={field.name}
        rules={{
          required: field.required ? "Please select an option" : false,
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              {field.options.map((option: any) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            {errors[field.name] && (
              <Text style={{ color: "red" }}>
                {errors[field.name]?.message}
              </Text>
            )}
          </>
        )}
      />
    </>
  );
};

export default SelectType;
