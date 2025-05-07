import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg' }}
        style={styles.mentorImage}
      />
      <Text>Welcome to Mentor AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mentorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});