import { Link } from "expo-router";
import React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";

export default function Index() {

  return (
    <>
      <View style={styles.container}>
      <Link href="/temperamentTest" style={[styles.link, styles.linkTest]}>
          <Text style={styles.linkText}>Temperament test 👀</Text>
        </Link>
        <Link href="/claudeMonet" style={styles.link}>
          <Text style={styles.linkText}>About Claude Monet 🎨</Text>
        </Link>
        <Link href="/todoList" style={[styles.link, styles.linkList]}>
          <Text style={styles.linkText}>TODO List 📔</Text>
        </Link>
        <Link href="./screens/ParticipantA" style={[styles.link, {backgroundColor: "#deadad"}]}>
          <Text style={styles.linkText}>European Protocol 🚗</Text>
        </Link>
      </View>
    </>
  );
}

const width = Dimensions.get("screen").width
// const height = Dimensions.get("window").height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: 20,
  },
  link: {
    backgroundColor: "#98b7d6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
    width: 280,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
    textAlign: "center",
  },
  linkList: {
    backgroundColor: "#c6bdd9",
  },
  linkTest: {
    backgroundColor: width > 100 ? "#3727" : "gray",
    // ...Platform.select({
    //   android: {
    //     color: "black"
    //   },
    //   ios: {
    //     color: "red"
    //   }
    // })
  },
});