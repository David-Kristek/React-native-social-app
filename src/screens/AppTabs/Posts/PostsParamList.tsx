import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type PostsParamList = {
  HomeScreen: undefined;
  SelectPhotos: undefined;
  User: undefined;
  SelectPhoto: undefined;
  AddPost: {
    images: {
      uri: string;
      id: string; 
    }[];
  };
};

export type PostsParamProps<T extends keyof PostsParamList> = {
  navigation: StackNavigationProp<PostsParamList, T>;
  route: RouteProp<PostsParamList, T>;
};
