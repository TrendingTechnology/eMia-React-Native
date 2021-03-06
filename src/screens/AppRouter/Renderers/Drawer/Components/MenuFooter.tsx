/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Switch, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {AppContext} from '../../../../../components/other/context';

export default function MenuFooter() {
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(AppContext);

  return (
    <TouchableRipple
      onPress={() => {toggleTheme()}}>
      <View style={styles.preference}>
        <Text>Dark Theme</Text>
        <View pointerEvents="none">
          <Switch value={paperTheme.dark} />
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
