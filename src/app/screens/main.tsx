import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Logo from "../../../assets/icon.webp";

export default function Main({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={Logo} style={styles.logoBg} />

      <View style={styles.header}>
        <Text style={styles.title}>PokéHub</Text>
        <Text style={styles.subtitle}>Explore the Pokémon World</Text>
        <Text style={styles.stats}>1025 Pokémon • 367 Abilities • 937 Moves</Text>
      </View>

      <View style={styles.optionsContainer}>
        <Pressable
          onPress={() => navigation.navigate("Pokedex")}
          style={({ pressed }) => [
            styles.optionCard,
            styles.redCard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.icon}>◓</Text>
          <Text style={styles.optionsText}>Pokemons</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Abilities")}
          style={({ pressed }) => [
            styles.optionCard,
            styles.blueCard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.icon}>✦</Text>
          <Text style={styles.optionsText}>Abilities</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Moves")}
          style={({ pressed }) => [
            styles.optionCard,
            styles.greenCard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.icon}>⚔</Text>
          <Text style={styles.optionsText}>Moves</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Natures")}
          style={({ pressed }) => [
            styles.optionCard,
            styles.yellowCard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.icon}>☘</Text>
          <Text style={styles.optionsText}>Natures</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Choose a category to start</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 28,
  },

  logoBg: {
    position: "absolute",
    width: 360,
    height: 360,
    alignSelf: "center",
    top: "65%",
    opacity: 0.18,
  },

  header: {
    marginTop: "22%",
    alignItems: "center",
  },

  title: {
    fontFamily: "PokemonFont",
    fontSize: 34,
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 8,
    fontFamily: "Fredoka",
    fontSize: 22,
    color: "#111827",
  },

  stats: {
    marginTop: 10,
    fontFamily: "PokemonFontLight",
    fontSize: 13,
    color: "#6B7280",
  },

  optionsContainer: {
    marginTop: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  optionCard: {
    width: "47%",
    height: 130,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",

    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },

  pressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.85,
  },

  redCard: {
    backgroundColor: "#FF3B3B",
  },

  blueCard: {
    backgroundColor: "#65C7F7",
  },

  greenCard: {
    backgroundColor: "#5EF59A",
  },

  yellowCard: {
    backgroundColor: "#EFFF5E",
  },

  icon: {
    fontSize: 28,
    marginBottom: 10,
    color: "#111827",
  },

  optionsText: {
    fontFamily: "PokemonFont",
    color: "#111827",
    fontSize: 18,
  },

  footer: {
    marginTop: 20,
    alignItems: "center",
  },

  footerText: {
    fontFamily: "PokemonFontLight",
    fontSize: 14,
    color: "#6B7280",
  },
});