import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const App = () => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [unit1, setUnit1] = useState('');
  const [unit2, setUnit2] = useState('');
  const [convertedValue, setConvertedValue] = useState(null);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [unit1Open, setUnit1Open] = useState(false);
  const [unit2Open, setUnit2Open] = useState(false);

  const unit1Animation = useRef(new Animated.Value(0)).current;
  const unit2Animation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const animateIn = (animation) => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  };

  const animateOut = (animation) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleCategoryOpen = (open) => {
    setCategoryOpen(open);
    if (open) {
      setUnit1Open(false);
      setUnit2Open(false);
    }
  };
  
  const handleUnit1Open = (open) => {
    setUnit1Open(open);
    if (open) {
      setCategoryOpen(false);
      setUnit2Open(false);
    }
  };
  
  const handleUnit2Open = (open) => {
    setUnit2Open(open);
    if (open) {
      setCategoryOpen(false);
      setUnit1Open(false);
    }
  };


  const categories = [
    { label: 'długość', value: 'length' },
    { label: 'masa', value: 'mass' },
    { label: 'prędkość', value: 'speed' },
    { label: 'czas', value: 'time' },
    { label: 'dane', value: 'data' },
  ];

  const units = {
    length: [
      { label: 'stopy', value: 'feet', short: 'ft' },
      { label: 'cale', value: 'inches', short: 'in' },
      { label: 'metry', value: 'meters', short: 'm' },
      { label: 'centymetry', value: 'centimeters', short: 'cm' },
    ],
    mass: [
      { label: 'kilogramy', value: 'kilograms', short: 'kg' },
      { label: 'funty', value: 'pounds', short: 'lbs' },
      { label: 'uncje', value: 'ounces', short: 'oz' },
    ],
    speed: [
      { label: 'kilometry na godzinę', value: 'kmh', short: 'km/h' },
      { label: 'mile na godzinę', value: 'mph', short: 'mph' },
    ],
    time: [
      { label: 'godziny', value: 'hours', short: 'h' },
      { label: 'minuty', value: 'minutes', short: 'min' },
      { label: 'sekundy', value: 'seconds', short: 's' },
    ],
    data: [
      { label: 'bajty', value: 'bytes', short: 'B' },
      { label: 'kilobajty', value: 'kilobytes', short: 'KB' },
      { label: 'megabajty', value: 'megabytes', short: 'MB' },
      { label: 'gigabajty', value: 'gigabytes', short: 'GB' },
    ],
  };

  const conversionRates = {
    length: {
      feet: { meters: 0.3048, centimeters: 30.48, inches: 12 },
      inches: { centimeters: 2.54, meters: 0.0254, feet: 0.0833333 },
      meters: { feet: 3.28084, inches: 39.3701, centimeters: 100 },
      centimeters: { inches: 0.393701, feet: 0.0328084, meters: 0.01 },
    },
    mass: {
      kilograms: { pounds: 2.20462, ounces: 35.274 },
      pounds: { kilograms: 0.453592, ounces: 16 },
      ounces: { kilograms: 0.0283495, pounds: 0.0625 },
    },
    speed: {
      kmh: { mph: 0.621371 },
      mph: { kmh: 1.60934 },
    },
    time: {
      hours: { minutes: 60, seconds: 3600 },
      minutes: { hours: 0.0166667, seconds: 60 },
      seconds: { minutes: 0.0166667, hours: 0.000277778 },
    },
    data: {
      bytes: { kilobytes: 0.001, megabytes: 0.000001, gigabytes: 1e-9 },
      kilobytes: { bytes: 1000, megabytes: 0.001, gigabytes: 0.000001 },
      megabytes: { bytes: 1e6, kilobytes: 1000, gigabytes: 0.001 },
      gigabytes: { bytes: 1e9, kilobytes: 1e6, megabytes: 1000 },
    },
  };

  const convertValue = () => {
    if (!value || !unit1 || !unit2 || !category) return;
    const rate = conversionRates[category]?.[unit1]?.[unit2];
    if (rate) {
      const converted = parseFloat(value) * rate;
      setConvertedValue(
        `${value} ${units[category].find(u => u.value === unit1)?.short} = ${converted.toFixed(2)} ${units[category].find(u => u.value === unit2)?.short}`
      );
    } else {
      setConvertedValue('nieobsługiwana konwersja');
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setUnit1('');
    setUnit2('');
    setConvertedValue(null);
    if (newCategory) {
      animateIn(unit1Animation);
      setTimeout(() => animateIn(unit2Animation), 100);
      setTimeout(() => animateIn(buttonAnimation), 200);
    } else {
        animateOut(unit1Animation);
        animateOut(unit2Animation);
        animateOut(buttonAnimation);
    }
  };

  const animatedStyles1 = {
    transform: [{ scale: unit1Animation }],
    opacity: unit1Animation,
  };

  const animatedStyles2 = {
    transform: [{ scale: unit2Animation }],
    opacity: unit2Animation,
  };

    const animatedButtonStyles = {
    transform: [{ scale: buttonAnimation }],
    opacity: buttonAnimation,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>konwerter jednostek</Text>
      <View style={[styles.dropdownWrapper, categoryOpen ? { zIndex: 3, elevation: 5 } : { zIndex: 1 }]}>
      <DropDownPicker
        open={categoryOpen}
        value={category}
        items={categories}
        setOpen={handleCategoryOpen}
        setValue={handleCategoryChange}
        placeholder="jednostka"
        placeholderStyle={styles.placeholder}
        textStyle={{
          fontSize: 12,
        }}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      </View>

      <TextInput
        style={styles.input}
        placeholder="wartość"
        placeholderTextColor='#888'
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      {category ? (
        <Animated.View style={[styles.dropdownWrapper, animatedStyles1, unit1Open ? { zIndex: 2 } : { zIndex: 1 }]}>
          <DropDownPicker
            open={unit1Open}
            value={unit1}
            items={units[category]}//?.filter((item) => item.value !== unit2)}
            setOpen={handleUnit1Open}
            setValue={setUnit1}
            placeholder="jednostka początkowa"
            placeholderStyle={styles.placeholder}
            textStyle={{
              fontSize: 12,
            }}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </Animated.View>
      ) : null}

      {category ? (
        <Animated.View style={[styles.dropdownWrapper, animatedStyles2, unit2Open ? { zIndex: 2 } : { zIndex: 1 }]}>
          <DropDownPicker
            open={unit2Open}
            value={unit2}
            items={units[category]?.filter((item) => item.value !== unit1)}
            setOpen={handleUnit2Open}
            setValue={setUnit2}
            placeholder="jednostka końcowa"
            placeholderStyle={styles.placeholder}
            textStyle={{
              fontSize: 12,
            }}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </Animated.View>
      ) : null}

      {category ? (
        <Animated.View style={[animatedButtonStyles, styles.buttonContainer]}>
        <Button title="PRZELICZ" onPress={convertValue} />
        </Animated.View>
      ) : null}

      {convertedValue !== null && <Text style={styles.result}>{convertedValue}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    //borderWidth: 1,
    padding: 20,
    alignItems: 'center',
  },
  placeholder:{
    color: '#888',
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    width: '85%',
  },
  dropdownWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 1,
    position: 'relative',
  },
  dropdown: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginVertical: 1,
    alignSelf: 'center',
    maxWidth: '95%',
  },
  dropdownContainer: {
    width: '95%',
    maxHeight: 100,
    backgroundColor: '#ffffff',
    marginLeft: 5,
    elevation: 4,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 5,
  },
  result: {
    color: 'green',
    marginTop: 5,
  },
});

export default App;
