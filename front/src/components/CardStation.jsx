import React from 'react';
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

export default function CardStation() {
  return (
    <>
      <Card className="card-station-container">
        <CardActionArea
          onClick={() => {
            console.log('WUU');
          }}
        >
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={imgGreenHouse}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Invenadero Chiapa
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Maiores ad nisi explicabo. Natus non id velit aut porro illum
              perspiciatis. Fugit aut quia quod perferendis. Provident animi
              velit et error sed sunt quia autem.
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardContent>
          <div className="d-flex align-items-center card-station-location">
            <LocationOnOutlinedIcon /> <span>Chiapa,Colima</span>
          </div>
          <div className="d-flex">
            <BtnDelete />
            <BtnEdit />
          </div>
        </CardContent>

        <CardActions className="float-right">
          <Button size="small" variant="outlined" color="primary">
            Ver datos
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
