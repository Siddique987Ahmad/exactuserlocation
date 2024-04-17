import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Location from "expo-location";
export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    // try {
    //   const getPermissions=async()=>{
    //     let {status}=await Location.getForegroundPermissionsAsync();
    //     if(status!=='granted')
    //     {
    //       console.log("Please grant Location permission")
    //       return;
    //     }
    //     let currentLocation=await Location.getCurrentPositionAsync({});
    //     setLocation(currentLocation)
    //     console.log("Location:")
    //     console.log(currentLocation)
    //   }
    //   getPermissions()
    // } catch (error) {
    //   console.log(error)

    // }
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Please grant Location permission");
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location:");
        console.log(currentLocation);
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    requestLocationPermission();
  }, []);

  const geocode = async () => {
    try {
      const geocodedLocation = await Location.geocodeAsync(address);
      console.log("Geocoded Address:");
      console.log(geocodedLocation);
    } catch (error) {
      console.log(error);
    }
  };
  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Geocode Address" onPress={geocode} />
      <Button
        title="Reverse Geocode Current Location"
        onPress={reverseGeocode}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
