import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import useEventsApi, {
  eventCategoryOptions,
  EventCategoryType,
} from "api/events";
import { useFormik } from "formik";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/rootStack";

import Button from "@components/button/button";
import Divider from "@components/divider/divider";
import DateIntervalField from "@components/form/date-interval-field";
import PickerField from "@components/form/picker-field";
import TextField from "@components/form/text-field";

import useImagePicker from "@hooks/useImagePicker";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";
import { availableCities, availableCitiesPickerOptions } from "api/helpers/cities";

type EditEventScreenNavigationProp = RootStackNavigationPropChild<"EditEvent">;
type EditEventScreenRouteProp = RootStackRoutePropChild<"EditEvent">;

type Props = {
  navigation: EditEventScreenNavigationProp;
  route: EditEventScreenRouteProp;
};

interface EditEventForm {
  name: string;
  cityId: string;
  price: string;
  startDateTime: string;
  endDateTime: string;
  guests: string;
  phone: string;
  email: string;
  description: string;
  category: EventCategoryType;
}

const EditEventScreen = ({ route, navigation }: Props) => {
  const { updateEvent, createEvent, getEventById } = useEventsApi();
  const [oldImages, setOldImages] = useState<string[]>([]);

  const formik = useFormik<EditEventForm>({
    initialValues: {
      name: "",
      cityId: availableCities[0].id,
      price: "",
      startDateTime: moment().add(1, "day").startOf("day").format("YYYY-MM-DD"),
      endDateTime: moment().add(2, "day").startOf("day").format("YYYY-MM-DD"),
      guests: "",
      phone: "",
      email: "",
      description: "",
      category: EventCategoryType.None,
    },
    onSubmit: async (values) => {
      const imgaesUris = images.map((img) => img.uri);
      const existingImages = imgaesUris.filter((img) =>
        oldImages.includes(img)
      );
      const newImages = imgaesUris.filter((img) => !oldImages.includes(img));

      if (route.params.eventId) {
        await updateEvent({
          ...values,
          price: getNumericalValue(values.price) || 0,
          startDateTime: new Date(values.startDateTime),
          endDateTime: new Date(values.endDateTime),
          guests: getNumericalValue(values.guests),
          isPublic: true,
          id: route.params.eventId,
          existingImages: existingImages,
          newImages: newImages,
        });
      } else {
        await createEvent({
          ...values,
          price: getNumericalValue(values.price) || 0,
          startDateTime: new Date(values.startDateTime),
          endDateTime: new Date(values.endDateTime),
          guests: getNumericalValue(values.guests),
          isPublic: true,
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
          title: route.params.eventId
            ? "Editeaza Evenimentul"
            : "Eveniment Nou",
        });

        if (route.params.eventId) {
          const event = await getEventById(route.params.eventId);

          formik.setValues(
            {
              name: event.name,
              cityId: event.cityId,
              price: event.price.toString(),
              startDateTime: moment(event.startDateTime).format("YYYY-MM-DD"),
              endDateTime: moment(event.endDateTime).format("YYYY-MM-DD"),
              guests: event.guests?.toString() || "",
              phone: event.phone,
              email: event.email,
              description: event.description,
              category: event.category,
            },
            false
          );
          if (event.images?.length) {
            initImages(event.images);
            setOldImages(event.images);
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
          label="Numele Evenimentului"
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
        <DateIntervalField
          label="Va avea loc"
          values={{
            left: new Date(formik.values.startDateTime),
            right: new Date(formik.values.endDateTime),
          }}
          onChanges={({ left, right }) => {
            formik.handleChange("startDateTime")(
              left ? moment(left).format("YYYY-MM-DD") : ""
            );
            formik.handleChange("endDateTime")(
              right ? moment(right).format("YYYY-MM-DD") : ""
            );
          }}
          containerStyle={styles.fieldGroup}
        />

        <TextField
          label="Numar de invitati"
          placeholder="Ex: 200"
          onChangeText={formik.handleChange("guests")}
          value={formik.values.guests}
          containerStyle={styles.fieldGroup}
          keyboardType={"numeric"}
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
          items={eventCategoryOptions}
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

export default EditEventScreen;
