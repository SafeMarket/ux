module.exports = function getUrl(type, addr, _tabSlug) {
  const tabSlug = _tabSlug || 'about'
  switch (type) {
    case 'submarket':
      return `#/submarkets/${addr}/${tabSlug}`
    case 'store':
      return `#/stores/${addr}/${tabSlug}`
    case 'order':
      return `#/orders/${addr}`
    default:
      throw new Error(`Unkown Url Type "${type}"`)
  }
}
