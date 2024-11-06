import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/location');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Assured</Text>
      <Text style={styles.subtitle}>
        Always be up to date with your kid’s live location, live feed, and geo blocker
      </Text>
      <Image
        source={require('../assets/images/sample.jpg')} // Update with your image path
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f4fc',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 250,
  },
  pagination: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#888',
  },
  button: {
    backgroundColor: '#FF6B3D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Home;
