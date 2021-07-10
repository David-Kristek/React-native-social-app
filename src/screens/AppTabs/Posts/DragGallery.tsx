import React, { useState, useCallback } from "react";
import {
  View,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { PostImage } from "../../../components/Images";
import ActShower from "./ActShower";

interface Props {
  images: string[];
  onPress: () => void;
}
export default function DragGallery({ images, onPress }: Props) {
  const [visible, setVisible] = useState([0]);
  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    var viewList: any[] = viewableItems;
    var viewList = viewList.map((item) => item.index);
    setVisible(viewList);
  }, []);

  const screenWidth = Dimensions.get("window").width;

  return (
    <>
      {images.length > 1 && (
        <ActShower max={images.length} index={visible[0]} />
      )}
      <FlatList
        horizontal={true}
        data={images}
        renderItem={({ item, index }) => (
          <View>
            <PostImage uri={item} vis={visible} id={index} onPress={onPress}/>
          </View>
        )}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        snapToInterval={screenWidth}
        onViewableItemsChanged={_onViewableItemsChanged}
        keyExtractor={(item, index) => "key" + index}
      />
    </>
  );
}
