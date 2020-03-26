import React, { useEffect, useState } from 'react';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20];

export default function Dashboard() {
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
        setAppointments([...appointments, response.data]);
      }
    }

    loadAppointments();
  }, [page]);

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
    <Background>
      <Container>
        <Title>Agendamentos</Title>
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
