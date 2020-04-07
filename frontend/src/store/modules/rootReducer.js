import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import admin from './admin/reducer';

export default combineReducers({ auth, user, admin });
