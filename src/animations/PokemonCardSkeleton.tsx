import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function PokemonCardSkeleton() {
  const shimmer = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.65)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 750,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(450),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 650,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.65,
          duration: 650,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();
    pulseAnimation.start();

    return () => {
      shimmerAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-160, 430],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.skeletonBase, { opacity: pulse }]}>
        <View style={styles.nameSkeleton} />

        <View style={styles.info}>
          <View style={styles.typeContainer}>
            <View style={styles.typeSkeleton} />
            <View style={styles.typeSkeletonSmall} />
          </View>

          <View style={styles.imageBox}>
            <View style={styles.semiCircle} />

            <View style={styles.pokeballContainer}>
              <View style={styles.pokeballSkeleton} />
              <View style={styles.imageSkeleton} />
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.shimmer,
          {
            transform: [
              { translateX },
              { rotate: "18deg" },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 120,
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#E5E7EB",
    marginBottom: 12,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  skeletonBase: {
    flex: 1,
  },

  shimmer: {
    position: "absolute",
    top: -40,
    bottom: -40,
    width: 75,
    backgroundColor: "rgba(255,255,255,0.65)",
    zIndex: 20,
  },

  nameSkeleton: {
    width: "42%",
    height: 24,
    borderRadius: 8,
    backgroundColor: "#D1D5DB",
    marginBottom: 6,
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
    gap: 6,
    alignItems: "flex-start",
  },

  typeSkeleton: {
    width: 90,
    height: 26,
    borderRadius: 999,
    backgroundColor: "#D1D5DB",
  },

  typeSkeletonSmall: {
    width: 72,
    height: 26,
    borderRadius: 999,
    backgroundColor: "#D1D5DB",
  },

  imageBox: {
    width: "28%",
    height: 100,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  semiCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    backgroundColor: "rgba(209,213,219,0.55)",
    borderTopLeftRadius: 70,
    borderBottomLeftRadius: 70,
  },

  pokeballContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  pokeballSkeleton: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(209,213,219,0.45)",
  },

  imageSkeleton: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: "#D1D5DB",
    zIndex: 1,
  },
});