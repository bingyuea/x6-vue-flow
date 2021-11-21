const circle = {
  r: 5,
  magnet: true,
  stroke: '#000',
  strokeWidth: 2,
  visibility: 'hidden'
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
          visibility: 'visible'
        }
      }
    },
    inactive: {
      attrs: {
        circle: {
          ...circle,
          visibility: 'hidden'
        }
      }
    }
  }
}
