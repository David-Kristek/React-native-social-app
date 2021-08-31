// import React, {
//   createContext,
//   useState,
//   FC,
//   useEffect,
//   useRef,
//   useContext,
// } from "react";
// import Constants from "expo-constants";
// import { Platform } from "react-native";
// import { Subscription } from "@unimodules/core";
// import * as Notifications from "expo-notifications";
// import axios from "axios";
// import { AuthContext } from "./AuthContext";
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });
// interface NotificationsState {}

// export const NotificationContext = createContext<NotificationsState>({});

// const NotificationProvider: FC = ({ children }) => {
//   const notificationListener = useRef<Subscription>();
//   const responseListener = useRef<Subscription>();
//   const { user } = useContext(AuthContext);
//   useEffect(() => {
//     if (user)
//       registerForPushNotificationsAsync().then((token: any) => {
//         if (token) {
//           axios.get(
//             "10.0.0.2:5000/api/notification/register?token=" +
//               token +
//               "&useremail=" +
//               user.email
//           );
//         }
//       });

//     // // This listener is fired whenever a notification is received while the app is foregrounded
//     // notificationListener.current =
//     //   Notifications.addNotificationReceivedListener((notification) => {
//     //     setNotification(!!notification);
//     //   });

//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       if (notificationListener.current && responseListener.current) {
//         Notifications.removeNotificationSubscription(
//           notificationListener.current
//         );
//         Notifications.removeNotificationSubscription(responseListener.current);
//       }
//     };
//   }, []);

//   return (
//     <NotificationContext.Provider value={{}}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };
// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     // console.log(token);
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     return token;
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }
// }
// export default NotificationProvider;
