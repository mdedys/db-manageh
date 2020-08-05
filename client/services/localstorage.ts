function get(key: string) {
  return window.localStorage.getItem(key)
}

function set(key: string, value: string) {
  window.localStorage.setItem(key, value)
}

function del(key: string) {
  window.localStorage.removeItem(key)
}

export default {
  get,
  set,
  del,
}
