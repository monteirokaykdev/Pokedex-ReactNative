import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import pokeApi from '../../services/pokeAPI';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { createAudioPlayer} from 'expo-audio';



type PokemonItem = {
    id: number;
    name: string;
    url: string;
    types:string[];
    abilities:string[];
    species:string;
    height:number;
    weight:number;
    gender:number;
    baseStats:number[];
    evoChain:string[];
    moves: string[];
};

export default function Pokemon({navigation}:any) {
    const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery,setSearchQuery] = useState("");
    const [gen, setGen] = useState(1);
    const [menuAberto, setMenuAberto] = useState(false);
    const [fontsLoaded] = useFonts({
    PokemonFont: require('../../../assets/Poppins-Bold.ttf'),
    Fredoka: require('../../../assets/Fredoka-Medium.ttf'),
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    function getEvolutionNames(chain: any): string[] {
        let evolutions = [chain.species.name];

        chain.evolves_to.forEach((evo: any) => {
            evolutions.push(...getEvolutionNames(evo));
        });

        return evolutions;
    }


    async function buscarPokemon() {
        try {
            setLoading(true);
            setPokemons([]);

            const resp = await pokeApi.get(`/generation/${gen}`);

            const respTipos = await Promise.all(
                resp.data.pokemon_species.map(async (pokemon: PokemonItem) => {
                    const id = getPokemonId(pokemon.url);

                    const req = await pokeApi.get(`/pokemon/${id}`);

                    const types = req.data.types.map(
                        (item: any) => item.type.name
                    );

                    const abilities = req.data.abilities.map(
                        (item: any) => item.ability.name
                    )

                    const baseStats = req.data.stats.map(
                        (item : any) => item.base_stat
                    )

                    const moves = req.data.moves.map(
                        (item : any) => item.move.name
                    )

                    const species = req.data.species.name

                    const height = req.data.height

                    const weight = req.data.weight
                    
                    const reqSpecies = await pokeApi.get(`/pokemon-species/${id}`);

                    const gender = reqSpecies.data.gender_rate;

                    const evolutionUrl = reqSpecies.data.evolution_chain.url;

                    const reqEvo = await pokeApi.get(
                    evolutionUrl.replace("https://pokeapi.co/api/v2", "")
                    );

                    const evolutions = getEvolutionNames(
                        reqEvo.data.chain
                    );


                    return {
                        ...pokemon,
                        id,
                        types,
                        species,
                        abilities,
                        height,
                        weight,
                        gender,
                        baseStats,
                        evoChain: evolutions,
                        moves,
                    };
                })
            );

            const ordenados = respTipos.sort((a, b) => a.id - b.id);

            setPokemons(ordenados);

        } catch (error) {
            console.error("Erro ao buscar Pokémons", error);
        } finally {
            setLoading(false);
        }
    }

    function capitalize(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }

    useEffect(() => {
        buscarPokemon();
    }, [gen]);

    const pokemonsFiltrados = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    if (!fontsLoaded) {
        return <Text>Carregando fonte...</Text>;
    }

    function getPokemonId(url: string) {
        return url.split('/')[6];
    }

    function proximaGeracao() {
        setGen((prev) => (prev >= 9 ? 1 : prev + 1));
    }

    function ultimaGeracao() {
        setGen((prev) => (prev <= 1 ? 9 : prev - 1));
    }


    async function tocarCry(id: string) {
        const player = createAudioPlayer({
        uri: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
    });

        player.play();
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.SearchBar}>

                <TextInput 
                placeholder='Search'
                clearButtonMode='always' 
                autoCapitalize='words' 
                value={searchQuery} 
                onChangeText={(query) => handleSearch(query)} style={styles.SearchBarBox}></TextInput>
            </SafeAreaView>


            {loading ? (
                <Text>Carregando Pokémons...</Text>
            ) : (
                <FlatList
                    data={pokemonsFiltrados}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => {
                        const id = getPokemonId(item.url);

                        return (
                            <Pressable 
                            onPress={() => navigation.navigate("PokemonDetalhes", {
                                pokemonId : id,
                                pokemonName : item.name,
                                pokemonType : item.types,
                                pokemonSpecies : item.species,
                                pokemonAbilities : item.abilities,
                                pokemonHeight : item.height,
                                pokemonWeight : item.weight,
                                pokemonGender : item.gender,
                                pokemonBaseStats : item.baseStats,
                                pokemonEvoChain : item.evoChain,
                                pokemonMoves : item.moves,
                            })} 
                             style={({pressed}) => [styles.card, {
                                backgroundColor : typeColors[item.types[0]],
                                transform: [{scale: pressed ? 0.95 : 1}],
                            },
                            ]}
                            >
                                
                                <Text numberOfLines={1} style={styles.pokemonName}>
                                    {capitalize(item.name)}
                                </Text>


                                <View style={styles.info}>

                                    <View style={styles.typeContainer}>
                                        {item.types.map((type) => (
                                            <View key={type} style={[styles.typeCard, {
                                                backgroundColor : typeColorsStrong[type],
                                            },
                                            ]}>
                                                <Text>
                                                    {capitalize(type)}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>

                                

                                <Pressable style={styles.imageBox} onPress={() => tocarCry(id)}>
                                        <View style={styles.semiCircle}></View>
                                        <View style={styles.pokeballContainer}>


                                            <Image
                                                source={require('../../../assets/pokeball-removebg-preview.png')}
                                                style={styles.pokeballBg}
                                            />

                                            <Image
                                                resizeMode = "contain" 
                                                source={{
                                                    uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
                                                }}
                                                style={styles.image}
                                        />
                                        </View>

                                </Pressable>
                                </View>
                            </Pressable>
                        );
                    }}
                />
            )}
            <View style={styles.pagination}>
                <Pressable
                style={styles.genButton}
                onPress={ultimaGeracao}
                >
                    <Text style = {styles.genButtonText} >◀ Anterior</Text>
                </Pressable>

                <Text style={styles.genText}>
                    Gen {gen}
                </Text>

                <Pressable
                style={styles.genButton}
                onPress={proximaGeracao}
                >
                    <Text style = {styles.genButtonText} >Próxima ▶</Text>
                </Pressable>
            </View>
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


const typeColorsStrong: Record<string, string> = {
  normal: "#B8B89A",
  fire: "#f1934f",
  water: "#88A8F0",
  electric: "#EFD266",
  grass: "#60e68d",
  ice: "#A8DADA",
  fighting: "#C96C67",
  poison: "#A95BA9",
  ground: "#D9C487",
  flying: "#B7A7ED",
  psychic: "#E888A8",
  bug: "#B7C55D",
  rock: "#C2B06D",
  ghost: "#8F80B0",
  dragon: "#8D6AE8",
  dark: "#8C8075",
  steel: "#BFC0D4",
  fairy: "#EAB0BD",
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F7FA",
  },

  SearchBarBox: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    fontSize: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  SearchBar: {
    marginHorizontal: 5,
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    height : 120,
    padding: 12,
    borderRadius: 15,
    shadowOpacity:0.12,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
    marginBottom: 12,
    overflow: "hidden",
  },

  pokemonName: {
    width:"42%",
    fontFamily: 'Fredoka',
    fontSize: 22,
    marginBottom: 6,
    color: '#1F2937',
  },

  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  typeContainer: {
    height: "100%",
    justifyContent: "center",
    gap: 3,
    alignItems: "flex-start",
  },

  typeCard: {
    minWidth: 80,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  imageBox: {
    width: "28%",
    height: 100,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 80,
    zIndex : 1,
  },

  pokeballContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  pokeballBg: {
    position: "absolute",
    width: 150,
    height: 130,
    opacity: 0.6,
    right: -25,
    top: -17,
    zIndex: 0,
  },
  semiCircle:{
    position: "absolute",
    width: 150,
    height: 150,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderTopLeftRadius: 70,
    borderBottomLeftRadius: 70,
  },
pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
},
genButton: {
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 14,

  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 3,
  },

  elevation: 4,
},
  genButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },

genText: {
    fontSize: 14,
    fontWeight: "bold",
  },

});