/*
 * @Descripttion: 
 * @Author: GENGMENGWEI
 * @Date: 2021-03-02 09:11:25
 * @LastEditTime: 2021-03-02 10:25:50
 */
const mysql  = require('mysql')
//数据库配置
const config = {
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'express'
    };
//连接数据库
//使用mysql的连接池
//连接池对象

var pool = mysql.createPool(config);
module.exports = {
    sqlConnect:function(sql,sqlArr,callBack){
        //这里把连接池放到外面是因为放在里面每连接一次就创建一次，创建太多的话会出错
        // var pool = mysql.createPool(config);
        pool.getConnection((err,conn)=>{
            console.log('连接中')
            if(err){
                console.log('连接失败');
                return;
            }
            //事件驱动回调
            conn.query(sql,sqlArr,callBack);
            //释放连接
            conn.release()
        })
    }
}