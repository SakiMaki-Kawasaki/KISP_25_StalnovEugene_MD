import { StyleSheet, View, Image, ImageStyle } from 'react-native';

type Props = {
  imgSource: number;
  selectedImage?: string;
  style?: ImageStyle;
};

export default function ImageViewer({ imgSource, selectedImage, style }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={[styles.image, style]} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
