const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/checkAuth');
const Notes = require('../models/NotesSchema');
const User = require('../models/User');
const controller = require('../controller/dashBoardController');

//dashBoard Routes
router.get('/dashboard',controller.dashBoard);
router.get('/dashboard/add',controller.showPageForNewPost);
router.post('/dashboard/add',controller.newPost);
router.get('/dashboard/:id',controller.showUpdatePageToUpdate);
router.put('/dashboard/:id',controller.updateThePost);
router.delete('/dashboard/:id/delete',controller.deleteThePost);
module.exports = router;