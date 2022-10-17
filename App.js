import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  YellowBox,
} from "react-native";
import pokemonList from "./pokemonList";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState("");

  useEffect(() => {
    if (searchPokemons) {
      setPokemons(
        pokemonList.filter((poke) =>
          poke.name.includes(searchPokemons.toLowerCase())
        )
      );
    } else {
      setPokemons(pokemonList);
    }
  }, [searchPokemons]);

  const toCapLetter = function (nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  };

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View>
          <Image
            style={styles.img}
            source={require("./sources/pokeapi_256.png")}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setSearchPokemons(newText)}
          value={searchPokemons}
          placeholder="Ingrese el nombre del pokemon"
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    marginTop: 50,
    height: "100%",
  },
  input: {
    width: "90%",
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
