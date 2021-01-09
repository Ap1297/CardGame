const express = require ('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');


router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.post('/reset', ctrlUser.reset);
router.post('/forgot', ctrlUser.forgot);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.get('/getUser',ctrlUser.getUser);
router.post('/deleteUser',ctrlUser.deleteUser);
router.post('/updateUser',ctrlUser.updateUser);

module.exports = router;   