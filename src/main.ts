import x6Editor from './App.vue'
const install = (Vue: any) => {
  Vue.component(x6Editor.name, x6Editor)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { x6Editor }
