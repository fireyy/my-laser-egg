import * as d3 from 'd3'

/**
 * Default config.
 */

const defaults = {
  // target element or selector to contain the svg
  target: '#chart',

  keys: {
    x: 'bin',
    y: 'value'
  },

  // width of chart
  width: 500,

  // height of chart
  height: 80,

  // margin
  margin: { top: 0, right: 40, bottom: 40, left: 40 },

  // axis enabled
  axis: true,

  // axis padding
  axisPadding: 5,

  // axis tick size
  tickSize: 10,

  // nice round values for axis
  nice: false,

  // easing function for transitions
  ease: 'easeLinear',

  // dot size range, becomes height range for 'bar' type
  size: [2, 10],

  // type of chart: 'dot' or 'bar'
  type: 'dot',

  // bar padding for 'bar' type
  barPadding: 1,

  // color range
  color: ['#e6edf4', 'rgb(243, 43, 101)'],

  // color interpolation
  colorInterpolate: d3.interpolateHcl,

  // mouseover callback for tooltips or value display
  mouseover: _ => {},

  // mouseout callback for tooltips or value display
  mouseout: _ => {}
}

/**
 * Zero margin.
 */

const zeroMargin = { top: 0, right: 0, bottom: 0, left: 0 }

/**
 * DotChart.
 */

export default class DotChart {

  /**
   * Construct with the given `config`.
   */

  constructor(config) {
    this.set(config)
    if (!this.axis) this.margin = zeroMargin
    this.init()
  }

  /**
   * Set configuration options.
   */

  set(config) {
    Object.assign(this, defaults, config)
  }

  /**
   * Dimensions without margin.
   */

  dimensions() {
    const { width, height, margin } = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom
    return [w, h]
  }

  /**
   * Handle mouseover.
   */

  onMouseOver() {
    const [w, h] = this.dimensions()
    const width = w / this.data.length
    const m = d3.mouse(this.chart.node())
    const x = this.x.invert(m[0])
    const i = this.xBisect(this.data, x, 1)
    const data = this.data[i - 1]
    this.mouseover(data)
  }

  /**
   * Handle mouseleave.
   */

  onMouseLeave() {
    this.mouseout()
  }

  /**
   * Initialize the chart.
   */

  init() {
    const { target, width, height, margin, axisPadding, tickSize } = this
    const { color, colorInterpolate, size, axis, keys } = this
    const [w, h] = this.dimensions()

    this.chart = d3.select(target)
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .on('mouseover', _ => this.onMouseOver())
        .on('mouseleave', _ => this.onMouseLeave())

    this.x = d3.scaleTime()
      .range([0, w])

    this.z = d3.scaleLinear()
      .range(size)

    this.color = d3.scaleLinear()
      .range(color)
      .interpolate(colorInterpolate)

    this.xAxis = d3.axisBottom()
      .scale(this.x)
      .ticks(5)
      .tickPadding(8)
      .tickSize(tickSize)

    if (axis) {
      this.chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${h+axisPadding})`)
        .call(this.xAxis)
    }

    this.xBisect = d3.bisector(d => d[keys.x]).left
  }

  /**
   * Render axis.
   */

  renderAxis(data, options) {
    const { chart, x, xAxis, nice, ease, keys } = this

    const xd = x.domain(d3.extent(data, d => d[keys.x]))

    if (nice) {
      xd.nice()
    }

    const c = options.animate
      ? chart.transition().ease(d3[ease])
      : chart

    c.select('.x.axis').call(xAxis)
  }

  /**
   * Render dots.
   */

  renderDots(data) {
    const { chart, x, z, ease, size, color, type, barPadding, keys } = this
    const [w, h] = this.dimensions()

    const width = w / data.length

    // domains
    const zMax = d3.max(data, d => d[keys.y])
    z.domain([0, zMax])
    color.domain([0, zMax])

    // dots
    const dot = chart.selectAll('.dot')
      .data(data)

    if (type == 'bar') {
      const barWidth = (w / data.length) - barPadding
      if (barWidth < 0.5) throw new Error('DotChart is too small for the amount of data points provided')

      // enter
      dot.enter().append('rect')
        .attr('class', 'dot')
        .style('fill', d => color(d[keys.y]))
        .merge(dot)
        .transition().ease(d3[ease])
        .attr('x', d => x(d[keys.x]) + width / 2)
        .attr('y', d => h / 2 - z(d[keys.y]) / 2)
        .attr('height', d => z(d[keys.y]))
        .attr('width', barWidth)
        .style('fill', d => color(d[keys.y]))
    } else {
      // enter
      dot.enter().append('circle')
        .attr('class', 'dot')
        .style('fill', d => color(d[keys.y]))
        .merge(dot)
        .transition().ease(d3[ease])
        .attr('cx', d => x(d[keys.x]) + width / 2)
        .attr('cy', h / 2)
        .attr('r', d => z(d[keys.y]))
        .style('fill', d => color(d[keys.y]))
    }

    // exit
    dot.exit().remove()

    // overlay
    const overlay = chart.selectAll('.overlay')
      .data(data)

    // enter
    overlay.enter().append('rect')
      .attr('class', 'overlay')
      .merge(overlay)
      .attr('x', d => x(d[keys.x]))
      .attr('width', width)
      .attr('height', h)
      .style('fill', 'transparent')

    // exit
    overlay.exit().remove()
  }

  /**
   * Render the chart against the given `data` which has the shape:
   *
   *  [{ bin: Date, value: int }]
   *
   */

  render(data, options = {}) {
    this.data = data
    this.renderAxis(data, options)
    this.renderDots(data, options)
  }

  /**
   * Update the chart against the given `data`.
   */

  update(data) {
    this.render(data, {
      animate: true
    })
  }
}
