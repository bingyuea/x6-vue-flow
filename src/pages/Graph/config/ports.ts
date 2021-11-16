const circle = {
  r: 5,
  magnet: true,
  stroke: '#000',
  strokeWidth: 2,
  // fill: '#FFFFFF',
  visibility: 'hidden',
}
export default {
  style: {
    default: {
      attrs: {
        circle
      }
    },
    active: {
      attrs: {
        circle: {
          ...circle,
          fillOpacity: 1,
          strokeOpacity: 1
        }
      }
    },
    inactive: {
      attrs: {
        circle: {
          ...circle,
          fillOpacity: 0,
          strokeOpacity: 0
        }
      }
    }
  }
}
