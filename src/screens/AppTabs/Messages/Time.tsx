import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import dateFormat from "dateformat";
interface Props {
  itemDate: Date;
  preDate: Date | null;
}
export default function Time({ itemDate, preDate }: Props) {
  const [time, setTime] = useState("");

  useEffect(() => {
    // console.log(itemDate.getTime() - preDate.getTime());
    if (new Date().getDate() !== itemDate.getDate())
      setTime(dateFormat(itemDate, "d. m.  H:MM"));
    else setTime(dateFormat(itemDate, "H:MM"));
  }, [itemDate]);

  return (
    <>
      {preDate &&
        itemDate.getTime() - preDate.getTime() >
          (new Date().getDate() !== itemDate.getDate() ? 3600000 : 30000) && (
          <View style={{ width: "100%", alignItems: "center", paddingTop: 40 }}>
            <Text style={{ color: "grey" }}>{time}</Text>
          </View>
        )}
    </>
  );
}
