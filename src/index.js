import 'normalize.css'
import './assets/style.css'
import './assets/tips.css'
import * as d3 from 'd3'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import { getTopDetail, getTopByTimeId, getTopHistory } from '@/api'
import { nowTime, am0Time, formatTime, formatDate, getAQI } from '@/utils'

var store = {}

const now = () => {
  getTopDetail(store.id).then(res => {
    let AQI = getAQI(res.pm2_5);

    document.querySelector('#now').innerHTML = `
      <h2>Now</h2>
      <ul class="inline">
        <li>
          <em>AQI</em>
          <span>${AQI}</span>
        </li>
        <li>
          <em>PM<sub>2.5</sub></em>
          <span>${res.pm2_5}</span>
        </li>
        <li>
          <em>PM<sub>10</sub></em>
          <span>${res.pm10}</span>
        </li>
      </ul>
    `;
  })
}

const today = () => {
  getTopHistory({
    mac: store.mac,
    type: 'hour',
    time: am0Time()
  }).then(res => {
    if (res.length > 24) res.pop()
    let data = res.map(_ => {
      return {
        time: formatTime(_.time),
        pm25: _.pm25
      }
    })
    document.querySelector('#today').innerHTML = `
      <h2>Today</h2>
      <line-chart value=${JSON.stringify(data)}></line-chart>
    `;
  })
}

const recent = () => {
  getTopHistory({
    mac: store.mac,
    type: 'day',
    time: nowTime()
  }).then(res => {
    let data = res.map(_ => {
      return {
        time: formatDate(_.time),
        pm25: _.pm25
      }
    })
    document.querySelector('#recent').innerHTML = `
      <h2>Recent</h2>
      <bar-chart value=${JSON.stringify(data)}></bar-chart>
    `;
  })
}

document.querySelector('#app').innerHTML = `
  <header class="layout-header">
    <h1 class="logo">My Laser Egg</h1>
    <nav>
      <ul>
        <li><a href="#now">Now</a></li>
        <li><a href="#today">Today</a></li>
        <li><a href="#recent">Recent</a></li>
      </ul>
    </nav>
  </header>
  <div class="layout-content">
    <div class="now-bg"><svg class="now-bg-svg" width="500" height="500"></svg></div>
    <section id="now"></section>
    <section id="today"></section>
    <section id="recent"></section>
  </div>
  <footer class="layout-footer">
    Laser Egg Dashboard 2017
  </footer>
`;

var svg = d3.select(".now-bg-svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    angles = d3.range(0, 2 * Math.PI, Math.PI / 200);

var path = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("fill", "none")
    .attr("stroke-width", 10)
    .attr("stroke-linejoin", "round")
  .selectAll("path")
  .data(["cyan", "magenta", "yellow"])
  .enter().append("path")
    .attr("stroke", function(d) { return d; })
    .style("mix-blend-mode", "darken")
    .datum(function(d, i) {
      return d3.radialLine()
          .curve(d3.curveLinearClosed)
          .angle(function(a) { return a; })
          .radius(function(a) {
            var t = d3.now() / 1000;
            return 200 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 32;
          });
    });

d3.timer(function() {
  path.attr("d", function(d) {
    return d(angles);
  });
});

getTopByTimeId().then((data) => {
  store = data
  now()
  today()
  recent()
})

