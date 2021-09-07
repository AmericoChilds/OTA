import {combineReducers} from 'redux';

import posts from './posts';
import auth from './auth';
import space from './space';

export default combineReducers({posts, auth, space})