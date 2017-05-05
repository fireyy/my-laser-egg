import 'normalize.css'
import './assets/style.css'
import './assets/tips.css'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import GaugeChart from './components/GaugeChart'
import { getTopDetail, getTopByTimeId, getTopHistory } from '@/api'
import { nowTime, am0Time, formatTime, formatDate, getAQI } from '@/utils'

var store = {}

const now = () => {
  getTopDetail(store.id).then(res => {
    let AQI = getAQI(res.pm2_5);

    document.querySelector('#now').innerHTML = `
      <h2>Now</h2>
      <gauge-chart value="0.4"></gauge-chart>
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
    <section id="now">
      <div class="loader">
        <div class="loading"></div>
      </div>
    </section>
    <section id="today">
      <div class="loader">
        <div class="loading"></div>
      </div>
    </section>
    <section id="recent">
      <div class="loader">
        <div class="loading"></div>
      </div>
    </section>
  </div>
  <footer class="layout-footer">
    Laser Egg Dashboard 2017
  </footer>
`;

getTopByTimeId().then((data) => {
  store = data
  now()
  today()
  recent()
})

