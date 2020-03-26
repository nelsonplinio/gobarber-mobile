import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useField } from '@unform/core';

import { Container, TInput, Error } from './styles';

function Input({ name, style, icon, ...rest }, ref) {
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: '_lastNativeText',
      getValue(inref) {
        return inref._lastNativeText || '';
      },
      setValue(inref, value) {
        inref.setNativeProps({ text: value });
        inref._lastNativeText = value;
      },
      clearValue(inref) {
        inref.setNativeProps({ text: '' });
        inref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField, ref]);

  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />}
      <TInput {...rest} ref={ref} defaultValue={defaultValue} />
      {/* {error && <Error>{error}</Error>} */}
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  style: {},
  icon: null,
};

export default forwardRef(Input);
