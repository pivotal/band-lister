import expect from 'expect'
import * as webdriverio from 'webdriverio'

import SeleniumProcessOperator from '../helpers/SeleniumProcessOperator'
import ClientProcessOperator from '../helpers/ClientProcessOperator'

let selenium, client

before(async () => {
  console.log("Starting selenium...")
  selenium = new SeleniumProcessOperator()
  await selenium.start()

  console.log("Starting band-lister-react-redux client...")
  client = new ClientProcessOperator()
  await client.waitStart()
})

after(async () => {
  console.log("Stopping processes...")
  client.stop()
  selenium.stop()
  console.log("All processes stopped.")
})

describe('integration tests', () => {
  let browser
  beforeEach(async () => {
    browser = webdriverio.remote().init().url('http://localhost:7000')
  })

  afterEach(async () => {
    await browser.end()
  })

  it('has the correct header', async () => {
    const header = await browser.getText('h1')
    expect(header).toBe('🎸BandLister🥁')
  })

  it('displays band names in a table', async () => {
    const nameCellText = await browser.getText('.name')
    expect(nameCellText).toBe('The Beatles')
  })
})
