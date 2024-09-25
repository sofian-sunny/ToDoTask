import React from 'react';
import {StyleSheet, Modal as RNModal, ViewStyle, Platform} from 'react-native';
import {useTheme} from '../hooks/';
import {IModalProps} from '../constants/types';
import Block from './Block';
import Button from './Button';
import Image from './Image';

const Modal = ({
  id = 'Modal',
  children,
  style,
  onRequestClose,
  ...props
}: IModalProps) => {
  const {assets, colors, sizes} = useTheme();
  const modalStyles = StyleSheet.flatten([style, {margin: 50}]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const modalID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};

  return (
    <RNModal
      {...modalID}
      {...props}
      transparent
      // style={modalStyles}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <Block justify="center">
        <Block safe card margin={20} flex={0} color="rgba(255,255,255,1)">
          <Block flex={0} margin={16} paddingHorizontal={sizes.padding}>
            {children}
          </Block>
        </Block>
      </Block>
    </RNModal>
  );
};

export default React.memo(Modal);
