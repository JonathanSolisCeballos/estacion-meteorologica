import React from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export default function BtnDelete() {
  return (
    <div className="btn-container btn-variant-delete flex-center mt-1 mr-1">
      <DeleteOutlinedIcon className="btn-icon" />
    </div>
  );
}
