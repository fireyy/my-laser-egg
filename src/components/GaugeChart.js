import Chart from '@/libs/D3Gauge'

export default class GaugeChart extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({mode: 'closed'});
    this._root.innerHTML = `
      <style>
        :host {  }
        .chart .circle { fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .chart .background { fill: none; stroke: rgba(255, 255, 255, .2); }
        .chart .foreground { fill: none; stroke: rgb(243, 42, 100); }
        .chart .label { fill: RGB(243, 42, 100); font: 22px sans-serif; text-anchor: middle; alignment-baseline: middle; }
      </style>
      <svg class="chart gauge-chart"></svg>
    `;

    this.chart = new Chart({
      target: this._root.querySelector('.gauge-chart'),
      format: d => {
        let a = 555 * d
        if (a < 40) {
          return '优'
        } else if (a < 100) {
          return '良'
        } else {
          return '差'
        }
      },
      radius: 80,
      thickness: 10,
      ease: 'easeElastic',
      duration: 600
    })
  }

  static get observedAttributes() { return ['value']; }

  attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
    if (name === 'value') {
      this.chart.render({value: newValue})
    }
  }
}

customElements.define('gauge-chart', GaugeChart);
