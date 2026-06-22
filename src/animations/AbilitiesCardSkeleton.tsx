// src/app/components/AbilitySkeleton.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function AbilitySkeleton() {
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
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.65,
          duration: 650,
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
    outputRange: [-120, 420],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.content, { opacity: pulse }]}>
        <View style={styles.title} />
        <View style={styles.lineLarge} />
        <View style={styles.lineMedium} />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }, { rotate: "18deg" }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },

  content: {
    gap: 10,
  },

  title: {
    width: "35%",
    height: 20,
    borderRadius: 8,
    backgroundColor: "#D1D5DB",
  },

  lineLarge: {
    width: "95%",
    height: 14,
    borderRadius: 8,
    backgroundColor: "#D1D5DB",
  },

  lineMedium: {
    width: "70%",
    height: 14,
    borderRadius: 8,
    backgroundColor: "#D1D5DB",
  },

  shimmer: {
    position: "absolute",
    top: -40,
    bottom: -40,
    width: 70,
    backgroundColor: "rgba(255,255,255,0.65)",
    zIndex: 20,
  },
});