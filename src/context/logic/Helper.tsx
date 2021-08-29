import React from "react";
import { PostsContext } from "../PostsContext";
var groupPasswordA = "";
export default function Helper() {
  const { groupPassword } = React.useContext(PostsContext);
  groupPasswordA = groupPassword;
  return { groupPassword };
}
export const groupPassword = groupPasswordA;
