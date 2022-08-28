const express = require('express');
const profileController = require('../../../controller/admin/profileController');
const router = express.Router();

router.post('/update_profile', profileController.updateProfile);
router.delete('/delete/:id', profileController.deleteProfile);

module.exports = router;