import React from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CardActionArea from '@material-ui/core/CardActionArea';
import ModalCreateSensor from './ModalCreateSensor';

export default function CardAddSensor({
  handleCreateSensor,
  loading,
  open,
  setOpen,
  sensores
}) {
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <CardActionArea
        className="card-station-container card-add-station-container flex-center"
        onClick={handleClick}
      >
        <AddRoundedIcon style={{ fontSize: '6rem', fill: '#c4c4c4' }} />
      </CardActionArea>
      <ModalCreateSensor
        open={open}
        setOpen={setOpen}
        handleCreateSensor={handleCreateSensor}
        loading={loading}
        sensores={sensores}
      />
    </>
  );
}
