import { Button } from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {

  const [ selectedImage, setSelectedImage ] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    // launchImageLibraryAsync()で、選択された画像に関する情報を含むオブジェクトを返す
    let result =  await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    // ユーザーが画像を選択したかどうか
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      // ユーザーが画像を選択しない時
      alert('You did not select any image.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label={"Choose a photo"} onPress={pickImageAsync} />
        <Button label={"Use this photo"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});