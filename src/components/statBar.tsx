import { View, Text, StyleSheet } from "react-native";

type StatBar = {
    label: string;
    value: number;
};

export default function StatBarFunction({label, value} : StatBar){
    function getColor() {
        if (value < 50) return "#ef4444";
        if (value < 90) return "#facc15";
    return "#22c55e";
  }

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>    

        <View style={styles.barBackground}>
            <View style={[styles.barFill,{
                width : `${(value / 255) * 100}%`,
                backgroundColor: getColor()
            }]}>

            </View>
        </View>    
    </View>

  )
} 

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,

  },

  label: {
    width: 120,
    color: "#777",
    fontSize: 16,
  },

  value: {
    width: 50,
    fontWeight: "bold",
  },

  barBackground: {
    width: "75%",
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
  },

  barFill: {
    height: "100%",
    borderRadius: 999,
  },
});
