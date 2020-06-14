import React from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CardActionArea from '@material-ui/core/CardActionArea';
import ModalCreateStation from './ModalCreateStation';

export default function CardAddstation({
  handleCreateStation,
  loading,
  open,
  setOpen
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
      <ModalCreateStation
        open={open}
        setOpen={setOpen}
        handleCreateStation={handleCreateStation}
        loading={loading}
      />
    </>
  );
}
