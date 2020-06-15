import React from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

export default function BtnEdit({ handleEditClick }) {
  return (
    <div
      className="btn-container btn-variant-edit flex-center mt-1"
      onClick={handleEditClick}
    >
      <EditOutlinedIcon className="btn-icon" />
    </div>
  );
}
