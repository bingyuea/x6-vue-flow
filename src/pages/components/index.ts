import ColorPicker from './ColorPicker/index.vue'
const componentList = {
  X6ColorPicker: ColorPicker
}
const components: any = {}
components.install = function(Vue: any, options: any) {
  for (const name in componentList) {
    // @ts-ignore
    if (name && componentList[name]) {
      // @ts-ignore
      Vue.component(name, componentList[name])
    }
  }
}

export default components
