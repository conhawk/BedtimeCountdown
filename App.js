import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CountdownApp = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);

  const startCountdown = () => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    setTimeRemaining(totalSeconds);
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  const formatTime = (time) => {
    return `${Math.floor(time / 3600)
      .toString()
      .padStart(2, '0')}:${Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countdown App</Text>
      <Image source={require('./sleep1.jpg')} style={styles.image} />
      <View style={styles.boxContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="access-time" size={24} color="white" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.hourInput]}
            placeholder="Hours"
            placeholderTextColor="white" // Change placeholder text color to white
            value={hours}
            onChangeText={(text) => setHours(text)}
            keyboardType="numeric"
          />
          <MaterialIcons name="access-time" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Minutes"
            placeholderTextColor="white" // Change placeholder text color to white
            value={minutes}
            onChangeText={(text) => setMinutes(text)}
            keyboardType="numeric"
          />
          <MaterialIcons name="access-time" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Seconds"
            placeholderTextColor="white" // Change placeholder text color to white
            value={seconds}
            onChangeText={(text) => setSeconds(text)}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={startCountdown}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <Text style={styles.timeRemaining}>
          Time Remaining: {formatTime(timeRemaining)}
        </Text>
      </View>
      <Image source={require('./sleep2.jpg')} style={styles.bottomImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 1,
  },
  image: {
    marginTop: -10,
    width: 190,
    height: 200,
  },
  bottomImage: {
    bottom: -80,
    width: 270,
    height: 180,
  },
  boxContainer: {
    marginTop: 16,
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    color: 'white', // Change input text color to white
  },
  hourInput: {
    color: 'white', // Change hour text color to white
  },
  icon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 16,
    justifyContent: 'center', // Center the button text vertically
    alignItems: 'center', // Center the button text horizontally
  },
  buttonText: {
    color: 'black', // Change button text color to black
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeRemaining: {
    fontSize: 18,
    marginTop: 16,
    color: 'white',
  },
});

export default CountdownApp;
