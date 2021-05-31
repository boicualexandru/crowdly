import Button from '@components/button/button'
import TextField from '@components/form/text-field'
import BigModal from '@components/modal/big-modal'
import { ThemeTypography, ThemeTypographyColorStyles } from '@theme/theme-typography'
import { CreateSchedulePeriodModel } from 'api/schedulePeriods'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

interface Props {
  isOpen: boolean;
  requestCreate: (period: CreateSchedulePeriodModel) => void;
  requestClose: () => void;
}

const schedulePeriodInitialState: CreateSchedulePeriodModel = {
  description: '',
  startDate: new Date(),
  endDate: new Date(),
};

const AddSchedulePeriodModal = (props: Props) => {
  const [period, setPeriod] = useState<CreateSchedulePeriodModel>(schedulePeriodInitialState)
  
  useEffect(() => {
    if (props.isOpen) {
      setPeriod(schedulePeriodInitialState);
    }
  }, [props.isOpen]);

  return (
    <BigModal isOpen={props.isOpen} requestClose={props.requestClose}>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Adauga o rezervare</Text>
        <TextField
          label="Descriere"
          onChangeText={value => setPeriod(p => ({...p, description: value}))}
          value={period.description}
          containerStyle={styles.fieldGroup}
        />
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Button
            outlined
            label="Inchide"
            style={{ flex: 1, marginRight: 16 }}
            onPress={props.requestClose}
          />
          <Button
            label="Adauga"
            style={{ flex: 1 }}
            onPress={() => props.requestCreate(period)}
          />
        </View>
      </View>
    </BigModal>
  )
}

export default AddSchedulePeriodModal

const styles = StyleSheet.create({
  title: {
    ...ThemeTypography.h6,
    ...ThemeTypographyColorStyles.text_dark_87,
    marginBottom: 16,
    fontWeight: 'bold'
  },
  fieldGroup: {
    marginTop: 16,
  },
})
