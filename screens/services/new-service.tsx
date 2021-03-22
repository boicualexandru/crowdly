import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/root-stack";

import Button from "@components/button/button";
import Divider from "@components/divider/divider";
import TextField from "@components/form/text-field";

import useImagePicker from "@hooks/useImagePicker";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";

type NewServiceScreenNavigationProp = RootStackNavigationPropChild<"NewService">;
type NewServiceScreenRouteProp = RootStackRoutePropChild<"NewService">;

type Props = {
  route: NewServiceScreenRouteProp;
};

const NewServiceScreen = ({ route }: Props) => {
  const [value, onChangeText] = useState("");

  const {
    images,
    isAnySelected,
    removeSelected,
    pickImage,
    takePhoto,
    selectImage,
    unselectImage,
  } = useImagePicker();

  const renderImage = (
    image: { uri: string; selected: boolean },
    index: number
  ) => (
    <View style={styles.columnHalf} key={index}>
      <Pressable
        style={[
          styles.imageContainer,
          image.selected && {
            borderWidth: 3,
            borderColor: ThemeColors.primary,
          },
        ]}
        onPress={() =>
          isAnySelected &&
          (image.selected ? unselectImage(index) : selectImage(index))
        }
        onLongPress={() => selectImage(index)}
      >
        <Image source={{ uri: image.uri }} style={styles.image} />
        {isAnySelected && (
          <FontAwesome5
            name={image.selected ? "check-square" : "square"}
            size={20}
            color={ThemeColors.primary}
            style={styles.checkIcon}
          />
        )}
      </Pressable>
    </View>
  );

  const renderRemoveImageButton = () => (
    <View style={[styles.row, { marginTop: 16 }]}>
      <View style={styles.columnHalf}>
        <Button
          label="Sterge"
          leftIcon="trash"
          style={{ flex: 1 }}
          onPress={removeSelected}
        />
      </View>
    </View>
  );

  const renderImageSelectionNote = () => (
    <View style={{ marginTop: 16 }}>
      <Text
        style={[
          ThemeTypography.body2,
          { fontStyle: "italic", color: ThemeColors.textGray },
        ]}
      >
        Apasa lung pentru a incepe selectia.
      </Text>
    </View>
  );

  const renderImagesSelection = () => (
    <>
      <View style={[styles.row, styles.imagesContainer]}>
        {images.map(renderImage)}
      </View>
      {isAnySelected ? renderRemoveImageButton() : renderImageSelectionNote()}
    </>
  );

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
      }}
    >
      <View>
        <TextField
          label="Numele Serviciului"
          placeholder="Ex. DJ"
          onChangeText={(text) => onChangeText(text)}
          value={value}
          containerStyle={styles.textField}
        />
        <TextField
          label="Oras"
          placeholder="Ex: Iasi"
          onChangeText={(text) => onChangeText(text)}
          value={value}
          containerStyle={styles.textField}
        />
        <TextField
          label="Pret"
          placeholder="Ex: 1200"
          rightText="Lei"
          onChangeText={(text) => onChangeText(text)}
          value={value}
          containerStyle={styles.textField}
          keyboardType={"numeric"}
        />
        <TextField
          label="Descriere"
          placeholder="Ex: Salut, ..."
          multiline
          numberOfLines={4}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          containerStyle={styles.textField}
        />
        <Divider style={{ marginTop: 16 }} />
        <View style={[styles.row, { marginTop: 16 }]}>
          <View style={styles.columnHalf}>
            <Button
              label="Incarca Imagine"
              leftIcon="image"
              style={{ flex: 1 }}
              onPress={pickImage}
            />
          </View>
          <View style={styles.columnHalf}>
            <Button
              label="Fotografiaza"
              leftIcon="camera"
              style={{ flex: 1 }}
              onPress={takePhoto}
            />
          </View>
        </View>
        {images.length > 0 && renderImagesSelection()}
      </View>
      <Divider style={{ marginTop: 16 }} />
      <View>
        <Button label="Salveaza" style={{ marginVertical: 16 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    marginHorizontal: -8,
    flexDirection: "row",
  },
  columnHalf: {
    paddingHorizontal: 8,
    width: "50%",
  },
  textField: {
    marginTop: 16,
  },
  imageContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: ThemeColors.gray,
    paddingHorizontal: 4,
  },
  imagesContainer: {
    marginTop: 16,
    flexWrap: "wrap",
  },
  image: {
    borderRadius: 4,
    width: "100%",
    aspectRatio: 4 / 3,
  },
  checkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default NewServiceScreen;
