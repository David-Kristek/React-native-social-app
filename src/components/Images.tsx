import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from "react-native";
// @ts-ignore
import ImageLoad from "react-native-image-placeholder";

interface Props {
  size: number;
}

export function Logo({ size }: Props) {
  const styles = StyleSheet.create({
    img: {
      width: size * 3.125,
      height: size,
    },
  });

  return <Image source={require("../../assets/Logo.png")} style={styles.img} />;
}
interface Props2 {
  uri: string;
  id: number;
  vis: any[];
  onPress: () => void;
}
type ImageSize = {
  width: number;
  height: number;
};
export function PostImage({ uri, vis, id, onPress }: Props2) {
  const uriArr = uri.split("upload/");
  const imageUri = uriArr[0] + "upload/q_auto/" + uriArr[1]; 
  var screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(true);
  const [imageSize, setImageSize] = useState<ImageSize>({
    height: 0,
    width: 0,
  });
  useEffect(() => {
    Image.getSize(imageUri, (width, height) => {
      setImageSize({
        height: vis.includes(id) ? screenWidth / (width / height) : 250,
        width: screenWidth,
      });
    });
  }, [vis]);

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={{
        height: imageSize.height,
        width: imageSize.width,
        backgroundColor: "white",
        // minHeight: 300,
      }}
    >
      <Image
        source={{
          uri: imageUri,
        }}
        resizeMode={"cover"}
        style={{
          height: imageSize.height,
          width: imageSize.width,
        }}
      />
    </TouchableWithoutFeedback>
  );
  // return <></>;
}
