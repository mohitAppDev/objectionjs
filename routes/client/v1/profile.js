const express = require('express');
const profileController = require('../../../controller/client/profileController');
const router = express.Router();

router.get('/getDetail', profileController.getProfile);
router.post('/upsert_profile', profileController.upsertProfile);

module.exports = router;