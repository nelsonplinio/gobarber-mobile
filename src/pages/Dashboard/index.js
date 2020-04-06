import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, List } from './styles';

export default function Dashboard() {
  const isFocused = useIsFocused();

  const [page, setPage] = useState(1);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('/appointments', {
        params: {
          page,
        },
      });

      if (page === 1) {
        setAppointments(response.data);
      } else {
        // setAppointments([...appointments, response.data]);
      }
    }
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused, page]);

  async function handleCancel(id) {
    const response = await api.delete(`/appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background title="Agendamentos">
      <Container>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
          // onEndReachedThreshold={0.1}
          // onEndReached={() => setPage(page + 1)}
        />
      </Container>
    </Background>
  );
}
