import { useRef, useState } from 'react';
import { View, StyleSheet, Modal, Text, Alert, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import * as ImagePicker from 'expo-image-picker';
import Button from '../../../components/Button';
import ImageViewer from '../../../components/ImageViewer';
import EmojiSticker from '../../../components/EmojiSticker';

const PlaceholderImage = require('../../../assets/images/icon.png');
const EMOJIS = ['😀', '😎', '🔥', '⭐', '🐱', '🚀'];

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showOptions, setShowOptions] = useState(false);
  const [sticker, setSticker] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const imageRef = useRef<View | null>(null);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert('Вы не выбрали изображение');
    }
  };

  const onReset = () => {
    setShowOptions(false);
    setSelectedImage(undefined);
    setSticker(null);
  };

  const onAddSticker = () => {
    setPickerVisible(true);
  };

  const chooseSticker = (emoji: string) => {
    setSticker(emoji);
    setPickerVisible(false);
  };

  const onSaveImage = async () => {
    try {
      const uri = await captureRef(imageRef as any, {
        format: 'png',
        quality: 0.8,
      });
      const link = document.createElement('a');
      link.href = uri;
      link.download = 'sticker-smash.png';
      link.click();
    } catch (e) {
      console.error('Ошибка сохранения:', e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer} ref={imageRef as any}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />

        {sticker && (
          <View style={styles.stickerWrap}>
            <EmojiSticker emoji={sticker} size={60} />
          </View>
        )}
      </View>

      <View style={styles.footerContainer}>
        {showOptions ? (
          <View style={styles.optionsRow}>
            <Button label="Reset" onPress={onReset} />
            <View style={styles.spacer} />
            <Button theme="primary" label="Pick a sticker" onPress={onAddSticker} />
            <View style={styles.spacer} />
            <Button label="Save screenshot" onPress={onSaveImage} />
          </View>
        ) : (
          <>
            <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            {selectedImage && (
              <Button label="Use this photo" onPress={() => setShowOptions(true)} />
            )}
          </>
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={pickerVisible}
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContent}>
            <Text style={styles.pickerTitle}>Выбери стикер</Text>
            <View style={styles.emojiRow}>
              {EMOJIS.map((emoji) => (
                <Pressable key={emoji} onPress={() => chooseSticker(emoji)}>
                  <Text style={styles.emoji}>{emoji}</Text>
                </Pressable>
              ))}
            </View>
            <Button label="Cancel" onPress={() => setPickerVisible(false)} />
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    gap: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 12,
  },
  stickerWrap: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContent: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#25292e',
  },
  emojiRow: {
    flexDirection: 'row',
    gap: 14,
  },
  emoji: {
    fontSize: 44,
  },
});
