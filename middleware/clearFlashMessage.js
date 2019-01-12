export default function ({ store }) {
  store.dispatch('alert/addViewCount')

  if (store.state.alert.viewCount == 1) {
    store.dispatch('alert/clear')
  }
}
