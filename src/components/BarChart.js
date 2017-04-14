import * as d3 from 'd3'
import Chart from './D3Bar'
import Tip from './D3Tip'

export default class BarChart extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({mode: 'closed'});
    this._root.innerHTML = `
      <style>
        :host {  }
        .chart .column { fill: RGB(230, 237, 244); }
        .chart .bar { fill: RGB(243, 42, 100); }
        .chart .axis text { font: 9px sans-serif; fill: RGB(255, 255, 255); }
        .chart .axis path,
        .chart .axis line { fill: none; stroke: RGB(230, 237, 244); stroke-width: 1.5px; shape-rendering: crispEdges; }
        .chart .axis path { display: none; }
      </style>
      <svg class="chart bar-chart"></svg>
    `;

    this.data = [{"time":0,"pm25":18},{"time":1,"pm25":18},{"time":2,"pm25":19},{"time":3,"pm25":27},{"time":4,"pm25":41},{"time":5,"pm25":46},{"time":6,"pm25":63},{"time":7,"pm25":56},{"time":8,"pm25":55},{"time":9,"pm25":57},{"time":10,"pm25":52},{"time":11,"pm25":40},{"time":12,"pm25":22},{"time":13,"pm25":22},{"time":14,"pm25":31},{"time":15,"pm25":32},{"time":16,"pm25":36},{"time":17,"pm25":24},{"time":18,"pm25":30},{"time":19,"pm25":21},{"time":20,"pm25":28},{"time":21,"pm25":26},{"time":22,"pm25":21},{"time":23,"pm25":23},{"time":0,"pm25":25}];

    const tip = new Tip({
      format: d => d3.format(',')(d.pm25)
    })

    this.chart = new Chart({
      target: this._root.querySelector('.bar-chart'),
      keys: {
        x: 'time',
        y: 'pm25'
      },
      width: 900,
      height: 300,
      axisPadding: 5,
      barPadding: 15,
      tickSize: 3,
      mouseover: tip.show.bind(tip),
      mouseout: tip.hide,
      ease: 'easeElastic',
      color: ['RGB(0, 177, 240)', 'rgb(243, 43, 101)']
    })

    this.chart.render(this.data)
  }
}
