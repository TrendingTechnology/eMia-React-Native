import PropTypes from 'prop-types';
import React, {Children} from 'react';
import {TouchableOpacity, View} from 'react-native';

const noop = () => {};

const Button = ({
  onPress = noop,
  onLongPress = noop,
  onLayout = noop,
  children,
  style,
}) => (
  <TouchableOpacity
    onLongPress={onLongPress}
    onLayout={onLayout}
    onPress={onPress}>
    <View style={style}>
      {Children.map(children, child => child)}
    </View>
  </TouchableOpacity>
);

Button.defaultProps = {
  onPress: noop,
  onLongPress: noop,
  onLayout: noop,
  rippleColor: '#f0eef0',
};

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.any,
  onLongPress: PropTypes.func,
  onLayout: PropTypes.func,
  rippleColor: PropTypes.string,
};

export default Button;
