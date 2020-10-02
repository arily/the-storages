import storage from '../../BaseStorage'
class LocalStorageBackend extends storage {
  constructor (options) {
    super()
    this.type = 'localStorage'
    this.store = localStorage
    this.options = options
    this._options = this.options // backward compatibility for storage
    this._init()
  }

  create (options) {
    throw new Error('use constructor')
  }
}

export default LocalStorageBackend
