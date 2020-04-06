import React, { useState, useMemo, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';

import DateInput from '~/components/DateInput';
import { Container, HouerList, Hour, Title } from './styles';

export default function SelectDateTime() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const [hours, setHours] = useState([]);
  const [date, setDate] = useState(new Date());

  const provider = useMemo(() => params.provider, [params.provider]);

  useEffect(() => {
    console.tron.log(date);
    async function loadAvailable() {
      const response = await api.get(`/providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    }

    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('ConfirmAppointment', {
      time,
      provider,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HouerList
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              enabled={item.available}
              onPress={() => handleSelectHour(item.value)}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
