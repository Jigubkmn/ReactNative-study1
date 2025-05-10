import { ImageSource } from "expo-image";
import { Image, StyleSheet } from "react-native";

const PlaceholderImage = require('@/assets/images/background-image.png');

type Props = {
  imgSource: ImageSource;
}

export default function ImageViewer({imgSource}:Props) {
  return (
    <Image source={PlaceholderImage} style={styles.image} />
  );
}


const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  }
});