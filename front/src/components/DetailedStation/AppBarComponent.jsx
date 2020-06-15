import React from 'react';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function AppBarComponent(props) {
  const { children } = props;

  let history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <button className="appbar-button" onClick={handleBackClick}>
              <ArrowBackIosIcon />
            </button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container
        style={{
          // backgroundColor: '#cfe8fc',
          padding: '2rem'
        }}
      >
        {children}
      </Container>
    </React.Fragment>
  );
}
