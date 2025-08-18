import { Checkbox } from "expo-checkbox";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const CheckboxType = ({ field, control, errors }: any) => {
  const toggleOption = (selectedOptions: string[], option: string) => {
    if (selectedOptions.includes(option)) {
      return selectedOptions.filter((item) => item !== option); // remove
    } else {
      return [...selectedOptions, option]; // add
    }
  };

  return (
    <>
      <Text>
        {field.label}
        <Text style={{ color: "red" }}>{field.required ? "*" : ""}</Text>
      </Text>

      <Controller
        control={control}
        name={field.name}
        rules={{
          required: field.required ? `${field.label} is required` : false,
        }}
        defaultValue={[]} // for multi-select
        render={({ field: { value, onChange } }) => (
          <View style={{ marginVertical: 8 }}>
            {field.options?.map((option: string, index: number) => {
              const isChecked = value && value?.includes(option);
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                  onPress={() => onChange(toggleOption(value || [], option))}
                >
                  <Checkbox
                    value={isChecked}
                    onValueChange={() =>
                      onChange(toggleOption(value || [], option))
                    }
                  />
                  <Text style={{ marginLeft: 8 }}>{option}</Text>
                </TouchableOpacity>
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

export default CheckboxType;
