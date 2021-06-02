import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { PostImage } from "../../../components/Images";
import ActShower from "./ActShower";

interface Props {
  images: any[];
}
export default function DragGallery({ images }: Props) {
  const [visible, setVisible] = useState([0]);
  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    var viewList: any[] = viewableItems;
    var viewList = viewList.map((item) => item.index);
    setVisible(viewList);
  }, []);

  const screenWidth = Dimensions.get("window").width;
  return (
    <View>
      {images.length > 1 && <ActShower max={images.length} index={visible[0]} />}

      <FlatList
        horizontal={true}
        data={images}
        renderItem={({ item, index }) => (
          <View>
            <PostImage img={item} vis={visible} id={index} />
          </View>
        )}
        snapToAlignment={"start"}
        decelerationRate={"normal"}
        snapToInterval={screenWidth}
        onViewableItemsChanged={_onViewableItemsChanged}
        keyExtractor={(item, index) => 'key'+index}
      />
    </View>
  );
}
