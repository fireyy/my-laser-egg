import * as d3 from 'd3'
import Chart from '@/libs/D3Line'

export default class LineChart extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({mode: 'closed'});
    this._root.innerHTML = `
      <style>
        :host {  }
        .chart .column { fill: RGBA(255, 255, 255, 0.1); }
        .chart .line { stroke: RGB(243, 42, 100); stroke-width: 3px; fill: none; }
        .chart .axis text { font: 9px sans-serif; fill: rgba(255, 255, 255, 0.5); }
        .chart .axis path,
        .chart .axis line { fill: none; stroke: RGB(230, 237, 244); stroke-width: 1.5px; shape-rendering: crispEdges; }
        .chart .axis path { display: none; }
      </style>
      <svg class="chart line-chart"></svg>
    `;

    this.chart = new Chart({
      target: this._root.querySelector('.line-chart'),
      keys: {
        x: 'time',
        y: 'pm25'
      },
      width: 800,
      height: 208,
      xTicks: 3,
      yTicks: 3
    })
  }

  static get observedAttributes() { return ['value']; }

  attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
    if (name === 'value') {
      this.chart.render(JSON.parse(newValue))
    }
  }
}

customElements.define('line-chart', LineChart);
