import React from 'react';
import Container from '@material-ui/core/Container';
import CardStation from '../../components/CardStation';
import CardAddstation from '../../components/CardAddStation';

export default function Home() {
  return (
    <div>
      <Container
        maxWidth="md"
        style={{
          // backgroundColor: '#cfe8fc',
          minHeight: '100vh',
          padding: '1rem'
        }}
      >
        <div className="d-flex">
          <CardStation />
          <CardAddstation />
        </div>
      </Container>
    </div>
  );
}
