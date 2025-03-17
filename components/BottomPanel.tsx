import { View, StyleSheet, Image } from "react-native";

export const BottomPanel = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../assets/images/menu.png")} style={styles.icon} />
      </View>
      <View>
        <Image source={require("../assets/images/pending.png")} style={styles.icon} />
      </View>
      <View style={styles.spacingBetween}>
        <Image source={require("../assets/images/bell.png")} style={styles.icon} />
      </View>
      <View>
        <Image source={require("../assets/images/user.png")} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 0.9,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  spacingBetween: {
    marginLeft: 80, 
  },
});
