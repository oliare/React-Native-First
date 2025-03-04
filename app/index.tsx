import { useFonts } from "expo-font";
import { Link } from "expo-router";
import { Text, StyleSheet, Image, ScrollView } from "react-native";

export default function Index() {

  useFonts({
    "SpaceMono": require("../assets/fonts/SpaceMono-Bold.ttf"),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Claude Monet</Text>
      <Text style={styles.subTitle}>- the father of impressionism</Text>

      <Image source={require("../assets/images/claude.jpg")} style={styles.image} />
      <Text style={styles.quote}>"I paint as I see, as I feel… as I breathe."</Text>

      <Text style={styles.bio}>
        Claude Monet (1840–1926) was a legendary French painter who ushered in a new era in art.
        His paintings are poetry of light and color, an attempt to capture fleeting moments in time.
      </Text>

      <Text style={styles.quote}>🌿 "I want to depict what lies between me and the motif."</Text>

      <Text style={styles.bio}>
        With his unique brushstroke technique and mastery of light, he created breathtaking landscapes that seemed alive.
        His painting "Impression, Sunrise" (1872) gave its name to an entire artistic movement – Impressionism.
      </Text>

      <Text style={styles.bioLast}>
        ...His life was a story of perseverance and inspiration. Even in his later years, nearly blind, he never stopped painting.
        His enchanting gardens in Giverny became his ultimate studio, where he created his most remarkable masterpieces.
      </Text>

      <Link href="/gallery" style={styles.link}>
        <Text style={styles.linkText}>Go to gallery 🎨</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    padding: 20,
  },
  title: {
    fontFamily: "SpaceMono",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#444",
    textAlign: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 8,
  },
  works: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  listItem: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
  image: {
    width: 300,
    height: 350,
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: '0 2 10',
    alignSelf: "center",
  },
  link: {
    backgroundColor: "#98b7d6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
    textAlign: "center",
  },
  bioLast: {
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 8,
    fontStyle: "italic",
  },

});