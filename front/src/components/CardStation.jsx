import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//Icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

//Assets
import imgGreenHouse from '../assets/greenHouse.jpg';
import BtnDelete from './BtnDelete';
import BtnEdit from './BtnEdit';

export default function CardStation({
  handleDeleteClick,
  handleEditClick,
  id,
  nombre,
  descripción,
  ubicación
}) {
  let history = useHistory();

  const handleDeleteClickId = () => {
    handleDeleteClick(id);
  };

  const handleOpenStationClick = () => {
    console.log('click on card with id', id);
    history.push(`/naves/${id}`);
  };

  return (
    <>
      <Card className="card-station-container">
        <CardActionArea onClick={handleOpenStationClick}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={imgGreenHouse}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {nombre && nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {descripción && descripción}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardContent>
          {ubicación && (
            <div className="d-flex align-items-center card-station-location">
              <LocationOnOutlinedIcon /> <span>{ubicación}</span>
            </div>
          )}
          <div className="d-flex">
            <BtnDelete handleDeleteClick={handleDeleteClickId} />
            <BtnEdit handleEditClick={handleEditClick} />
          </div>
        </CardContent>

        <CardActions className="float-right">
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleOpenStationClick}
          >
            Ver datos
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
