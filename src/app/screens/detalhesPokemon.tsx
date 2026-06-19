import { View, Text, Pressable, Image, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import {useNavigation} from '@react-navigation/native'
import React, { useState } from "react";
import StatBarFunction from "../../components/statBar";


export default function PokemonDetalhes({route} : any){
    const { pokemonId, 
            pokemonName, 
            pokemonType, 
            pokemonSpecies, 
            pokemonAbilities = [], 
            pokemonHeight, 
            pokemonWeight, 
            pokemonGender,
            pokemonBaseStats,
            pokemonEvoChain,
            pokemonMoves,   } = route.params;

    const femalePercentage = (pokemonGender / 8) * 100
    const malePercentage = 100 - femalePercentage

    const [abaAtiva, setAbaAtiva] = useState("About");

    const navigation = useNavigation();

    function capitalize(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }

    return(
        <View style={styles.container}>
            <View style={[styles.upperHalf, {
                backgroundColor : typeColors[pokemonType[0]],
            }]}>


                <Pressable 
                style ={styles.backButton} 
                onPress ={() => navigation.goBack()}
                >
    
                <Text style={styles.backText}>←</Text>

                </Pressable>

                <View style={styles.headerInfo}>

                 <View>
                    <Text style={styles.pokemonName}>
                        {capitalize(pokemonName)}
                    </Text>

                    <View style={styles.typeContainer}>
                        {pokemonType.map((type : string) => (
                            <View 
                            key ={type}
                            style={[styles.typeCard,{
                                backgroundColor: typeColorsStrong[type] || "#fff",
                            }]}
                            >
                                <Text style = {styles.typeText}>{capitalize(type)}</Text>
                            </View>

                        ))}
                    </View>
                    </View>



                  <View>
                    <Text style={styles.pokemonId}>
                        #{pokemonId.padStart(3, "0")}
                    </Text>
                 </View>
                </View>
                    <Image
                    resizeMode = "contain" 
                    source={{
                        uri : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`
                    }} style={styles.image} />
                    
            </View>


            <View style={styles.bottomHalf}>
                <View style={styles.tabs}>
                    {["About", "Base Stats", "Evolution", "Moves"].map((tab) => (
                        <Pressable key ={tab} onPress={() => setAbaAtiva(tab)}>
                            <Text style ={[
                                styles.tabText,
                                abaAtiva === tab && styles.tabTextActive
                            ]}>
                                {tab}
                            </Text>
                        </Pressable>
                    ))}
                </View>
                {abaAtiva === "About" && (
                    <View style ={styles.aboutTab}>

                    <View style = {styles.aboutTabRow}>
                        <Text style ={styles.label}>Species </Text>
                        <Text style ={styles.value} >{capitalize(pokemonSpecies)} </Text>
                    </View>

                    <View style = {styles.aboutTabRow}>
                        <Text style ={styles.label}>Height </Text>
                        <Text style ={styles.value}>{(pokemonHeight / 10).toFixed(1)} m</Text>
                    </View>

                    <View style = {styles.aboutTabRow}>
                        <Text style ={styles.label}>Weight</Text>
                        <Text style ={styles.value} >{(pokemonWeight / 10).toFixed(1)} kg</Text>
                    </View>

                    <View style = {styles.aboutTabRow}>
                        <Text style ={styles.label}>Abilities</Text>
                        <Text style ={styles.value}>{pokemonAbilities.map(capitalize).join(", ")}</Text>
                    </View>

                    <View style = {styles.aboutTabRow}>
                        <Text style ={styles.label}>Gender</Text>
                        <Text style ={styles.value}>{pokemonGender === -1 ?
                        
                        <Text> Genderless </Text> 
                                :
                        <Text>♂ {malePercentage}% ♀ {femalePercentage}%</Text>
                        
                        
                    }</Text>

                    </View>
                    </View>

                )}


                {abaAtiva === "Base Stats" && (
                    <View style ={styles.StatBar}>
                        <StatBarFunction
                            label="Hp"
                            value={pokemonBaseStats[0]}
                        />
                        <StatBarFunction
                            label="Attack"
                            value={pokemonBaseStats[1]}
                        />
                        <StatBarFunction
                            label="Defense"
                            value={pokemonBaseStats[2]}
                        />
                        <StatBarFunction
                            label="Special Attack"
                            value={pokemonBaseStats[3]}
                        />
                        <StatBarFunction
                            label="Special Defense"
                            value={pokemonBaseStats[4]}
                        />
                        <StatBarFunction
                            label="Speed"
                            value={pokemonBaseStats[5]}
                        />
                    </View>
                )}






                    {abaAtiva === "Evolution" && (
                    <View style={styles.evoChain}>
                        {pokemonEvoChain.map((evo: string, index: number) => (
                        <React.Fragment key={evo}>
                            <View style={styles.evoCard}>
                            <Image
                                style={styles.evoImg}
                                resizeMode="contain"
                                source={{
                                uri: `https://img.pokemondb.net/sprites/home/normal/${evo}.png`,
                                }}
                            />

                            <Text style={styles.evoName}>
                                {capitalize(evo)}
                            </Text>
                            </View>

                            {index < pokemonEvoChain.length - 1 && (
                            <Text style={styles.arrow}>→</Text>
                            )}
                        </React.Fragment>
                        ))}
                    </View>
                )}
                  {abaAtiva === "Moves" && (
                      <FlatList
                          data={pokemonMoves}
                          keyExtractor={(item, index) => `${item}-${index}`}
                          renderItem={({ item }) => (
                              <View style={styles.moveCard}>
                                  <Text style={styles.moveText}>
                                      {capitalize(item.replace("-", " "))}
                                  </Text>
                              </View>
                          )}
                      />
                  )}
            </View>
        </View>
    );
};

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
    backgroundColor: '#f8f8f8',
    flexDirection: "column"
  },
  upperHalf:{
    flex: 0.9,
    backgroundColor: '#7cf164',
    padding: 20,
  },
  bottomHalf:{
    flex: 1.2,
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -30,
  },
  backButton: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },

  backText: {
    fontSize: 40,
    color: '#1F2937',
    fontWeight: "bold",
  },
  image: {
    width: "55%",
    height: "55%",
    alignSelf: "center",
    marginTop: 60,
    zIndex: 1,
  },
  typeCard: {
    minWidth: 80,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },

  typeText:{
    fontFamily: 'Fredoka',
  },

  typeContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },

  pokemonName: {
    fontFamily: 'Fredoka',
    fontSize: 35,
    marginBottom: 6,
    color: '#1F2937',
  },
  
  pokemonId: {
    fontSize: 30,
    color: "#1F2937",
    marginTop: 18,
    fontFamily: 'Fredoka',
  },

  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    padding: 20,
  },

  tabText: {
    fontSize: 15,
    color: "#aaa",
    paddingBottom: 8,
  },

  tabTextActive: {
    color: "#111",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#3155ff",
  },
  aboutTab: {
    width: "100%",
    height: "80%",
    gap:12,
  },

  aboutTabRow:{
    flex: 1,
    flexDirection:'row',
    gap: 20,
  },

  label:{
    fontFamily: 'PokemonFont',
    fontSize: 18,
    color: "#797575",
    width : 100,
  },
   value :{
    fontFamily: 'PokemonFont',
    fontSize: 18,
  },
  StatBar: {
    flex : 1,
    paddingHorizontal: 5,
  },
evoChain: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 100,
  paddingHorizontal: 10,
},

evoCard: {
  alignItems: "center",
  justifyContent: "center",
  width: 95,
},

evoImg: {
  width: 90,
  height: 90,
},

evoName: {
  marginTop: 8,
  fontFamily: "PokemonFont",
  fontSize: 12,
  color: "#333",
  textAlign: "center",
},

arrow: {
  fontSize: 24,
  color: "#999",
  marginHorizontal: 4,
},
movesList: {
    flex: 1,
},

moveCard: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
},

moveText: {
    color: "#1F2937",
    fontSize: 14,
    fontFamily: "PokemonFont",
},
});