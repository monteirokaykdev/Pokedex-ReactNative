import pokeApi from "../../services/pokeAPI";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import AbilitySkeleton from "../../animations/AbilitiesCardSkeleton";

type MoveItem = {
  id: number;
  name: string;
  description: string;
  type: string;
  damageClass: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
};

export default function Moves({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [moves, setMoves] = useState<MoveItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function listarMoves() {
    try {
      setLoading(true);

      const resp = await pokeApi.get("/move?limit=937");

      const movesComDescricao = await Promise.all(
        resp.data.results.map(async (move: any) => {
          const req = await pokeApi.get(`/move/${move.name}`);

          const effectEntry = req.data.effect_entries.find(
            (entry: any) => entry.language.name === "en"
          );

          return {
            id: req.data.id,
            name: req.data.name,
            type: req.data.type.name,
            damageClass: req.data.damage_class.name,
            power: req.data.power,
            accuracy: req.data.accuracy,
            pp: req.data.pp,
            description:
              effectEntry?.short_effect ||
              effectEntry?.effect ||
              "No description",
          };
        })
      );

      setMoves(movesComDescricao);
    } catch (error) {
      console.error("Erro ao buscar Moves", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    listarMoves();
  }, []);

  const movesFiltrados = moves.filter((move) =>
    move.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder='Example : "Thunderbolt"'
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
          data={movesFiltrados}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: typeColors[item.type] || "#FFFFFF",
                },
              ]}
            >
              <Text style={styles.name}>{formatName(item.name)}</Text>

              <View style={styles.badgeRow}>
                {renderBadge(item.type)}
                {renderBadge(item.damageClass)}
              </View>

              <View style={styles.badgeRow}>
                {renderBadge(`Power: ${item.power ?? "-"}`)}
                {renderBadge(`Acc: ${item.accuracy ?? "-"}`)}
                {renderBadge(`PP: ${item.pp}`)}
              </View>

              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const typeColors: Record<string, string> = {
  normal: "#C6C6A7",
  fire: "#d64d4d",
  water: "#507de7",
  electric: "#f3cd37",
  grass: "#22b665",
  ice: "#BCE6E6",
  fighting: "#eb2217",
  poison: "#C183C1",
  ground: "#EBD69D",
  flying: "#C6B7F5",
  psychic: "#FA92B2",
  bug: "#c2d151",
  rock: "#bea534",
  ghost: "#A292BC",
  dragon: "#A27DFA",
  dark: "#A29288",
  steel: "#D1D1E0",
  fairy: "#F4BDC9",
};

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
    minWidth: 90,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.88)",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    fontFamily: "PokemonFontLight",
    fontSize: 13,
    color: "#111827",
    textTransform: "capitalize",
  },

  description: {
    fontFamily: "PokemonFontLight",
    fontSize: 14,
    lineHeight: 20,
    color: "#1F2937",
    marginTop: 4,
  },
});