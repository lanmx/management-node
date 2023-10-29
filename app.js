var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const joi = require('joi')
const expressJWT = require('express-jwt')
const config = require('./config')
// 路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var articleRouter = require('./routes/article');
var commentRouter = require('./routes/comment');
var concernRouter = require('./routes/concern');
var messageRouter = require('./routes/message');
var menuRouter = require('./routes/menu');
var blogRouter = require('./routes/blog');
var musicRouter = require('./routes/music');
var statisticsRouter = require('./routes/statistics');


var app = express();
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Credentials',true);
  // 设置允许的请求方法
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
 
  if (req.method === 'OPTIONS') {
    // 处理预检请求
    res.sendStatus(200);
  } else {
    // 继续处理实际请求
    next();
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 在路由之前封装接口返回的函数，res.back函数
app.use(function(req, res, next) {
  // status默认值为1, 表示失败的情况
  // err可能是一个错误对象，也有可能是描述错误的字符串
  res.back = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 在路由之前配置解析token的中间件
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [
  '/users/signup','/users/login'
]}))

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/article', articleRouter);
app.use('/comment', commentRouter);
app.use('/concern', concernRouter);
app.use('/message', messageRouter);
app.use('/menu', menuRouter);
app.use('/blog', blogRouter);
app.use('/music', musicRouter);
app.use('/statistics', statisticsRouter);



// 定义错误级别中间件
app.use(function(err,req,res,next) {
  // 验证失败错误
  if(err instanceof joi.ValidationError) return res.back(err)
  // 身份认证失败错误
  if(err.name === 'UnauthorizedError') {
    return res.back('身份认证失败！', 401)
  }
  // 未知错误
  res.back(err)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
