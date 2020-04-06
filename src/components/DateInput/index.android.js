import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const dateFormatted = useMemo(
    () =>
      format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
    [date]
  );

  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date,
      mode: 'calendar',
      minDate: new Date(),
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date();

      selectedDate.setFullYear(year);
      selectedDate.setMonth(month);
      selectedDate.setDate(day);

      onChange(selectedDate);
    }
  }
  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#fff" size={24} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
};
