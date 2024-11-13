describe('Transaction add tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        Cypress.Promise.all([ // Download both fixtures
            cy.fixture('dataLogin'),
            cy.fixture('login xPath'),
            cy.fixture('links'),
        ]).then(([dataLogin, pathLogin, link]) => {
            cy.visit(link.baseURL + link.loginPage);
            cy.xpath(pathLogin.usernameField).type(dataLogin.username);
            cy.xpath(pathLogin.passwordField).type(dataLogin.password);
            cy.xpath(pathLogin.loginButton).click();
        });
    });

    afterEach(() => {
        cy.fixture('mainNavigation xPath').then((path) => {
            cy.xpath(path.headMenu).click();
            cy.xpath(path.buttonLogout).click();
            //cy.xpath(path.buttonLogoutOK).click(); //TODO crashes after that
        })
    });
    it("Adding transaction test", () => {
        Cypress.Promise.all([
            cy.fixture('homePage xPath'),
            cy.fixture('accountPage xPath'),
            cy.fixture('transfer xPath'),
            cy.fixture('transferHistory xPath')
        ]).then(([pathHome, pathAccount, pathTransfer, pathHistory]) => {
            cy.xpath(pathHome.firstAccount).click() // Click 1 account
            cy.xpath(pathAccount.transferMoneyButton).click() // Click transfer money button

            cy.xpath(pathTransfer.toAccountList).click() // Click on To acoount field
            cy.xpath(pathTransfer.toAccountSelect).click() // Click on to "account select"

            const today = new Date().toLocaleDateString('en-US'); // format date MM/DD/YYYY
            const randomNote = `${Math.random().toString(36).substring(2, 8)}`; // random text
            const randomAmount = (Math.random() * 5).toFixed(2); // number from 0.00 to 5.00

            cy.xpath(pathTransfer.fieldDate).type(today) //Enter date
            cy.xpath(pathTransfer.fieldNote).type(randomNote) //Enter note
            cy.xpath(pathTransfer.fieldAmount).type(randomAmount) //Enter amount

            cy.xpath(pathTransfer.continueButton).click() // Click on continue button
            cy.xpath(pathTransfer.doneButton).should('not.be.disabled').should('be.visible').click() // Click on done button

            cy.xpath(pathTransfer.transferHistoryGo).click() // Go to transfer history

            cy.xpath((pathHistory.lastTransfer + pathHistory.transferAmount)).invoke('text').then((amount) => {
                cy.formatNumberToPointNumber(amount).then((formattedAmount) => {
                    expect(formattedAmount).to.equal(randomAmount); // Assert amount
                });
            });

            cy.xpath((pathHistory.lastTransfer + pathHistory.transferDate)).invoke('text').then((date) => {
                expect(date.trim()).to.equal(today); // Assert date
            });

            cy.xpath((pathHistory.lastTransfer + pathHistory.transferNotes)).invoke('text').then((note) => {
                expect(note.trim()).to.equal(randomNote); // Assert note
            });
        })
    })
})
