import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Spinner() {
  return (
    <div className="spinner-wrapper flex-center h-100">
      <div className="flex-center flex-col">
        <CircularProgress size={80} />
        <span className="text-lead mt-1">Cargando...</span>
      </div>
    </div>
  );
}
