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
import moment from "moment";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";
import Note from "@components/note/note";
import DateTimePicker from '@react-native-community/datetimepicker';

export interface DateFieldProps extends TextProps {
  value?: Date;
  placeholder?: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  rightText?: string;
  noteText?: string;
  isError?: boolean;
  onChange: (values?: Date) => void;
}

const DateField = (props: DateFieldProps) => {
  const [isPickerOpened, setIsPickerOpened] = useState(false);

  const getStringValue = useCallback((value: Date | undefined): string => {
    if (value == null) return "";
      return moment(value).format("Do MMM YYYY");
  }, []);

  const stringValue = getStringValue(props.value);

  const onChange = (date?: Date) => {
    setIsPickerOpened(false);
    
    if (isPickerOpened)
      props.onChange(date);
  };

  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      {
        props.label &&
        <Text style={[styles.inputLabel, props.labelStyle]}>
          {props.label}
        </Text>
      }
      <Pressable style={[styles.inputWrapper]} onPress={() => setIsPickerOpened(true)}>
        {
          stringValue ?
          <Text {...props} style={styles.input}>
            {stringValue}
          </Text> : 
          <Text {...props} style={styles.placeholder}>{props.placeholder}</Text>
        }
      </Pressable>
      {
        props.noteText ?
        <Note text={props.noteText} style={{marginTop: 4}} colorType={props.isError ? 'danger' : 'info'} /> : null
      }
      {
        isPickerOpened &&
        <DateTimePicker
          testID="dateTimePicker"
          value={props.value || new Date()}
          mode="date"
          display="default"
          onChange={(ev, date) => onChange(date)}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
  },
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
  sideText: {
    ...ThemeTypography.body1,
    color: ThemeColors.textDark,
    fontWeight: "bold",
    textAlignVertical: "center"
  }
});

export default DateField;
