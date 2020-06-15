import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
//Icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
//Assets
import imgGreenHouse from '../../assets/greenHouse.jpg';

export default function StationInfoSection({ naveData }) {
  const { id, nombre, descripción, ubicación } = naveData;

  return (
    <>
      <div className="d-flex">
        <div
          style={{
            width: '60%'
          }}
        >
          <h1 className="mb-1">{nombre || ''}</h1>
          <p className="mb-1">{descripción || ''}</p>
          <p>
            <b>ID: </b>
            {id || ''}
          </p>
          <p>
            <b>Actuador conectado: </b>Sí
          </p>
          <div className="d-flex align-items-center card-station-location mt-1">
            <LocationOnOutlinedIcon /> <span>{ubicación}</span>
          </div>
        </div>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="250"
          image={imgGreenHouse}
          title="Contemplative Reptile"
          style={{
            width: '40%',
            borderRadius: '5px'
          }}
        />
      </div>
    </>
  );
}
