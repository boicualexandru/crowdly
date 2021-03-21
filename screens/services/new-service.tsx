import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/root-stack";

import Button from "@components/button/button";
import TextField from "@components/form/text-field";

type NewServiceScreenNavigationProp = RootStackNavigationPropChild<"NewService">;
type NewServiceScreenRouteProp = RootStackRoutePropChild<"NewService">;

type Props = {
  route: NewServiceScreenRouteProp;
};

const NewServiceScreen = ({ route }: Props) => {
  const [value, onChangeText] = React.useState("");
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
          label="Descriere"
          placeholder="Ex: Salut, ..."
          multiline
          numberOfLines={4}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          containerStyle={styles.textField}
        />
        <View
          style={{
            marginHorizontal: -8,
            marginVertical: 8,
            flexDirection: "row",
          }}
        >
          <Button
            label="Incarca Imagini"
            leftIcon="images"
            style={{ flex: 1, margin: 8 }}
          />
          <Button
            label="Fotografiaza"
            leftIcon="camera"
            style={{ flex: 1, margin: 8 }}
          />
        </View>
      </View>
      <View>
        <Button label="Salveaza" style={{ marginVertical: 16 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textField: {
    marginTop: 16,
  },
});

export default NewServiceScreen;
