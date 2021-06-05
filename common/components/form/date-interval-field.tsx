import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  Pressable,
  TextProps,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";
import moment from "moment";

interface Props extends TextProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  values: {
    left?: Date;
    right?: Date;
  };
  onChanges: (values: { left?: Date; right?: Date }) => void;
}

const DateIntervalField = (props: Props) => {
  const [pickerOpenedFor, setPickerOpenedFor] = useState<"left" | "right" | null>(null);
  console.log("render ", pickerOpenedFor);
  

  const getStringValue = useCallback((value: Date | undefined): string => {
    if (value == null) return "";
      return moment(value).format("Do MMM YYYY");
  }, []);

  const stringValues = {
    left: getStringValue(props.values.left),
    right: getStringValue(props.values.right),
  };

  const onChange = (date?: Date) => {
    setPickerOpenedFor(null);
    
    if (pickerOpenedFor)
      props.onChanges({ ...props.values, [pickerOpenedFor]: date });
  };

  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      {props.label && (
        <Text style={[styles.inputLabel, props.labelStyle]}>{props.label}</Text>
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable style={[styles.inputWrapper]} onPress={() => setPickerOpenedFor("left")}>
          {
            stringValues.left ?
            <Text {...props} style={styles.input}>
              {stringValues.left}
            </Text> : 
            <Text {...props} style={styles.placeholder}>De la</Text>
          }
        </Pressable>
        <Text style={styles.divider}>-</Text>
        <Pressable style={[styles.inputWrapper]} onPress={() => setPickerOpenedFor("right")}>
          {
            stringValues.right ?
            <Text {...props} style={styles.input}>
              {stringValues.right}
            </Text> : 
            <Text {...props} style={styles.placeholder}>Pana la</Text>
          }
        </Pressable>
      </View>
      {
        pickerOpenedFor &&
        <DateTimePicker
          testID="dateTimePicker"
          value={(pickerOpenedFor == "left" ? props.values.left : props.values.right) || new Date()}
          mode="date"
          display="default"
          onChange={(ev, date) => onChange(date)}
        />
      }
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
  inputWrapper: {
    height: 40,
    borderColor: ThemeColors.gray,
    backgroundColor: ThemeColors.white,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    flex: 1,
    alignItems: 'center',
  },
  input: {
    ...ThemeTypography.body1,
    color: ThemeColors.textDark,
    flex: 1,
  },
  placeholder: {
    ...ThemeTypography.body1,
    color: ThemeColors.textGray,
    flex: 1,
  },
  divider: {
    ...ThemeTypography.body1,
    color: ThemeColors.textDark,
    paddingHorizontal: 8,
  },
});

export default DateIntervalField;
