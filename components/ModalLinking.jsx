import React from "react";
import { Modal, View, Text, Button, Linking } from "react-native";
import { useState } from "react";

const ModalLinking = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLink = () => {
    Linking.openURL(Url);
  };

  const renderModal = () => (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "white",
            borderRadius: 20,
            width: 300,
            height: 300,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 18, paddingBottom: 20 }}
          >
            Si aceptas, vamos a abrir una pestaña en tu navegador, estas seguro?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View style={{ marginRight: 10 }}>
              <Button title="Abrir imágen" onPress={handleLink} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Button title="Cerrar modal" onPress={setModalVisible} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return <View>{renderModal()}</View>;

  //const styles = StyleSheet.create({});
};

export default ModalLinking;
