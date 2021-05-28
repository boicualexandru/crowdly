import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

interface Props {
  children: JSX.Element;
  isOpen: boolean;
  requestClose: () => void;
}

const BigModal = (props: Props) => {
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
        style={[styles.centeredView, styles.modalOverlay]}
        onPress={() => props.requestClose()}
      >
        <Pressable style={styles.modalView} onPress={(e) => e.preventDefault()}>
          {props.children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    backgroundColor: "#ffffffa0",
    padding: 16
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%'
  },
});

export default BigModal;
