import express from 'express';

import {  login } from '../controllers/user.controller.js';

const router =express.Router();

// router.get('/test', test);
//login
router.post('/login', login);

export default router; 