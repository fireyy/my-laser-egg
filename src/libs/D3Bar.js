
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
  height: 130,

  // margin
  margin: { top: 15, right: 0, bottom: 35, left: 60 },

  // enable axis
  axis: true,

  // axis padding
  axisPadding: 5,

  // axis tick size
  tickSize: 10,

  // padding between bars
  barPadding: 13,

  // nice round values for axis
  nice: false,

  // custom x domain
  xDomain: null,

  // custom y domain
  yDomain: null,

  // color range
  color: null,

  // color interpolation
  colorInterpolate: d3.interpolateHcl,

  // easing function for transitions
  ease: 'easeLinear',

  // type of bar: rounded-rect, rect
  type: 'rounded',

  // mouseover callback for tooltips or value display
  mouseover: _ => {},

  // mouseout callback for tooltips or value display
  mouseout: _ => {}
}

/**
 * Zeroed margin.
 */

const zeroMargin = { top: 0, right: 0, bottom: 0, left: 0 }

/**
 * BarChart.
 */

export default class BarChart {

  /**
   * Construct with the given `config`.
   */

  constructor (config) {
    this.set(config)
    if (!this.axis) this.margin = zeroMargin
    this.init()
  }

  /**
   * Set configuration options.
   */

  set (config) {
    Object.assign(this, defaults, config)
  }

  /**
   * Dimensions without margin.
   */

  dimensions () {
    const { width, height, margin } = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom
    return [w, h]
  }

  /**
   * Handle mouseover.
   */

  onMouseOver () {
    const m = d3.mouse(this.chart.node())
    const x = this.x.invert(m[0])
    const i = this.xBisect(this.data, x, 1)
    const data = this.data[i - 1]
    this.mouseover(data)
  }

  /**
   * Handle mouseleave.
   */

  onMouseLeave () {
    this.mouseout()
  }

  /**
   * Initialize the chart.
   */

  init () {
    const { target, width, height, margin, axisPadding, tickSize, axis, keys } = this
    const { color, colorInterpolate } = this
    const [w, h] = this.dimensions()

    this.chart = d3.select(target)
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .on('mouseover', _ => this.onMouseOver())
        .on('mouseleave', _ => this.onMouseLeave())

    if (color) {
      this.color = d3.scaleLinear()
        .interpolate(colorInterpolate)
        .range(color)
    }

    this.x = d3.scaleTime()
      .range([0, w])

    this.y = d3.scaleLinear()
      .range([h, 0])

    this.xAxis = d3.axisBottom()
      .scale(this.x)
      .ticks(5)
      .tickPadding(8)
      .tickSize(tickSize)

    this.yAxis = d3.axisLeft()
      .scale(this.y)
      .ticks(3)
      .tickPadding(8)
      .tickSize(tickSize)

    if (axis) {
      this.chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${h + axisPadding})`)
        .call(this.xAxis)

      this.chart.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${-axisPadding}, 0)`)
        .call(this.yAxis)
    }

    this.xBisect = d3.bisector(d => d[keys.x]).left

    this.ease = d3[this.ease]
  }

  /**
   * Render axis.
   */

  renderAxis (data, options) {
    const { chart, x, y, xAxis, yAxis, nice, trans, color, xDomain, yDomain, keys } = this

    const yExtent = yDomain || d3.extent(data, d => d[keys.y])
    const xd = x.domain(xDomain || d3.extent(data, d => d[keys.x]))
    const yd = y.domain(yExtent)

    if (color) color.domain(yExtent)

    if (nice) {
      xd.nice()
      yd.nice()
    }

    const c = chart.transition(trans)
    c.select('.x.axis').call(xAxis)
    c.select('.y.axis').call(yAxis)
  }

  /**
   * Render bars.
   */

  renderBars (data, { animate }) {
    const { chart, x, y, trans, barPadding, type, color, keys } = this
    const [w, h] = this.dimensions()

    const width = w / data.length
    const barWidth = width - barPadding
    if (barWidth < 1) throw new Error('BarChart is too small for the amount of data provided')

    const column = chart.selectAll('.column')
        .data(data)

    column.enter() // enter
      .append('rect')
        .attr('class', 'column')
      .merge(column) // update
        .transition(trans)
          .attr('x', d => x(d[keys.x]))
          .attr('rx', type === 'rounded' ? barWidth / 2 : 0)
          .attr('ry', type === 'rounded' ? barWidth / 2 : 0)
          .attr('width', barWidth)
          .attr('height', h)

    // exit
    column.exit().remove()

    const bar = chart.selectAll('.bar')
      .data(data)

    bar.enter() // enter
      .append('rect')
        .attr('class', 'bar')
      .merge(bar) // update
        .transition(trans)
          .attr('x', d => x(d[keys.x]))
          .attr('y', d => y(d[keys.y]))
          .attr('rx', type === 'rounded' ? barWidth / 2 : 0)
          .attr('ry', type === 'rounded' ? barWidth / 2 : 0)
          .attr('width', barWidth)
          .attr('height', d => h - y(d[keys.y]))

    if (color) bar.style('fill', d => color(d[keys.y]))

    // exit
    bar.exit().remove()

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
   * Render the chart against the given `data` which should be
   * an array of objects with `bin` and `value` properties.
   */

  render (data, options = {}) {
    this.data = data

    this.trans = d3.transition()
      .duration(options.animate ? 300 : 0)
      .ease(this.ease)

    this.renderAxis(data, options)
    this.renderBars(data, options)
  }

  /**
   * Update the chart against the given `data`.
   */

  update (data, options = { animate: true }) {
    this.render(data, options)
  }
}
