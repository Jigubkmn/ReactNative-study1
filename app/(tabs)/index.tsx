import { Button } from "@/components/Button";
import { CircleButton } from "@/components/CircleButton";
import { EmojiList } from "@/components/EmojiList";
import { EmojiPicker } from "@/components/EmojiPicker";
import { EmojiSticker } from "@/components/EmojiSticker";
import { IconButton } from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import { type ImageSource } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {

  const [ selectedImage, setSelectedImage ] = useState<string | undefined>(undefined);
  // ユーザーが画像を選択したかどうか
  const [ showAppOptions, setShowAppOptions ] = useState<boolean>(false);
  // モーダル表示非表示
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
  // 絵文字
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  

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
      setShowAppOptions(true);
      setSelectedImage(result.assets[0].uri)
    } else {
      // ユーザーが画像を選択しない時
      alert('You did not select any image.');
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = () => {
    {/* A list of emoji component will go here */}
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button theme="primary" label={"Choose a photo"} onPress={pickImageAsync} />
            <Button label={"Use this photo"} onPress={() => setShowAppOptions(true)} />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});