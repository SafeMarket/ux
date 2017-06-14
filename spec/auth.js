const getBlurb = require('../lib/utils/getBlurb')
const path = require('path')
const fs = require('fs')

const authfilePath = path.resolve(__dirname, '../generated/authfile.txt')
const authfile = fs.readFileSync(authfilePath, 'utf8').split('\n').join('')
const profileAddressHexPrefixed = '0x4d557926b0fdd955af879c3f290a45bdd4b5966e'

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

    describe('toaster message', () => {
      it('should be displayed', () => {
        return $('.toaster-item').isDisplayed().should.eventually.equal(true)
      })

      it('should be error', () => {
        return $('.toaster-item').getAttribute('class').should.eventually.contain('error')
      })

      it('should have blurb passphrase_required', () => {
        return $('.toaster-item').getText().should.eventually.contain(getBlurb('passphrase_required'))
      })
    })

    describe('passphrase input', () => {
      it('should be send keys "passphrase"', () => {
        return $('#register-modal-passphrase-input').sendKeys('passphrase').should.be.fulfilled
      })
    })

    describe('submit button', () => {
      it('should be clicked', () => {
        return $('#register-modal-submit-button').click()
      })
    })

    describe('toaster message', () => {
      it('should be displayed', () => {
        return $('.toaster-item').isDisplayed().should.eventually.equal(true)
      })

      it('should be error', () => {
        return $('.toaster-item').getAttribute('class').should.eventually.contain('error')
      })

      it('should have blurb passphrase_mismatch', () => {
        return $('.toaster-item').getText().should.eventually.contain(getBlurb('passphrase_mismatch'))
      })
    })

    describe('passphrase confirmation input', () => {
      it('should be send keys "passphrase"', () => {
        return $('#register-modal-passphrase-confirmation-input').sendKeys('passphrase').should.be.fulfilled
      })
    })

    describe('submit button', () => {
      it('should be clicked', () => {
        return $('#register-modal-submit-button').click()
      })
    })

    describe('toaster message', () => {
      it('should be displayed', () => {
        return $('.toaster-item').isDisplayed().should.eventually.equal(true)
      })

      it('should be success', () => {
        return $('.toaster-item').getAttribute('class').should.eventually.contain('success')
      })

      it('should have blurb registration_successful', () => {
        return $('.toaster-item').getText().should.eventually.contain(getBlurb('registration_successful'))
      })
    })

  })

  describe('login modal', () => {
    it('should be displayed', () => {
      return $('#login-modal-header').isDisplayed().should.eventually.equal(true)
    })

    describe('submit button', () => {
      it('should be clicked', () => {
        return $('#login-modal-submit-button').click()
      })
    })

    describe('toaster message', () => {
      it('should be displayed', () => {
        return $('.toaster-item').isDisplayed().should.eventually.equal(true)
      })

      it('should be error', () => {
        return $('.toaster-item').getAttribute('class').should.eventually.contain('error')
      })

      it('should have blurb authfile_required', () => {
        return $('.toaster-item').getText().should.eventually.contain(getBlurb('authfile_required'))
      })
    })

    describe('authfile select input', () => {
      it('should be displayed', () => {
        return $('#login-modal-authfile-input').isDisplayed().should.eventually.equal(true)
      })

      it('should be sent path to authfile', () => {
        return $('#login-modal-authfile-input').sendKeys(authfilePath)
      })
    })

    describe('authfile name', () => {
      it('should be displayed', () => {
        return $('#login-modal-authfile-name').isDisplayed().should.eventually.equal(true)
      })

      it('should be have text "authfile.txt"', () => {
        return $('#login-modal-authfile-name').getText().should.eventually.equal('authfile.txt')
      })
    })

    describe('authfile', () => {
      it('should be displayed', () => {
        return $('#login-modal-authfile').isDisplayed().should.eventually.equal(true)
      })

      it('should match authfile', () => {
        return $('#login-modal-authfile').getText().should.eventually.equal(authfile)
      })
    })

    describe('submit button', () => {
      it('should be clicked', () => {
        return $('#login-modal-submit-button').click()
      })
    })

    describe('toaster message', () => {
      it('should be displayed', () => {
        return $('.toaster-item').isDisplayed().should.eventually.equal(true)
      })

      it('should be error', () => {
        return $('.toaster-item').getAttribute('class').should.eventually.contain('error')
      })

      it('should have blurb passphrase_required', () => {
        return $('.toaster-item').getText().should.eventually.contain(getBlurb('passphrase_required'))
      })
    })

    describe('passphrase input', () => {
      it('should be displayed', () => {
        return $('#login-modal-passphrase-input').isDisplayed().should.eventually.equal(true)
      })

      it('type should be "password"', () => {
        return $('#login-modal-passphrase-input').getAttribute('type').should.eventually.equal('password')
      })

      it('type should be sent keys "pass"', () => {
        return $('#login-modal-passphrase-input').sendKeys('pass')
      })
    })

    describe('submit button', () => {
      it('should be clicked', () => {
        return $('#login-modal-submit-button').click()
      })
    })

    describe('toaster message', () => {
      it('should be displayed', () => {
        return $('.toaster-item').isDisplayed().should.eventually.equal(true)
      })

      it('should be error', () => {
        return $('.toaster-item').getAttribute('class').should.eventually.contain('error')
      })

      it('should have blurb could_not_decrypt_authfile', () => {
        return $('.toaster-item').getText().should.eventually.contain(getBlurb('could_not_decrypt_authfile'))
      })
    })

    describe('passphrase input', () => {
      it('type should be sent keys "word"', () => {
        return $('#login-modal-passphrase-input').sendKeys('word')
      })
    })

    describe('show passphrase checkbox', () => {
      it('should be displayed', () => {
        return $('#login-modal-show-passphrase-checkbox').isDisplayed().should.eventually.equal(true)
      })

      it('should be clicked "passphrase"', () => {
        return $('#login-modal-show-passphrase-checkbox').click()
      })

      it('should have changed passphrase input type to "text"', () => {
        return $('#login-modal-passphrase-input').getAttribute('type').should.eventually.equal('text')
      })

    })

    describe('submit button', () => {
      it('should be clicked', () => {
        return $('#login-modal-submit-button').click()
      })
    })

    describe('toaster message', () => {
      it('should be displayed', () => {
        return $('.toaster-item').isDisplayed().should.eventually.equal(true)
      })

      it('should be success', () => {
        return $('.toaster-item').getAttribute('class').should.eventually.contain('success')
      })

      it('should have blurb login_successful', () => {
        return $('.toaster-item').getText().should.eventually.contain(getBlurb('login_successful'))
      })
    })

  })

  describe('settings modal', () => {
    it('should be displayed', () => {
      return $('#settings-modal-header').isDisplayed().should.eventually.equal(true)
    })

    describe('profile address', () => {
      it('should be displayed', () => {
        return $('#settings-modal-profile-address').isDisplayed().should.eventually.equal(true)
      })

      it('should contain profileAddressHexPrefixed', () => {
        return $('#settings-modal-profile-address').getText().should.eventually.contain(profileAddressHexPrefixed)
      })
    })
  })
})
