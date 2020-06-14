import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from '../shared/Spinner';

export default function ModalCreateStation({
  open,
  setOpen,
  handleCreateStation,
  loading
}) {
  const [state, setState] = useState({
    nombre: '',
    descripción: '',
    ubicación: ''
  });

  const handleInputsChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createStation = () => {
    handleCreateStation(state, () => {
      setState({
        nombre: '',
        descripción: '',
        ubicación: ''
      });
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Crear nueva nave</DialogTitle>
        {loading ? (
          <div style={{ margin: '7rem 12rem' }}>
            <Spinner />
          </div>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>
                Una nave es una estación de control, en ella puedes controlar
                diferentes sensores que registres
              </DialogContentText>
              <DialogContentText>
                <b>Ingresa los siguientes datos:</b>
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="nombre"
                label="Nombre"
                type="text"
                fullWidth
                value={state.nombre}
                onChange={handleInputsChange}
                name="nombre"
              />
              <TextField
                margin="dense"
                id="descripción"
                label="Descripción"
                type="text"
                fullWidth
                value={state.descripción}
                onChange={handleInputsChange}
                name="descripción"
              />
              <TextField
                margin="dense"
                id="ubicación"
                label="Ubicación"
                type="text"
                fullWidth
                value={state.ubicación}
                onChange={handleInputsChange}
                name="ubicación"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={createStation}
                color="primary"
                variant="contained"
              >
                Crear
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
