import React, {Children} from 'react';
import PropTypes from 'prop-types';
import {TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {OLD_ANDROID_VERSIONS} from '../../config/constants';

const noop = () => {};

const Button = ({
  onPress = noop,
  onLongPress = noop,
  onLayout = noop,
  children,
  rippleColor,
  style,
  background
}) => {
  const version = DeviceInfo.getSystemVersion();

  if (!!OLD_ANDROID_VERSIONS.find(oldVersion => oldVersion === version)) {
    return (
      <TouchableOpacity
        onLongPress={onLongPress}
        onLayout={onLayout}
        onPress={onPress}>
        <View style={style}>
          {Children.map(children, child => child)}
        </View>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableNativeFeedback
        onLongPress={onLongPress}
        onLayout={onLayout}
        onPress={onPress}
        background={background ? TouchableNativeFeedback[background]() : TouchableNativeFeedback.Ripple(rippleColor, false)}>
        <View style={style}>
          {Children.map(children, child => child)}
        </View>
      </TouchableNativeFeedback>
    )
  }
}

Button.defaultProps = {
  onPress: noop,
  onLongPress: noop,
  onLayout: noop,
  rippleColor: '#f0eef0',
}

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.any,
  onLongPress: PropTypes.func,
  onLayout: PropTypes.func,
  rippleColor: PropTypes.string
}

export default Button
