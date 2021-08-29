import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import dateFormat from "dateformat";
interface Props {
  val: Date;
}
export default function Time({ val }: Props) {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (new Date().getTime() - val.getTime() > 86400000)
      setTime(dateFormat(val, "d. m.  H:MM"));
    else setTime(dateFormat(val, "H:MM"));
  }, [val]);

  return (
    <View style={{ width: "100%", alignItems: "center", paddingTop: 40 }}>
      <Text style={{ color: "grey" }}>{time}</Text>
    </View>
  );
}
