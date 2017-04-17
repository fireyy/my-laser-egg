import * as d3 from 'd3'
import Chart from '@/libs/D3Bar'
import Tip from '@/libs/D3Tip'

export default class BarChart extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({mode: 'closed'});
    this._root.innerHTML = `
      <style>
        :host {  }
        .chart .bar { fill: RGB(243, 42, 100); }
        .chart .column { fill: RGB(230, 237, 244); }
        .chart .axis text { font: 9px sans-serif; fill: RGB(255, 255, 255); }
        .chart .axis path,
        .chart .axis line { fill: none; stroke: RGB(230, 237, 244); stroke-width: 1.5px; shape-rendering: crispEdges; }
        .chart .axis path { display: none; }
      </style>
      <svg class="chart bar-chart"></svg>
    `;

    const tip = new Tip({
      format: d => d3.format(',')(d.pm25)
    })

    this.chart = new Chart({
      target: this._root.querySelector('.bar-chart'),
      keys: {
        x: 'time',
        y: 'pm25'
      },
      width: 800,
      height: 208,
      axisPadding: 5,
      barPadding: 30,
      tickSize: 3,
      mouseover: tip.show.bind(tip),
      mouseout: tip.hide,
      ease: 'easeElastic',
      color: ['RGB(0, 177, 240)', 'rgb(243, 43, 101)']
    })
  }

  static get observedAttributes() { return ['value']; }

  attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
      if (name === 'value') {
        this.chart.render(JSON.parse(newValue))
      }
  }
}

customElements.define('bar-chart', BarChart);
