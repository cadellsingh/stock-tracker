export class StorageService {
  constructor(storageManager) {
    this.storageManager = storageManager
  }

  getItem(key) {
    return this.storageManager.getItem(key)
  }

  setItem(key, value) {
    this.storageManager.setItem(key, value)
  }

  removeItem(key) {
    this.storageManager.removeItem(key)
  }
}