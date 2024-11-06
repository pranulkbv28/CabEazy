import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Location: undefined;
  NextPage: undefined; // Add the name of your next screen here
};

const LocationScreen: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const getLocation = async () => {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current location and set up a watch
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1, // Update on location changes
        },
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
        }
      );

      // Cleanup the subscription on unmount
      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    };

    getLocation();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('signup'); };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.text}>{errorMsg}</Text>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>Location services</Text>
            <Text style={styles.subtitle}>Please allow location services</Text>
          </View>
          <Text style={styles.text}>Live Location Data:</Text>
          <Text style={styles.text}>
            Latitude: {location.latitude !== null ? location.latitude.toFixed(6) : 'Loading...'}
          </Text>
          <Text style={styles.text}>
            Longitude: {location.longitude !== null ? location.longitude.toFixed(6) : 'Loading...'}
          </Text>

          {location.latitude && location.longitude && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title={"Your Location"}
              />
            </MapView>
          )}

          {/* Button to navigate to the next screen */}
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FF6B3D",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default LocationScreen;
