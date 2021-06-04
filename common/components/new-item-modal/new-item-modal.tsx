import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Image,
} from "react-native";

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
        props.requestClose();
      }}
    >
      <Pressable
        style={[styles.modalOverlay]}
        onPress={() => props.requestClose()}
      >
        <Pressable
          style={[styles.itemContainer, { marginBottom: 16 }]}
          onPress={(e) => {
            e.preventDefault();
            // props.onNewVendor();
            props.requestClose();
          }}
        >
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
            }}
            style={styles.bgImage}
            resizeMode="cover"
          />
          <Text style={styles.text}>Eveniment Nou</Text>
        </Pressable>
        <Pressable
          style={[styles.itemContainer]}
          onPress={(e) => {
            e.preventDefault();
            props.onNewVendor();
            props.requestClose();
          }}
        >
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1584402617825-1a58712ae0b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=742&q=80",
            }}
            style={styles.bgImage}
            resizeMode="cover"
          />
          <Text style={styles.text}>Serviciu Nou</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // centeredView: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  modalOverlay: {
    backgroundColor: "#ffffffdd",
    padding: 16,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemContainer: {
    backgroundColor: "#000",
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 3,
    position: "relative",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.5,
  },
  text: {
    ...ThemeTypography.h5,
    ...ThemeTypographyColorStyles.text_white,
    textTransform: "uppercase",
    letterSpacing: 4,
    fontWeight: "600",
  },
});

export default NewItemModal;
