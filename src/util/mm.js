'use strict';
var Hogan = require('hogan');
var conf = {
  serverHost : ''
};
var _mm = {
    //  网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //  请求成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //  没有登录状态，强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //  请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.status);
            }
        })
    },
    //  获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost = path;
    },
    //  获取url参数
    getUrlParam : function (name) {
    //    happymmall.com/product/list?keyword=xxx&page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        console.log(result);
        return result ? decodeURIComponent(result[2]) : null
    },
    //  渲染html模版
    renderHtml : function (htmlTemplate,data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //  成功提示
    successTips : function (msg) {
        alert(msg || "操作成功");
    },
    //  错误提示
    errorTips:function (msg) {
        alert(msg || "哪里不对了吧~~")
    },
    //  字段的验证 支持非空 手机 邮箱
    validate : function (value, type) {
        var value = $.trim(value);
        //  非空验证
        if ('require' === type) {
            return !!value;
        }
    //  手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //  邮箱验证
        if ('phone' === type) {
            return /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(value);
        }
    },
    //  统一登录处理
    doLogin: function () {
        window.location.href = './login.html?redirect' + encodeURIComponent(window.location.href);
    },
//  回到主页
    goHome : function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;