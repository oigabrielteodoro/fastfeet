import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Orders from '~/pages/Orders';
import Problems from '~/pages/Problems';
import Recipients from '~/pages/Recipients';
import Deliverymen from '~/pages/Deliverymen';

import CreateOrders from '~/pages/Orders/Create';
import CreateRecipients from '~/pages/Recipients/Create';
import CreateDeliverymen from '~/pages/Deliverymen/Create';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/problems" exact component={Problems} isPrivate />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />

      <Route path="/orders/create" component={CreateOrders} isEditor />
      <Route path="/recipients/create" component={CreateRecipients} isEditor />

      <Route
        path="/deliverymen/create"
        component={CreateDeliverymen}
        isEditor
      />
    </Switch>
  );
}
