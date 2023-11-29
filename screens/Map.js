import { useCallback, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectLocation, setSelectLocation] = useState();

  const region = {
    latitude: -26.915474187267673,
    longitude: -49.084535379431344,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  };

  function selectLocationHandler(event) {
    //console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectLocation) {
      Alert.alert(
        "No location picked",
        "Please pick a location by tapping on the map first"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectLocation.lat,
      pickedLng: selectLocation.lng,
    });
  }, [navigation, selectLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"save"}
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectLocation.lat,
            longitude: selectLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
