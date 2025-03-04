import { Link } from "expo-router";
import { Text, ScrollView, StyleSheet, Image, ImageBackground, SectionList, View } from "react-native";

import { useFonts } from "expo-font";


export default function Index() {

  useFonts({
    "SpaceMono": require("../assets/fonts/SpaceMono-Bold.ttf"),
  });

  const artworks = [
    { uri: "https://arthive.com/res/media/img/ox400/work/d51/193474@2x.webp", name: 'The beach at Trouville (1870)' },
    { uri: "https://arthive.com/res/media/img/ox400/work/fd3/178269@2x.webp", name: 'Lady in the garden Sainte-Adresse (1867)' },
    { uri: "https://cdn.vogue.ua/i/image_1472x/uploads/image/62a/dc3/391/5dcd391dc362a.jpeg.webp", name: 'Impression, Sunrise (1872)' },
    { uri: "https://cdn.vogue.ua/i/image_1472x/uploads/image/ee6/dac/3ae/5dcd3aedacee6.jpeg.webp", name: 'Parliament house at sunset (1902)' },
    { uri: "https://cdn.vogue.ua/i/image_720x/uploads/image/329/76f/397/5dcd39776f329.jpeg.webp", name: 'Woman with a Parasol (1875)' },
    { uri: "https://cdn.vogue.ua/i/image_1472x/uploads/image/db1/f57/3c8/5dcd3c8f57db1.jpeg.webp", name: 'Arrival of the Normandy Train, Gare Saint-Lazare (1877)' },
    { uri: "https://uploads7.wikiart.org/images/claude-monet/lunch-on-the-grass-study.jpg!PinterestSmall.jpg", name: 'Lunch on the Grass (1865)' },
    { uri: "https://uploads5.wikiart.org/images/claude-monet/fishing-boats-calm-sea.jpg!PinterestSmall.jpg", name: 'Fishing Boats, Calm Sea (1868)' },
    { uri: "https://uploads2.wikiart.org/images/claude-monet/the-road-to-the-farm-of-saint-simeon-in-winter.jpg!PinterestSmall.jpg", name: 'The Road to the Farm of Saint-Simeon in Winter (1867)' },
    { uri: "https://arthive.com/res/media/img/ox400/work/971/200720@2x.webp", name: 'The woman in the garden (1866)' },
    { uri: "https://uploads7.wikiart.org/images/claude-monet/garden-at-sainte-adresse.jpg!PinterestSmall.jpg", name: 'Terrace at the Seaside, Sainte-Adresse (1867)' },
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQClhAnSmD3qUwWqcPcjl5D19mijKevdz9I1A&s", name: 'The Manneport, Cliff At Etretat, Sunset (1883)' },
  ];

  return (
    <ImageBackground source={require("../assets/images/claude.jpg")} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Link href="/" style={styles.backLink}>🔙</Link>
        <Text style={styles.title}>* Artworks by Claude Monet *</Text>
        <ScrollView contentContainerStyle={styles.gallery}>
          {artworks.map((item, index) => (
            <View key={index} style={styles.artwork}>
              <Image style={styles.image} source={{ uri: item.uri }} />
              {item.name && <Text style={styles.caption}>{item.name}</Text>}
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingVertical: 20,
    flex: 1,
    backgroundColor: "rgba(186, 186, 186, 0.6)",
  },
  backLink: {
    paddingLeft: 20,
    paddingBottom: 10,
    fontSize: 24,
    color: "#fff",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 18,
    fontFamily: "SpaceMono",
    color: "#fff",
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "rgba(109, 66, 4, 0.28)",
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
    gap: 30,
  },
  artwork: {
    alignItems: "center",
    width: 150,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    boxShadow:'1 0 8 rgba(50, 2, 2, 0.52)'
  },
  caption: {
    fontSize: 10,
    fontFamily: "SpaceMono",
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },

})