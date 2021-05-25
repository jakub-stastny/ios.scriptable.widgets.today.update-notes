import { CallbackURL } from './scriptable-ios.ts'

class App {
  callbackURL: CallbackURL
  constructor(baseURL) {
    this.callbackURL = new CallbackURL(baseURL)
  }
  
  parameter(key, value) {
    this.callbackURL.addParameter(key, value)
  }
  
  async result() {
    return await this.callbackURL.open()
  }
}

class Shortcut extends App {
  _name: string
  input: object
  constructor(name) {
    super('shortcuts://run-shortcut')
    this.name = name
    this.input = {}
  }

  setup() {
    if (Object.keys(this.input).length > 0) {
      this.parameter('input', JSON.stringify(this.input))
    }
  }

  set name(name) {
    this._name = name
    this.parameter('name', name)
  }

  get name() {
    return this._name
  }
  
  parameter(key, value) {
    this.callbackURL.addParameter(key, value)
  }
  
  async result() {
    this.setup()
    const result = await this.callbackURL.open()
    return result.result
  }

  get url() {
    this.setup()
    return this.callbackURL.getURL()
  }
}

const shortcutAskForTextName = "Ask for text"

const askForText = new Shortcut(shortcutAskForTextName)
// @ts-ignore
askForText.input = {prompt: 'TEST', default: 'DEF TEXT'}
//console.log(askForText.url)
const promise = askForText.result();
promise.then((result) => console.log({result}))