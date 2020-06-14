import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import CardStation from '../../components/CardStation';
import CardAddstation from '../../components/CardAddStation';
import { confirmDialog, errorAlert, successAlert } from '../../shared/Alerts';

import * as firebase from 'firebase';
import Spinner from '../../shared/Spinner';

let firebaseConfig = {
  apiKey: 'AIzaSyBcR8-p_zpVLnj4L3CHJPIRy2WASULsMDA',
  authDomain: 'invernadero-iot-2020.firebaseapp.com',
  databaseURL: 'https://invernadero-iot-2020.firebaseio.com',
  projectId: 'invernadero-iot-2020',
  storageBucket: 'invernadero-iot-2020.appspot.com',
  messagingSenderId: '703804415808',
  appId: '1:703804415808:web:4007936b1231f56b5a64a5',
  measurementId: 'G-2D5781M0HD'
};

firebase.initializeApp(firebaseConfig);

export default function Home() {
  const [naves, setNaves] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteClick = id => {
    // console.log('Trying to delete>', id);
    confirmDialog(
      '¿Estás seguro que deseas eliminar esta nave?',
      'Esta acción es irreversible',
      'Nave Eliminada correctamente',
      'Si esto fue un error ya puedes ponerte a llorar',
      successCallback => confirmDelete(id, successCallback)
    );
  };

  const confirmDelete = (id, successCallback) => {
    console.log('CONFIRM to delete>', id);

    firebase
      .database()
      .ref('naves/' + id)
      .remove(function(error) {
        if (error) {
          // The write failed...
          errorAlert(
            'Oops...',
            'Hubo un error al elminar la nave, intentalo de nuevo'
          );
        } else {
          // Data saved successfully!
          // console.log('DELETED');
          successCallback();
        }
      });
  };

  const updateNaves = newNaves => {
    // console.log('New naves!!', newNaves);
    setNaves(prevNaves => [...prevNaves, newNaves]);
  };

  const removeNave = idNave => {
    console.log('removing!!', idNave);
    setNaves(prevNaves => prevNaves.filter(el => el.id !== idNave));
    // let result = naves.filter(el => el.id !== idNave);
    // console.log('Result', result);
  };

  const retrieveNaves = data => {
    console.log('Retrieved naves', data);
    setNaves(data);
    setLoading(false);
  };

  const handleCreateStation = (data, clearInputsCallback) => {
    // console.log('A new nave is meant to be created with the values', data);
    postDataFirebase('naves/', data, clearInputsCallback);
  };

  const postDataFirebase = (ref, data, successCallback = () => {}) => {
    setLoadingModal(true);
    firebase
      .database()
      .ref(ref)
      .push()
      .set(data, function(error) {
        setLoadingModal(false);
        setModalOpen(false);
        if (error) {
          // The write failed...
          errorAlert(
            'Oops...',
            'Hubo un error al crear la nave, intentalo de nuevo'
          );
          console.log('error', error);
        } else {
          // Data saved successfully!
          successAlert('Nave creada correctamente', '');
          successCallback();
          console.log('Nave creada');
        }
      });
  };

  useEffect(() => {
    let navesRef = firebase.database().ref('naves/');
    navesRef.once('value', function(snapshot) {
      let data = snapshot.val();
      Object.entries(data).forEach(el => (el[1].id = el[0]));

      retrieveNaves(Object.values(data));
    });
    navesRef.on('child_added', function(snapshot) {
      // console.log('key of nave', snapshot.key);
      updateNaves(snapshot.val());
    });
    navesRef.on('child_removed', function(snapshot) {
      // console.log('key of nave', snapshot.key);
      removeNave(snapshot.key);
      console.log('Detected that a child was removed', snapshot.val());
    });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container
          maxWidth="xl"
          style={{
            backgroundColor: '#cfe8fc',
            minHeight: '100vh',
            padding: '1rem',
            display: 'flex'
          }}
          className="flex-center"
        >
          <div className="d-flex flex-wrap justify-content-center">
            {naves &&
              naves.length !== 0 &&
              naves.map &&
              naves.map((nave, indx) => (
                <CardStation
                  handleDeleteClick={handleDeleteClick}
                  nombre={nave.nombre}
                  descripción={nave.descripción}
                  ubicación={nave.ubicación}
                  id={nave.id}
                  key={indx}
                />
              ))}
            <CardAddstation
              handleCreateStation={handleCreateStation}
              loading={loadingModal}
              open={modalOpen}
              setOpen={setModalOpen}
            />
          </div>
        </Container>
      )}
    </>
  );
}
