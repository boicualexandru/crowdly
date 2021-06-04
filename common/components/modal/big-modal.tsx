import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
      <BlurView style={{height: '100%'}} intensity={100} tint="light">
        <ScrollView
          style={styles.modalOverlay}
          contentContainerStyle={{
            justifyContent: "center",
            flexGrow: 1,
            padding: 16,
          }}
          keyboardShouldPersistTaps="always"
        >
          <Pressable
            style={[styles.centeredView]}
            onPress={() => props.requestClose()}
          >
            <Pressable
              style={styles.modalView}
              onPress={(e) => e.preventDefault()}
            >
              {props.children}
            </Pressable>
          </Pressable>
        </ScrollView>
      </BlurView>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
});

export default BigModal;
