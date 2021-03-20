import React from "react";
import { Text, Pressable, Modal, Alert, StyleSheet } from "react-native";

interface Props {
  isOpen: boolean;
  requestClose: () => void;
  onNewService: () => void;
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
        <Pressable style={styles.modalView} onPress={(e) => e.preventDefault()}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              // props.onNewService();
              props.requestClose();
            }}
          >
            <Text style={styles.textStyle}>Eveniment Nou</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              props.onNewService();
              props.requestClose();
            }}
          >
            <Text style={styles.textStyle}>Serviciu Nou</Text>
          </Pressable>
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NewItemModal;
