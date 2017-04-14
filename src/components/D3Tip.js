import * as d3 from 'd3'

/**
 * Tip element.
 */

const el = document.createElement('div')
el.id = 'tip'
el.style.display = 'none'
document.body.appendChild(el)

const offset = (el) => {
  const tb = el.getBoundingClientRect()
  var docEl = document.documentElement
  var clientTop  = docEl.clientTop  || 0
  var clientLeft = docEl.clientLeft || 0
  var scrollTop  = window.pageYOffset || docEl.scrollTop
  var scrollLeft = window.pageXOffset || docEl.scrollLeft
  return {
    top: tb.top  + scrollTop  - clientTop,
    left: tb.left + scrollLeft - clientLeft
  }
}

/**
 * Tip.
 */

export default class Tip {

  // format function
  format (d) {
    return d.value;
  }

  /**
   * Initialize with the given `config`.
   */

  constructor (config) {
    Object.assign(this, config)
  }

  /**
   * Show tip with the given data.
   */

  show (d) {
    const t = d3.event.target
    const tb = t.getBoundingClientRect()
    const o = offset(t)
    el.textContent = this.format(d)
    el.style.display = 'block'
    el.style.top = o.top - el.offsetHeight + 'px'
    el.style.left = o.left - (el.offsetWidth / 2) + (tb.width / 2) + 'px'
    el.classList.add('show')
  }

  /**
   * Hide tip.
   */

  hide () {
    el.classList.remove('show')
  }
}
