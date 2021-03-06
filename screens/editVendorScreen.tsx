import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import useVendorsApi, {
  vendorCategoryOptions,
  VendorCategoryType,
} from "api/vendors";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/rootStack";

import Button from "@components/button/button";
import Divider from "@components/divider/divider";
import PickerField from "@components/form/picker-field";
import TextField from "@components/form/text-field";

import useImagePicker from "@hooks/useImagePicker";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";
import RangeTextField from "@components/form/range-text-field";
import { availableCities, availableCitiesPickerOptions } from "api/helpers/cities";

type EditVendorScreenNavigationProp = RootStackNavigationPropChild<"EditVendor">;
type EditVendorScreenRouteProp = RootStackRoutePropChild<"EditVendor">;

type Props = {
  navigation: EditVendorScreenNavigationProp;
  route: EditVendorScreenRouteProp;
};

interface EditVendorForm {
  name: string;
  cityId: string;
  price: string;
  guestsMin: string;
  guestsMax: string;
  phone: string;
  email: string;
  description: string;
  category: VendorCategoryType;
}

const EditVendorScreen = ({ route, navigation }: Props) => {
  const { updateVendor, createVendor, getVendorById } = useVendorsApi();
  const [oldImages, setOldImages] = useState<string[]>([]);

  const formik = useFormik<EditVendorForm>({
    initialValues: {
      name: "",
      cityId: availableCities[0].id,
      price: "",
      guestsMin: "",
      guestsMax: "",
      phone: "",
      email: "",
      description: "",
      category: VendorCategoryType.None,
    },
    onSubmit: async (values) => {
      const imgaesUris = images.map((img) => img.uri);
      const existingImages = imgaesUris.filter((img) =>
        oldImages.includes(img)
      );
      const newImages = imgaesUris.filter((img) => !oldImages.includes(img));

      if (route.params.vendorId) {
        await updateVendor({
          ...values,
          price: getNumericalValue(values.price) || 0,
          guestsMin: getNumericalValue(values.guestsMin) || 0,
          guestsMax: getNumericalValue(values.guestsMax) || 0,
          id: route.params.vendorId,
          existingImages: existingImages,
          newImages: newImages,
        });
      } else {
        await createVendor({
          ...values,
          price: getNumericalValue(values.price) || 0,
          guestsMin: getNumericalValue(values.guestsMin) || 0,
          guestsMax: getNumericalValue(values.guestsMax) || 0,
          images: newImages,
        });
      }

      navigation.pop();
    },
  });

  const {
    images,
    initImages,
    isAnySelected,
    removeSelected,
    pickImage,
    takePhoto,
    selectImage,
    unselectImage,
  } = useImagePicker();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        navigation.setOptions({
          title: route.params.vendorId ? "Editeaza Serviciul" : "Serviciu Nou",
        });

        if (route.params.vendorId) {
          const vendor = await getVendorById(route.params.vendorId);

          formik.setValues(
            {
              name: vendor.name,
              cityId: vendor.cityId,
              price: vendor.price.toString(),
              guestsMin: vendor.guestsMin?.toString() || '',
              guestsMax: vendor.guestsMax?.toString() || '',
              phone: vendor.phone,
              email: vendor.email,
              description: vendor.description,
              category: vendor.category,
            },
            false
          );
          if (vendor.images?.length) {
            initImages(vendor.images);
            setOldImages(vendor.images);
          }
        }
      })();
    }, [route.params])
  );
  
  const getNumericalValue = useCallback((text: string): number | undefined => {
    const numericalValue = parseFloat(text);
    return isNaN(numericalValue) ? undefined : numericalValue;
  }, []);

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
      keyboardShouldPersistTaps="always"
    >
      <View>
        <TextField
          label="Numele Serviciului"
          placeholder="Ex. DJ"
          onChangeText={formik.handleChange("name")}
          value={formik.values.name}
          containerStyle={styles.fieldGroup}
        />
        <PickerField
          label="Oras"
          items={availableCitiesPickerOptions}
          selectedValue={formik.values.cityId}
          onValueChange={(itemValue, itemIndex) =>
            formik.setFieldValue("cityId", itemValue)
          }
          containerStyle={styles.fieldGroup}
        />
        <TextField
          label="Pret"
          placeholder="Ex: 1200"
          rightText="Lei"
          onChangeText={formik.handleChange("price")}
          value={formik.values.price}
          containerStyle={styles.fieldGroup}
          keyboardType={"numeric"}
        />
        <RangeTextField
          label="Numar de invitati"
          values={{ left: getNumericalValue(formik.values.guestsMin), right: getNumericalValue(formik.values.guestsMax) }}
          onChanges={({ left, right }) => {
            formik.handleChange("guestsMin")(left?.toString() || '')
            formik.handleChange("guestsMax")(right?.toString() || '')
          }}
          placeholders={{
            left: 'Min',
            right: 'Max',
          }}
          containerStyle={styles.fieldGroup}
        />
        <TextField
          label="Telefon"
          onChangeText={formik.handleChange("phone")}
          value={formik.values.phone}
          containerStyle={styles.fieldGroup}
          autoCompleteType="tel"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />
        <TextField
          label="Adresa de Email"
          onChangeText={formik.handleChange("email")}
          value={formik.values.email}
          containerStyle={styles.fieldGroup}
          autoCompleteType="email"
          textContentType="emailAddress"
        />
        <TextField
          label="Descriere"
          placeholder="Ex: Salut, ..."
          multiline
          numberOfLines={4}
          onChangeText={formik.handleChange("description")}
          value={formik.values.description}
          containerStyle={styles.fieldGroup}
        />
        <PickerField
          label="Categoria"
          items={vendorCategoryOptions}
          selectedValue={formik.values.category}
          onValueChange={(itemValue, itemIndex) =>
            formik.setFieldValue("category", itemValue)
          }
          containerStyle={styles.fieldGroup}
        />
        <Divider style={{ marginTop: 16 }} />
        <View style={[styles.row, { marginTop: 16 }]}>
          <View style={styles.columnHalf}>
            <Button
              label="Fotografiaza"
              leftIcon="camera"
              style={{ flex: 1 }}
              onPress={takePhoto}
              iconTheme="Feather"
              outlined
            />
          </View>
          <View style={styles.columnHalf}>
            <Button
              label="Incarca"
              leftIcon="image"
              style={{ flex: 1 }}
              onPress={pickImage}
              iconTheme="Feather"
              outlined
            />
          </View>
        </View>
        {images.length > 0 && renderImagesSelection()}
      </View>
      <Divider style={{ marginTop: 16 }} />
      <View>
        <Button
          onPress={() => formik.handleSubmit()}
          label="Salveaza"
          style={{ marginVertical: 16 }}
          loading={formik.isSubmitting}
        />
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
  fieldGroup: {
    marginTop: 16,
  },
  imageContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ThemeColors.textGray,
    padding: 4,
    marginBottom: 8,
  },
  imagesContainer: {
    marginTop: 16,
    flexWrap: "wrap",
  },
  image: {
    borderRadius: 8,
    width: "100%",
    aspectRatio: 4 / 3,
  },
  checkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  inputLabel: {
    ...ThemeTypography.body2,
    marginBottom: 4,
    color: ThemeColors.textDark,
    fontWeight: "bold",
  },
});

export default EditVendorScreen;
