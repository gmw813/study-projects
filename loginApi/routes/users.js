/*
 * @Descripttion: 
 * @Author: GENGMENGWEI
 * @Date: 2021-03-01 17:00:10
 * @LastEditTime: 2021-03-02 15:34:17
 */
var express = require('express');
var router = express.Router();
var User = require('../controllers/UserController')

/* GET users listing. */
router.post('/sendCoreCode', User.sendCoreCode);
router.post('/codePhoneLogin', User.codePhoneLogin);
module.exports = router;
