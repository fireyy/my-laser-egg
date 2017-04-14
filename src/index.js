import 'normalize.css'
import './assets/style.css'
import './assets/tips.css'
import BarChart from './components/BarChart'

customElements.define('bar-chart', BarChart);
document.querySelector('#app').innerHTML = `
  <header class="layout-header">
    <h1 class="logo">Laser Egg</h1>
    <nav>
      <ul>
        <li><a to="Home">Home</a></li>
        <li><a to="Today">Today</a></li>
        <li><a to="Weeks">Weeks</a></li>
      </ul>
    </nav>
  </header>
  <div class="layout-content">
    <h2>Today</h2>
    <bar-chart></bar-chart>
  </div>
  <footer class="layout-footer">
    Laser Egg Dashboard 2017
  </footer>
`
