var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')

var app = express()

// serve pure static assets
app.use('/', express.static('./dist'))

// proxy api requests
app.use('/topdata', proxyMiddleware({
  target: 'http://api-ios.origins-china.cn:8080',
  changeOrigin: true
}));

var port = process.env.PORT || 8080

app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})
