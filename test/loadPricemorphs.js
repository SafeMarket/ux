const Pricemorph = require('pricemorph')
const Amorph = require('../lib/classes/Amorph')
const getJson = require('../modules/getJson')
const keys = require('../modules/keys')

describe('loadPricemorphs', () => {

  let quotes

  it('should get quotes as check', () => {
    return getJson(`http://www.apilayer.net/api/live?access_key=${keys.currencylayer}`).then((result) => {
      quotes = result.quotes
    })
  })

  it('should ready', () => {
    Pricemorph.ready()
    Pricemorph.isReady.should.equal(true)
  })

  it('should have [ETH, WEI, BTC, USD, EUR, CNY, GBP, JPY]', () => {
    Pricemorph.forms.should.include('ETH')
    Pricemorph.forms.should.include('WEI')
    Pricemorph.forms.should.include('BTC')
    Pricemorph.forms.should.include('USD')
    Pricemorph.forms.should.include('EUR')
    Pricemorph.forms.should.include('CNY')
    Pricemorph.forms.should.include('GBP')
    Pricemorph.forms.should.include('JPY')
  })

  it('should convert 1 ETH to 1000000000000000000 WEI', () => {
    const pricemorph = new Pricemorph(new Amorph(1, 'number'), 'ETH')
    pricemorph.to('WEI').should.amorphTo('bignumber').bignumber.equal('1000000000000000000')
  })

  it('should convert 1 USD to EUR', () => {
    const pricemorph = new Pricemorph(new Amorph(1, 'number'), 'USD')
    const priceEUR = pricemorph.to('EUR')
    const USDEUR = quotes.USDEUR
    const relativePriceNumber = (priceEUR.to('number') - USDEUR) / USDEUR
    relativePriceNumber.should.be.lessThan(0.01)
    relativePriceNumber.should.be.greaterThan(-0.01)
  })

  it('should convert 1 EUR to USD', () => {
    const pricemorph = new Pricemorph(new Amorph(1, 'number'), 'EUR')
    const priceUSD = pricemorph.to('USD')
    const EURUSD = 1 / quotes.USDEUR
    const relativePriceNumber = (priceUSD.to('number') - EURUSD) / EURUSD
    relativePriceNumber.should.be.lessThan(0.01)
    relativePriceNumber.should.be.greaterThan(-0.01)
  })

  it('should convert 1 USD to JPY', () => {
    const pricemorph = new Pricemorph(new Amorph(1, 'number'), 'USD')
    const priceJPY = pricemorph.to('JPY')
    const USDJPY = quotes.USDJPY
    const relativePriceNumber = (priceJPY.to('number') - USDJPY) / USDJPY
    relativePriceNumber.should.be.lessThan(0.01)
    relativePriceNumber.should.be.greaterThan(-0.01)
  })

})
