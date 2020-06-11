import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Spinner from '../shared/Spinner';

const Home = lazy(() => import('../pages/Home/Home'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />∫
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
