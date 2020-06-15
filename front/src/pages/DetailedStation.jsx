import React, { useEffect, useState } from 'react';
import AppBarComponent from '../components/DetailedStation/AppBarComponent';
import StationInfoSection from '../components/DetailedStation/StationInfoSection';
import SensorDataTable from '../components/DetailedStation/SensorDataTable';

import * as firebase from 'firebase';
import CardAddSensor from '../components/DetailedStation/CardAddSensor';

import { Line } from 'react-chartjs-2';

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function DetailedStation(props) {
  let initialData = {
    labels: [],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [25, 35]
      }
    ]
  };

  const [loadingModal, setLoadingModal] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [naveData, setNaveData] = useState({});
  const [dataFromSensor, setDataFromSensor] = useState([]);
  const [sensores, setSensores] = useState([]);
  const [data, setData] = useState(initialData);
  const id = props.match.params.id;

  const updateNaveData = data => {
    setNaveData(data);
  };

  useEffect(() => {
    console.log('id', id);

    //Firebase nave ref
    let navesRef = firebase.database().ref(`naves/${id}`);
    let sensoresRef = firebase.database().ref(`sensores/`);
    let dataRef = firebase.database().ref(`/sensores/-M9t0B98tI90oo3y51WV`);

    sensoresRef.on('value', function(snapshot) {
      let data = snapshot.val();
      data = {
        ...data,
        id: snapshot.key
      };
      setSensores(data);
      console.log('Sensores list', data);
    });

    navesRef.on('value', function(snapshot) {
      let data = snapshot.val();
      data = {
        ...data,
        id: snapshot.key
      };
      updateNaveData(data);
    });

    dataRef.on('value', function(snapshot) {
      let data = snapshot.val();
      // data = {
      //   ...data,
      //   id: snapshot.key
      // };
      // console.log('Sensor value', data);
      setDataFromSensor(data);
    });
  }, [id]);

  const handleCreateSensor = (data, clearInputsCallback) => {
    console.log('A new nave is meant to be created with the values');
  };

  useEffect(() => {
    console.log('Cmaibado el data');
    if (dataFromSensor && dataFromSensor.length !== 0) {
      let datosArray = Object.values(dataFromSensor.datos).map(el => el.dato);
      let fechaArray = Object.values(dataFromSensor.datos).map(
        el => el.createdAt
      );
      console.log(datosArray);

      var oldDataSet = data.datasets[0];
      var oldLabels = data.labels;

      var newDataSet = {
        ...oldDataSet
      };

      var newLabels = {
        ...oldLabels
      };

      newDataSet.data = datosArray;

      var newState = {
        labels: [fechaArray],
        datasets: [newDataSet]
      };

      setData(newState);

      // setData({
      //   labels: [
      //     'January',
      //     'February',
      //     'March',
      //     'April',
      //     'May',
      //     'June',
      //     'July'
      //   ],
      //   datasets: [
      //     {
      //       label: 'Sensor de temperatura',
      //       fill: false,
      //       lineTension: 0.1,
      //       backgroundColor: 'rgba(75,192,192,0.4)',
      //       borderColor: 'rgba(75,192,192,1)',
      //       borderCapStyle: 'butt',
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       borderJoinStyle: 'miter',
      //       pointBorderColor: 'rgba(75,192,192,1)',
      //       pointBackgroundColor: '#fff',
      //       pointBorderWidth: 1,
      //       pointHoverRadius: 5,
      //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      //       pointHoverBorderColor: 'rgba(220,220,220,1)',
      //       pointHoverBorderWidth: 2,
      //       pointRadius: 1,
      //       pointHitRadius: 10,
      //       data: datosArray
      //     }
      //   ]
      // });
    }
  }, [dataFromSensor]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <AppBarComponent>
        <StationInfoSection naveData={naveData} />
        <SensorDataTable />
        <CardAddSensor
          handleCreateSensor={handleCreateSensor}
          loading={loadingModal}
          open={modalAddOpen}
          setOpen={setModalAddOpen}
          sensores={sensores}
        />

        <Line data={data} />
      </AppBarComponent>
    </div>
  );
}
