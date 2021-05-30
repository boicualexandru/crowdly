import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, Pressable, Modal, Alert, StyleSheet, View } from "react-native";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

interface Props {
  isOpen: boolean;
  requestClose: () => void;
  onNewVendor: () => void;
}

const NewItemModal = (props: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isOpen}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        props.requestClose();
      }}
    >
      <Pressable
        style={[styles.centeredView, styles.modalOverlay]}
        onPress={() => props.requestClose()}
      >
        <Pressable
          style={[styles.button]}
          onPress={(e) => {
            e.preventDefault();
            // props.onNewVendor();
            props.requestClose();
          }}
        >
          <MaterialCommunityIcons
            name="calendar-plus"
            color={ThemeColors.white}
            size={50}
            style={styles.buttonIcon}
          />
          <Text style={styles.textStyle}>Eveniment Nou</Text>
        </Pressable>
        <Pressable
          style={[styles.button]}
          onPress={(e) => {
            e.preventDefault();
            props.onNewVendor();
            props.requestClose();
          }}
        >
          <MaterialCommunityIcons
            name="briefcase-plus-outline"
            color={ThemeColors.white}
            size={50}
            style={styles.buttonIcon}
          />
          <Text style={styles.textStyle}>Serviciu Nou</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    backgroundColor: "#ffffffdd",
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 200,
    marginHorizontal: 10,
    elevation: 3,
    backgroundColor: ThemeColors.primary,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginBottom: 8,
  },
  textStyle: {
    ...ThemeTypography.subtitle1,
    ...ThemeTypographyColorStyles.text_white,
  },
});

export default NewItemModal;
