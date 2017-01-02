const getBlurb = require('../lib/utils/getBlurb')

describe('auth', () => {
  describe('settings button', () => {
    it('should be displayed', () => {
      return $('#navbar-settings-button').isDisplayed().should.eventually.equal(true)
    })

    it('should be clicked', () => {
      return $('#navbar-settings-button').click()
    })
  })

  describe('settings modal', () => {
    it('should be displayed', () => {
      return $('#settings-modal-header').isDisplayed().should.eventually.equal(true)
    })

    describe('logout button', () => {
      it('should be displayed', () => {
        return $('#settings-modal-logout-button').isDisplayed().should.eventually.equal(true)
      })

      it('should be clicked', () => {
        return $('#settings-modal-logout-button').click()
      })
    })
  })

  describe('logout modal', () => {
    it('should be displayed', () => {
      return $('#logout-modal-header').isDisplayed().should.eventually.equal(true)
    })

    describe('cancel button', () => {
      it('should be displayed', () => {
        return $('#logout-modal-cancel-button').isDisplayed().should.eventually.equal(true)
      })

      it('should be clicked', () => {
        return $('#logout-modal-cancel-button').click()
      })
    })
  })

  describe('settings modal', () => {
    it('should be displayed', () => {
      return $('#settings-modal-header').isDisplayed().should.eventually.equal(true)
    })

    describe('logout button', () => {
      it('should be displayed', () => {
        return $('#settings-modal-logout-button').isDisplayed().should.eventually.equal(true)
      })

      it('should be clicked', () => {
        return $('#settings-modal-logout-button').click()
      })
    })
  })

  describe('logout modal', () => {
    it('should be displayed', () => {
      return $('#logout-modal-header').isDisplayed().should.eventually.equal(true)
    })

    describe('submit button', () => {
      it('should be displayed', () => {
        return $('#logout-modal-submit-button').isDisplayed().should.eventually.equal(true)
      })

      it('should be clicked', () => {
        return $('#logout-modal-submit-button').click()
      })
    })

    describe('settings modal header', () => {
      it('should be displayed', () => {
        return $('#settings-modal-header').isDisplayed().should.eventually.equal(true)
      })
    })
  })

  describe('settings modal', () => {
    it('should be displayed', () => {
      return $('#settings-modal-header').isDisplayed().should.eventually.equal(true)
    })

    describe('register button', () => {
      it('should be displayed', () => {
        return $('#settings-modal-register-button').isDisplayed().should.eventually.equal(true)
      })

      it('should be clicked', () => {
        return $('#settings-modal-register-button').click()
      })
    })
  })

  describe('register modal', () => {
    it('should be displayed', () => {
      return $('#register-modal-header').isDisplayed().should.eventually.equal(true)
    })

    describe('passphrase input', () => {
      it('should be displayed', () => {
        return $('#register-modal-passphrase-input').isDisplayed().should.eventually.equal(true)
      })

      it('type should be "password"', () => {
        return $('#register-modal-passphrase-input').getAttribute('type').should.eventually.equal('password')
      })
    })

    describe('passphrase confirmation input', () => {
      it('should be displayed', () => {
        return $('#register-modal-passphrase-confirmation-input').isDisplayed().should.eventually.equal(true)
      })

      it('type should be "password"', () => {
        return $('#register-modal-passphrase-confirmation-input').getAttribute('type').should.eventually.equal('password')
      })
    })

    describe('show passphrase checkbox', () => {
      it('should be displayed', () => {
        return $('#register-modal-show-passphrase-checkbox').isDisplayed().should.eventually.equal(true)
      })

      it('should be clicked "passphrase"', () => {
        return $('#register-modal-show-passphrase-checkbox').click()
      })

      it('should have changed passphrase input type to "text"', () => {
        return $('#register-modal-passphrase-input').getAttribute('type').should.eventually.equal('text')
      })

      it('should have changed passphrase confirmation input type to "text"', () => {
        return $('#register-modal-passphrase-confirmation-input').getAttribute('type').should.eventually.equal('text')
      })
    })

    describe('cancel button', () => {
      it('should be displayed', () => {
        return $('#register-modal-cancel-button').isDisplayed().should.eventually.equal(true)
      })
    })

    describe('submit button', () => {
      it('should be displayed', () => {
        return $('#register-modal-submit-button').isDisplayed().should.eventually.equal(true)
      })

      it('should be clicked', () => {
        return $('#register-modal-submit-button').click()
      })
    })

    describe('growl message', () => {
      it('should be displayed', () => {
        return $('.growl-item').isDisplayed().should.eventually.equal(true)
      })

      it('should be error', () => {
        return $('.growl-item').getAttribute('class').should.eventually.contain('error')
      })

      it('should have right blurb', () => {
        return $('.growl-item').getText().should.eventually.contain(getBlurb('passphrase_required'))
      })

    })

  })
})
