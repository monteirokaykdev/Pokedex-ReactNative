import pokeApi from "../../services/pokeAPI";
import React, { useEffect, useState } from "react";
import {FlatList, View, Text, StyleSheet, TextInput, SafeAreaView,} from "react-native";
import AbilitySkeleton from "../../animations/AbilitiesCardSkeleton";

type NatureItem = {
  id: number;
  name: string;
  increasedStat: string;
  decreasedStat: string;
  likesFlavor: string;
  hatesFlavor: string;
};

export default function Natures({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [natures, setNatures] = useState<NatureItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function listarNatures() {
    try {
      setLoading(true);

      const resp = await pokeApi.get("/nature?limit=25");

      const naturesComDetalhes = await Promise.all(
        resp.data.results.map(async (nature: any) => {
          const req = await pokeApi.get(`/nature/${nature.name}`);

          return {
            id: req.data.id,
            name: req.data.name,
            increasedStat: req.data.increased_stat?.name || "None",
            decreasedStat: req.data.decreased_stat?.name || "None",
          };
        })
      );

      setNatures(naturesComDetalhes);
    } catch (error) {
      console.error("Erro ao buscar Natures", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    listarNatures();
  }, []);

  const naturesFiltradas = natures.filter((nature) =>
    nature.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function formatName(name: string) {
    return name.replace("-", " ");
  }

  function renderBadge(text: string) {
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.SearchBar}>
        <TextInput
          placeholder='Example : "Adamant"'
          clearButtonMode="always"
          autoCapitalize="words"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.SearchBarBox}
        />
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
          data={naturesFiltradas}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{formatName(item.name)}</Text>

              <View style={styles.badgeRow}>
                {renderBadge(`+ ${formatName(item.increasedStat)}`)}
                {renderBadge(`- ${formatName(item.decreasedStat)}`)}
              </View>
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

  SearchBar: {
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },

  SearchBarBox: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 6,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 7,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },

  name: {
    fontFamily: "PokemonFont",
    fontSize: 18,
    color: "#111827",
    textTransform: "capitalize",
    marginBottom: 12,
  },

  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },

  badge: {
    minWidth: 115,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    fontFamily: "PokemonFontLight",
    fontSize: 13,
    color: "#111827",
    textTransform: "capitalize",
  },
});