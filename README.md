# my-laser-egg (WIP)

<p align="center">
  <img src="screen.png" width="700px">
</p>

> Web Dashboard for [Origins Laser Egg](http://originstech.com/products/laser-egg/) 镭豆智能空气质量检测仪

## Browser Support

Browser support [Custom Elements v1](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements)

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
Not ✘ | Latest ✔ | Not ✘ | Latest ✔ | Latest ✔ |

## First

You must configure your Laser Egg's timeId:

```bash
cd src
cp config.sample.js config.js
```

repalce `YOUR Laser Egg timeId` with your Laser Egg's timeId.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
