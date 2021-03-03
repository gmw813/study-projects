/*
 * @Descripttion: 
 * @Author: GENGMENGWEI
 * @Date: 2021-03-01 17:00:10
 * @LastEditTime: 2021-03-02 10:39:15
 */
var express = require('express');
var router = express.Router();
var cate = require('../controllers/cateController')

/* GET home page. */
router.get('/', cate.getCate);
router.get('/getCatePost', cate.getCatePost);
module.exports = router;
