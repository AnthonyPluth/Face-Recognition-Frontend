// setup file
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key]
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }
}

global.localStorage = new LocalStorageMock()
