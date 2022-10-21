import React, { useState, useEffect } from "react";
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
} from "react-native";
import pokemonList from "./pokemonList";

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState("");
  const [pokemonBuscado, setPokemonBuscado] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <SafeAreaView style={styles.main}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <View></View>
      )}
      <View style={{ alignItems: "center" }}>
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
      <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flex: 3, paddingBottom: 20 }}>
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
              onPress={handleSearchChange}
              disabled={isEnabled}
            />
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.container}>
          {pokemons.length ? (
            pokemons.map((poke, index) => (
              <View key={index} style={styles.containerPoke}>
                <Image
                  style={styles.pokeImg}
                  source={{ uri: poke.url }}
                ></Image>
                <Text style={styles.pokeText}>{toCapLetter(poke.name)}</Text>
              </View>
            ))
          ) : (
            <View style={styles.containerNotFind}>
              <Text style={styles}>
                No se pudo encontrar ningun Pokemon con el nombre:
              </Text>
              <Text style={styles.pokeText}>{pokemonBuscado}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    backgroundColor: "#F6F6F6",
    height: "100%",
    paddingTop: 40,
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
  loading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    zIndex: 100,
  },
  container: {
    width: "90%",
  },
  containerNotFind: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  pokeText: {
    fontSize: 20,
    fontStyle: "bold",
  },
  containerPoke: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: "grey",
    paddingBottom: 10,
    paddingTop: 10,
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
});

export default App;
