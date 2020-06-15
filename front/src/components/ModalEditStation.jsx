import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from '../shared/Spinner';

export default function ModalEditStation({
  open,
  setOpen,
  handleEditStation,
  loading = false,
  naveData
}) {
  const [state, setState] = useState({
    nombre: '',
    descripción: '',
    ubicación: '',
    id: ''
  });
  // console.log('RENDERED MODAL EDIT');

  useEffect(() => {
    setState({
      nombre: naveData.nombre || '',
      descripción: naveData.descripción || '',
      ubicación: naveData.ubicación || '',
      id: naveData.id || ''
    });
  }, [naveData]);

  const handleInputsChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editStation = () => {
    handleEditStation(state, () => {
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
        <DialogTitle id="form-dialog-title">Editar nave</DialogTitle>
        {loading ? (
          <div style={{ margin: '7rem 12rem' }}>
            <Spinner />
          </div>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>Ingresa los nuevos datos</DialogContentText>
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
              <Button onClick={editStation} color="primary" variant="contained">
                Actualizar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
