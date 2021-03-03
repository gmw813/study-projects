/*
 * @Descripttion: 
 * @Author: GENGMENGWEI
 * @Date: 2021-03-02 10:12:12
 * @LastEditTime: 2021-03-02 10:36:21
 */
var dbconf = require('../util/dbconfig')
//获取分类表
getCate = (req,res)=>{
    var sql ='select * from cate';
    var sqlArr = [];
    var callBack =(err,data)=>{
      if(err){
        console.log('连接出错了');
        return;
      }else{
        console.log('连接成功')
        res.send({
          'list':data
        })
      }
    }
  
    dbconf.sqlConnect(sql,sqlArr,callBack);
}
//获取指定分类下的文章列表
getCatePost = (req,res)=>{
    let {id} = req.query;
    var sql = 'select * from post where cate_id =?';
    var sqlArr = [id];
    var callBack =(err,data)=>{
        if(err){
          console.log('连接出错了');
          return;
        }else{
          console.log('连接成功')
          res.send({
            'list':data
          })
        }
      }
    
      dbconf.sqlConnect(sql,sqlArr,callBack);
}
module.exports = {
    getCate,
    getCatePost
}