describe('page load', () => {
  it('should get http://127.0.0.1:8080/', () => {
    return browser.get('http://127.0.0.1:8080/').should.be.fulfilled
  })
})
