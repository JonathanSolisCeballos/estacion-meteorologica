import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalCreateStation({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Crear nueva nave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Una nave es una estación de control, en ella puedes controlar
            diferentes sensores que registres
            <p>
              <b>Ingresa los siguientes datos:</b>
            </p>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="descripción"
            label="Descripción"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="ubicación"
            label="Ubicación"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
