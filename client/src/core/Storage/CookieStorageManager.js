export class CookieStorageManager {
  constructor($cookieInstance) {
    this.$cookieInstance = $cookieInstance
  }

  getItem(key) {
    return this.$cookieInstance.get(key);
  }

  setItem(key, value, timeout = -1) {
    this.$cookieInstance.set(key, value, timeout)
  }

  removeItem(key) {
    this.$cookieInstance.remove(key)
  }
}