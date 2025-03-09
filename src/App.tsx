import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

function App(): React.JSX.Element {

  return (
    <SafeAreaView >
      <StatusBar
      />
      <Text>Testing seems ok</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
