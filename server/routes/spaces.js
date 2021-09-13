import express from 'express';

import auth from '../middleware/auth.js'
import { newSpace, delSpace, updSpace, getSpace } from '../controllers/spaces.js';

const router = express.Router();

router.post('/get', auth, getSpace);
router.post('/new', auth, newSpace);
router.post('/del', auth, delSpace);
router.post('/update', auth, updSpace);

export default router;