/*
 * @Descripttion: 
 * @Author: GENGMENGWEI
 * @Date: 2021-03-02 10:56:09
 * @LastEditTime: 2021-03-02 15:47:05
 */
//var dbconf = require('../util/dbconfig')
//调用阿里云插件
const Core = require('@alicloud/pop-core');
const { json } = require('body-parser');
const aliconfig = require('../util/aliconfig')
var validatePhoneaCode = [];
//配置
let Client = new Core(aliconfig.aliCloud);
let requestOption = {
    method: 'POST'
  };


//随机生成四位验证码
function rand(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

//判断手机号是否发送验证码
let sendCodeP = (phone)=>{
    for (let item of validatePhoneaCode){
        if(phone == item.phone){
            return true
        }else{
            return false
        }
    }
}

//判断手机号和验证码是否符合
let findPhoneAndCode = (phone,code)=>{
    for (let item of validatePhoneaCode){
        if(phone == item.phone && code == item.code){
            return 'login'
        }
    }
    return 'error'
}

//发送验证码
sendCoreCode = (req,res)=>{
    let phone = req.query.phone;
    let code = rand(1000,9999)
    let params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": phone,
        "SignName": "study",
        "TemplateCode": "SMS_212481649",
        "TemplateParam": JSON.stringify({'code':code}),
      }
      Client.request('SendSms', params, requestOption)
      .then((result) => {
       console.log(JSON.stringify(result));
       if(res.result == 'ok'){
           res.send({
               'code':200,
               'msg':'发送成功'
           })
       }else{
        res.send({
            'code':400,
            'msg':'发送失败'
        })
       }
    })
}
//模拟验证码发送接口
sendCode = (req,res)=>{
    let phone = req.query.phone;
    if(sendCodeP(phone)){
        res.send({
            'code':400,
            'msg':'验证码已发送，请稍后再试！'
        })
    }else{
        let code = rand(1000,9999)
        validatePhoneaCode.push({
            'phone':phone,
            'code':code
        })
        console.log(validatePhoneaCode)
        res.send({
            'code':200,
            'msg':'发送成功'
        })
        console.log(code)
    }
}

//验证码登录
codePhoneLogin = (req,res)=>{
    let {phone,code} = req.query
    if(sendCodeP(phone)){
        let status = findPhoneAndCode(phone,code)
        if(status == 'login'){
            res.send({
                'code':200,
                'msg':'登录成功'
            })
        }else if(status == 'error'){
            res.send({
                'code':400,
                'msg':'登录失败'
            })
        }
    }else{
        res.send({
            'code':400,
            'msg':'未发送验证码'
        })
    }
}

module.exports={
    sendCode,
    codePhoneLogin,
    sendCoreCode
}