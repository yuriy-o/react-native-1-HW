import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

import Ionicons from "@expo/vector-icons/Ionicons";

export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const descriptionHandler = (text) => setDescription(text);
  const locationHandler = (text) => setLocation(text);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    // console.log("photo", camera);
  };
  const sendPhoto = () => {
    // console.log("navigation", navigation);
    navigation.navigate("Публікації", { photo, description, location });
  };

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.containerPermission}>
        <Text style={styles.textPermission}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera} type={type}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 130, width: 130 }}
            />
          </View>
        )}
        <View style={styles.buttonContainerIcon}>
          <TouchableOpacity onPress={takePhoto} activeOpacity={0.9}>
            <View style={styles.backIcon}>
              <Ionicons name="camera" size={24} color="#BDBDBD" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Завантажте фото</Text>
        <TextInput
          value={description}
          onChangeText={descriptionHandler}
          placeholder="Назва"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
          // onFocus={() => setIsKeyboardShow(true)}
        />
        <TextInput
          value={location}
          onChangeText={locationHandler}
          placeholder="Місцевість"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
          // onFocus={() => setIsKeyboardShow(true)}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text style={styles.btnTitle}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    backgroundColor: "#fff",
    // backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonContainerIcon: {
    flex: 4,
    justifyContent: "center",
    marginTop: 50,
  },
  backIcon: {
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.5,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  containerPermission: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  textPermission: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  btn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 16,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: "#fff",
    // fontFamily: "Roboto-Regular",
    fontSize: 20,
  },
  btnContainer: {
    alignItems: "center",
  },

  dataContainer: {
    marginHorizontal: 16,
  },
  dataLabel: {
    fontSize: 20,
    marginBottom: 35,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    // fontFamily: "Roboto-Regular",
    marginBottom: 16,
  },
});
