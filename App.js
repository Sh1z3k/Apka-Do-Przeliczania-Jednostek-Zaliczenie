import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const App = () => {
  const [value, setValue] = useState('');
  const [imperialUnit, setImperialUnit] = useState('feet');
  const [metricUnit, setMetricUnit] = useState('meters');
  const [convertedValue, setConvertedValue] = useState(null);

  const [imperialOpen, setImperialOpen] = useState(false);
  const [metricOpen, setMetricOpen] = useState(false);

  const imperialItems = [
    { label: 'Stopy', value: 'feet' },
    { label: 'Cale', value: 'inches' },
  ];

  const metricItems = [
    { label: 'Metry', value: 'meters' },
    { label: 'Centymetry', value: 'centimeters' },
  ];

  const convertValue = () => {
    let result = 0;
    if (imperialUnit === 'feet' && metricUnit === 'meters') {
      result = value * 0.3048;
    } else if (imperialUnit === 'inches' && metricUnit === 'centimeters') {
      result = value * 2.54;
    }
    setConvertedValue(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Konwerter Jednostek</Text>
      <TextInput
        style={styles.input}
        placeholder="Wprowadź wartość"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <Text>Jednostka Imperialna:</Text>
      <DropDownPicker
        open={imperialOpen}
        value={imperialUnit}
        items={imperialItems}
        setOpen={setImperialOpen}
        setValue={setImperialUnit}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
    
      <Text >Jednostka Metryczna:</Text>
      <DropDownPicker
        open={metricOpen}
        value={metricUnit}
        items={metricItems}
        setOpen={setMetricOpen}
        setValue={setMetricUnit}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <Button title="Przelicz" onPress={convertValue} />

      {convertedValue !== null && (
        <Text style={styles.result}>
          Wynik: {convertedValue}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    width: '100%',
  },
  dropdown: {
    width: '90%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  dropdownContainer: {
    maxHeight: 200,
    backgroundColor: '#ffffff',
    elevation: 4,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  dropdownItemActive: {
    backgroundColor: '#eaeaea',
    color: '#007BFF',
  },
  result: {
    color: 'green',
    marginTop: 20,
  },
});

export default App;
