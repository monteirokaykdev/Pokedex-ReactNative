import pokeApi from "../../services/pokeAPI";
import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, TextInput, SafeAreaView } from "react-native";
import AbilitySkeleton from "../../animations/AbilitiesCardSkeleton";

type AbilityItem = {
  id: number;
  name: string;
  description: string;
};

export default function Abilities({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [abilities, setAbilities] = useState<AbilityItem[]>([]);
  const [searchQuery,setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

  async function listarAbilities() {
    try {
      setLoading(true);

      const resp = await pokeApi.get("/ability?limit=367");

      const abilitiesComDescricao = await Promise.all(
        resp.data.results.map(async (ability: any) => {
          const req = await pokeApi.get(`/ability/${ability.name}`);

          const effectEntry = req.data.effect_entries.find(
            (entry: any) => entry.language.name === "en"
          );

          return {
            id: req.data.id,
            name: req.data.name,
            description:
              effectEntry?.short_effect ||
              effectEntry?.effect ||
              "No description",
          };
        })
      );

      setAbilities(abilitiesComDescricao);
    } catch (error) {
      console.error("Erro ao buscar Abilities", error);
    } finally {
      setLoading(false);
    }
  }

  const abilitiesFiltradas = abilities.filter((ability) =>
  ability.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  useEffect(() => {
    listarAbilities();
  }, []);

  return (
    <View style = {styles.container}>
        <SafeAreaView style={styles.SearchBar}>
                <TextInput 
                    placeholder='Example : "Speed Boost"'
                    clearButtonMode='always' 
                    autoCapitalize='words' 
                    value={searchQuery} 
                    onChangeText={(query) => handleSearch(query)} style={styles.SearchBarBox}>
                </TextInput>
        </SafeAreaView>

            {loading ? (
            <FlatList
                data={Array.from({ length: 8 })}
                keyExtractor={(_, index) => String(index)}
                renderItem={() => <AbilitySkeleton />}
                showsVerticalScrollIndicator={false}
            />
            ) : (
            <FlatList
                data={abilitiesFiltradas}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                )}
            />
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 12,
  },
  card: {
    padding: 16,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  name: {
    fontFamily:"PokemonFont",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  description: {
    fontFamily:"PokemonFont",
    marginTop: 8,
    fontSize: 14,
  },
  SearchBarBox: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    fontSize: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  SearchBar: {
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
  },
});