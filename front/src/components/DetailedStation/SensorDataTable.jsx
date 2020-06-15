import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import BtnDelete from '../BtnDelete';
import BtnEdit from '../BtnEdit';

//components

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

function createData(
  nombre,
  id,
  tipo,
  ultimoValor,
  valorMinimo,
  msgValorMinimo,
  valorMaximo,
  msgValorMaximo,
  price
) {
  return {
    nombre,
    id,
    tipo,
    ultimoValor,
    valorMinimo,
    msgValorMinimo,
    valorMaximo,
    msgValorMaximo,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} hover={true}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nombre}
        </TableCell>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left">{row.tipo}</TableCell>
        <TableCell align="left">{row.ultimoValor}</TableCell>
        <TableCell align="left">
          <div className="d-flex">
            <div className="d-flex flex-col w-50">
              <h5>Valor mínimo</h5>
              {row.valorMinimo}
              <h5>Mensaje</h5>
              {row.msgValorMinimo}
            </div>
            <div className="d-flex flex-col w-50">
              <h5>Valor máximo</h5>
              {row.valorMaximo}
              <h5>Mensaje</h5>
              {row.msgValorMaximo}
            </div>
          </div>
        </TableCell>
        <TableCell align="left">
          <div className="d-flex">
            <BtnDelete />
            <BtnEdit />
          </div>
        </TableCell>
      </TableRow>
      <TableRow className="TEST" style={{ width: '500px' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Últimos 100 valores
              </Typography>
              <Table size="small" aria-label="Ultimos 100 valores">
                <TableBody style={{ overflowX: 'hidden' }}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Fecha
                    </TableCell>
                    <TableCell>15-06-2020</TableCell>
                    <TableCell>16-06-2020</TableCell>
                    <TableCell>17-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                    <TableCell>18-06-2020</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Valor
                    </TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>26</TableCell>
                    <TableCell>22</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>29</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  //nombre, tipo, ultimoValor, valorMinimo, msgValorMinimo,valorMaximo, msgValorMaximo, price
  createData(
    'Sensor norte',
    'ad23fmgsd',
    'Temperatura',
    25,
    15,
    'Valor minimo alcanzado',
    30,
    'Valor maximo alcanzado',
    3.99
  ),
  createData(
    'Sensor sur',
    'fsdf4',
    'Temperatura',
    23,
    18,
    'Valor minimo alcanzado',
    28,
    'Valor maximo alcanzado',
    2
  ),
  createData(
    'Sensor presion',
    'ghde4',
    'Presion',
    40,
    25,
    'Presion minimo alcanzado',
    45,
    'Presion maximo alcanzado',
    8
  )
];

export default function SensorDataTable() {
  return (
    <>
      <h2>Sensores</h2>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nombre</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Tipo&nbsp;</TableCell>
              <TableCell align="left">Último valor&nbsp;</TableCell>
              <TableCell align="left">Umbrales&nbsp;</TableCell>
              <TableCell align="left">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
