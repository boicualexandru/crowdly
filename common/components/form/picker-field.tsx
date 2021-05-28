import { Picker } from "@react-native-picker/picker";
import {
  PickerItemProps,
  PickerProps,
} from "@react-native-picker/picker/typings/Picker";
import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";

interface Props extends PickerProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  items: PickerItemProps[];
}

const PickerField = (props: Props) => {
  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      {props.label && (
        <Text style={[styles.inputLabel, props.labelStyle]}>{props.label}</Text>
      )}
      <Picker
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
      >
        {props.items.map((item) => (
          <Picker.Item {...item} key={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {},
  inputLabel: {
    ...ThemeTypography.body2,
    marginBottom: 4,
    color: ThemeColors.textDark,
    fontWeight: "bold",
  },
});

export default PickerField;
