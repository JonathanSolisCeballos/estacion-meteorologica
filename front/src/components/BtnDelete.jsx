import React from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export default function BtnDelete({ handleDeleteClick }) {
  return (
    <div
      className="btn-container btn-variant-delete flex-center mt-1 mr-1"
      onClick={handleDeleteClick}
    >
      <DeleteOutlinedIcon className="btn-icon" />
    </div>
  );
}
