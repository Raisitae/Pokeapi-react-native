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
} from "react-native";
import pokemonList from "./pokemonList";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState("");

  useEffect(() => {
    setPokemons(pokemonList);
  }, []);

  const handleSearchChange = () => {
    if (searchPokemons === "") {
      setPokemons(pokemonList);
    } else {
      const filter = pokemonList.filter((p) =>
        p.name.toLowerCase().includes(searchPokemons.toLowerCase())
      );
      setPokemons(filter);
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
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View>
          <Image
            style={styles.img}
            source={require("./sources/pokeapi_256.png")}
          />
        </View>
        <View
          style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20 }}
        >
          <View style={{ flex: 3 }}>
            <TextInput
              style={styles.input}
              onChangeText={handleText}
              placeholder="Ingrese el nombre del pokemon"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Buscar" onPress={handleSearchChange} />
          </View>
        </View>
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
              <Text style={styles.pokeText}>{searchPokemons}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
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
