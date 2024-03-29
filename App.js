import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  Switch,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Modal,
  Linking,
  StatusBar,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  useWindowDimensions,
  Vibration,
} from "react-native";
import { WebView } from "react-native-webview";
import pokemonList from "./pokemonList";

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState("");
  const [pokemonBuscado, setPokemonBuscado] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalTouchVisible, setModalTouchVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Url, setUrl] = useState("");
  const window = useWindowDimensions().height;

  useEffect(() => {
    setPokemons(pokemonList);
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleSearchChange = () => {
    setPokemonBuscado(searchPokemons);
    setLoading(true);
    if (searchPokemons === "") {
      setTimeout(() => {
        setPokemons(pokemonList);
        setLoading(false);
      }, 800);
    } else {
      setTimeout(() => {
        const filter = pokemonList.filter((p) =>
          p.name.toLowerCase().includes(searchPokemons.toLowerCase())
        );
        setPokemons(filter);
        setLoading(false);
      }, 800);
    }
  };

  const handleText = (text) => {
    setSearchPokemons(text);
  };

  const toCapLetter = function (nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.containerPoke}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              animate(Easing.bounce);
              setUrl(item.url);
              setModalTouchVisible((previousState) => !previousState);
            }}
          >
            <Animated.Image source={Url} />
            <Image source={{ uri: item.url }} style={styles.pokeImg} />
          </TouchableOpacity>
          <Text style={styles.pokeText}> {toCapLetter(item.name)}</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity />
          <Button
            title="Ver imagen"
            onPress={() => {
              setModalVisible((previousState) => !previousState);
              setUrl(item.url);
            }}
          />
        </View>
      </View>
    );
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
        <View style={[styles.boxShadow, styles.modalLinking]}>
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

  const handleLink = () => {
    Linking.openURL(Url);
  };

  const opacity = React.useRef(new Animated.Value(0)).current;

  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 420],
  });

  const animatedStyles = [
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  const handleVibration = () => {
    Vibration.vibrate();
  };

  return (
    <SafeAreaView style={styles.main}>
      {renderModal()}

      <Modal transparent={true} visible={modalTouchVisible}>
        <View style={styles.centeredFullScreen}>
          <Animated.View style={animatedStyles}>
            <View style={[styles.boxShadow, styles.modalImagen]}>
              <WebView source={{ uri: Url }} />
              <Button title="Cerrar" onPress={setModalTouchVisible} />
            </View>
          </Animated.View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, styles.mainCont]}
      >
        <View style={{ alignItems: "center" }}>
          <StatusBar backgroundColor="red" />
          <Image
            style={styles.img}
            source={require("./sources/pokeapi_256.png")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontStyle: "bold" }}>
            Deshabilitar búsqueda
          </Text>
          <View style={{ paddingBottom: 20 }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              style={{ paddingTop: 0, height: 30 }}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={styles.container}>
          {pokemons.length ? (
            <FlatList
              data={pokemons}
              style={{ height: "67%" }}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={searchPokemons}
                />
              }
            />
          ) : (
            <View style={styles.containerNotFind}>
              <Text style={styles}>
                No se pudo encontrar ningun Pokemon con el nombre:
              </Text>
              <Text style={styles.pokeText}>{pokemonBuscado}</Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <View style={{ flex: 3 }}>
            <TextInput
              style={styles.input}
              onChangeText={handleText}
              editable={!isEnabled}
              placeholder="Ingrese el nombre del pokemon"
            />
          </View>
          <View style={{ flex: 1 }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button
                title="Buscar"
                onPress={() => {
                  handleSearchChange(), handleVibration();
                }}
                disabled={isEnabled}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },
  mainCont: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    fontSize: 15,
  },
  container: {
    width: "100%",
  },
  containerNotFind: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  pokeText: {
    fontSize: 20,
    fontStyle: "bold",
    textAlign: "center",
  },
  containerPoke: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 15,
    marginLeft: 15,
    borderBottomWidth: 1,
  },
  img: {
    marginBottom: 30,
    alignItems: "center",
  },
  pokeImg: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#1243AD",
    backgroundColor: "#F9D855",
    marginRight: "3%",
  },
  centeredFullScreen: {
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    width: "100%",
  },
  boxShadow: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
  modalImagen: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    height: 337,
    width: 300,
    padding: 15,
  },
  modalLinking: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    width: 300,
    height: 300,
  },
});

export default App;
