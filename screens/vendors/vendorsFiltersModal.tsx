import React from "react";
import { Text } from "react-native";

import BigModal from "@components/modal/big-modal";

interface Props {
  isOpen: boolean;
  requestClose: () => void;
}

const VendorsFiltersModal = ({ isOpen, requestClose }: Props) => {
  return (
    <BigModal isOpen={isOpen} requestClose={requestClose}>
      <Text>test</Text>
    </BigModal>
  );
};

export default VendorsFiltersModal;
