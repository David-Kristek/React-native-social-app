import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, Dimensions } from "react-native";

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
  img: any;
  id: number;
  vis: any[];
}
type ImageSize = {
  width: number;
  height: number;
};
export function PostImage({ img, vis, id }: Props2) {
  const [height, setHeight] = useState(0);
  var screenWidth = Dimensions.get("window").width;
  // pak obrazky pomoci uri: imageUrl - fetched from api
  // s uri
  // Image.getSize(myUri, (width, height) => {this.setState({width, height})});

  const imageInfo = Image.resolveAssetSource(img);
  const style = StyleSheet.create({
    imgS: {
      resizeMode: "cover",
      height: height,
      width: screenWidth,
    },
  });
  useEffect(() => {

    setHeight(
      vis.includes(id) ? screenWidth / (imageInfo.width / imageInfo.height) : 0
    );
  }, [vis]);

  return <Image source={img} style={style.imgS} />;
}
