import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";

interface Props extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  values: {
    left?: number;
    right?: number;
  };
  placeholders?: {
    left?: string;
    right?: string;
  }
  onChanges: (values: { left?: number; right?: number }) => void;
}

const RangeTextField = (props: Props) => {
  const getStringValue = useCallback((value: number | undefined): string => {
    if (value == null) return "";
    return value.toString();
  }, []);

  const getNumericalValue = useCallback((text: string): number | undefined => {
    const numericalValue = parseFloat(text);
    return isNaN(numericalValue) ? undefined : numericalValue;
  }, []);

  const stringValues = {
    left: getStringValue(props.values.left),
    right: getStringValue(props.values.right),
  };

  const onChange = (value: string, source: "left" | "right") => {
    props.onChanges({ ...props.values, [source]: getNumericalValue(value) });
  };

  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      {props.label && (
        <Text style={[styles.inputLabel, props.labelStyle]}>{props.label}</Text>
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={[styles.inputWrapper, props.multiline && { height: -1 }]}>
          <TextInput
            {...props}
            keyboardType="numeric"
            style={[
              styles.input,
              props.style,
              props.multiline && {
                textAlignVertical: "top",
                paddingVertical: 8,
              },
            ]}
            value={stringValues.left}
            placeholder={props.placeholders?.left || ''}
            onChangeText={(text) => onChange(text, "left")}
          />
        </View>
        <Text style={styles.divider}>-</Text>
        <View style={[styles.inputWrapper, props.multiline && { height: -1 }]}>
          <TextInput
            {...props}
            keyboardType="numeric"
            style={[
              styles.input,
              props.style,
              props.multiline && {
                textAlignVertical: "top",
                paddingVertical: 8,
              },
            ]}
            value={stringValues.right}
            placeholder={props.placeholders?.right || ''}
            onChangeText={(text) => onChange(text, "right")}
          />
        </View>
      </View>
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
  },
  input: {
    ...ThemeTypography.body1,
    color: ThemeColors.textDark,
    flex: 1,
  },
  divider: {
    ...ThemeTypography.body1,
    color: ThemeColors.textDark,
    paddingHorizontal: 8,
  },
});

export default RangeTextField;
