import { View, Text, Pressable, Image, FlatList , Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import {useNavigation} from '@react-navigation/native'
import React, { useState } from "react";
import StatBarFunction from "../../components/statBar";
import shinyIcon from "../../../assets/shiny.png";

//Type Icons
import Normal from "../../../assets/icons/normal.svg";
import Fire from "../../../assets/icons/fire.svg";
import Water from "../../../assets/icons/water.svg";
import Electric from "../../../assets/icons/electric.svg";
import Grass from "../../../assets/icons/grass.svg";
import Ice from "../../../assets/icons/ice.svg";
import Fighting from "../../../assets/icons/fighting.svg";
import Poison from "../../../assets/icons/poison.svg";
import Ground from "../../../assets/icons/ground.svg";
import Flying from "../../../assets/icons/flying.svg";
import Psychic from "../../../assets/icons/psychic.svg";
import Bug from "../../../assets/icons/bug.svg";
import Rock from "../../../assets/icons/rock.svg";
import Ghost from "../../../assets/icons/ghost.svg";
import Dragon from "../../../assets/icons/dragon.svg";
import Dark from "../../../assets/icons/dark.svg";
import Steel from "../../../assets/icons/steel.svg";
import Fairy from "../../../assets/icons/fairy.svg";

const { width, height } = Dimensions.get("window");



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
    const [isShiny, setShiny] = useState(false);

    const navigation = useNavigation();

    function capitalize(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }

    return(
        <View style={styles.container}>
            <View style={[styles.upperHalf, {
                backgroundColor : typeColors[pokemonType[0]],
            }]}>

                <View style={styles.headerInfo}>

                 <View>
                    <Text style={styles.pokemonName}>
                        {capitalize(pokemonName)}
                    </Text>

                    <View style={styles.typeContainer}>
                            {pokemonType.map((type: string) => {
                            const Icon = typeIcons[type];
                            return (
                                <View
                                key={type}
                                style={[
                                    styles.typeCard,
                                    {
                                    backgroundColor: typeColorsStrong[type],
                                    },
                                ]}
                                >
                                {Icon && (
                                    <Icon
                                    width={14}
                                    height={14}
                                    style={{ marginTop: -2 }}
                                    />
                                )}

                                <Text style={styles.typeText}>
                                    {capitalize(type)}
                                </Text>
                                </View>
                            );
                        })}
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
                        uri: isShiny
                        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png` 
                        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

                    }} style={styles.image} />
                    
            </View>


            <View style={styles.bottomHalf}>
                <View>
                    <Pressable
                    style={styles.shinyCheckContainer}
                    onPress={() => setShiny(prev => !prev)}
                    >
                    <Image style = {styles.shinyIcon}
                    resizeMode ="contain"
                    source= {shinyIcon}
                    />
                    </Pressable>
                </View>
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

const typeIcons: Record<string, React.FC<any>> = {
  normal: Normal,
  fire: Fire,
  water: Water,
  electric: Electric,
  grass: Grass,
  ice: Ice,
  fighting: Fighting,
  poison: Poison,
  ground: Ground,
  flying: Flying,
  psychic: Psychic,
  bug: Bug,
  rock: Rock,
  ghost: Ghost,
  dragon: Dragon,
  dark: Dark,
  steel: Steel,
  fairy: Fairy,
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
    backgroundColor: "#f8f8f8",
  },

  upperHalf: {
    flex: 0.8,
    padding: width * 0.025,
  },

  bottomHalf: {
    flex: 1.2,
    backgroundColor: "#ffffff",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.035,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -30,
  },

  backButton: {
    width: width * 0.14,
    height: width * 0.14,
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },

  backText: {
    fontFamily: "PokemonFont",
    fontSize: width * 0.1,
    color: "#1F2937",
    fontWeight: "bold",
  },

  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  pokemonName: {
    fontFamily: "Fredoka",
    fontSize: width * 0.085,
    marginBottom: 6,
    color: "#ffffff",
    marginTop: 10,
  },

  pokemonId: {
    fontFamily: "Fredoka",
    fontSize: width * 0.07,
    color: "#ffffff",
    marginTop: height * 0.02,
  },

  typeContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
    flexWrap: "wrap",
  },

  typeCard: {
    minWidth: width * 0.2,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.005,
    flexDirection: 'row',
    gap: 6,
  },

  typeText: {
    fontFamily: "PokemonFontLight",
    fontSize: width * 0.040,
    color: "#FFF",
  },

  image: {
    width: width * 0.45,
    height: height * 0.22,
    alignSelf: "center",
    marginTop: height * 0.025,
    zIndex: 1,
  },

  shinyCheckContainer: {
    position: "absolute",
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    top: -(width * 0.17) / 1.2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 10,
  },

  shinyIcon: {
    width: "80%",
    height: "80%",
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.02,
    paddingTop: height * 0.015,
  },

  tabText: {
    fontFamily: "PokemonFont",
    fontSize: width * 0.035,
    color: "#aaa",
    paddingTop: height * 0.012,
    paddingBottom: height * 0.018,
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
    gap: height * 0.012,
  },

  aboutTabRow: {
    flex: 1,
    flexDirection: "row",
    gap: width * 0.05,
  },

  label: {
    fontFamily: "PokemonFont",
    fontSize: width * 0.042,
    color: "#797575",
    width: width * 0.28,
  },

  value: {
    fontFamily: "PokemonFont",
    fontSize: width * 0.042,
    flex: 1,
  },

  StatBar: {
    flex: 1,
    paddingHorizontal: width * 0.01,
  },

  evoChain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.1,
    paddingHorizontal: width * 0.02,
  },

  evoCard: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.23,
  },

  evoImg: {
    width: width * 0.22,
    height: width * 0.22,
  },

  evoName: {
    marginTop: height * 0.01,
    fontFamily: "PokemonFont",
    fontSize: width * 0.03,
    color: "#333",
    textAlign: "center",
  },

  arrow: {
    fontSize: width * 0.06,
    color: "#999",
    marginHorizontal: width * 0.01,
  },

  movesList: {
    flex: 1,
  },

  moveCard: {
    backgroundColor: "#F3F4F6",
    padding: width * 0.03,
    borderRadius: 12,
    marginBottom: height * 0.01,
  },

  moveText: {
    color: "#1F2937",
    fontSize: width * 0.035,
    fontFamily: "PokemonFont",
  },
});