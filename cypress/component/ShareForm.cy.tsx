// import { mount } from 'cypress/react'
import ShareForm, { IFormInputs } from '../../components/ShareForm'

const handleSubmit = async (payload: IFormInputs) => {
  console.log('testing submit func with payload:', payload);
};

const shareFormSubmitSelector = '[aria-label=share-form-submit-button]'
const shareFormTitleTextFieldSelector = '[aria-label=share-form-title-text-field]'
const shareFormURLTextFieldSelector = '[aria-label=share-form-url-text-field]'
const shareFormDescriptionTextFieldSelector = '[aria-label=share-form-description-text-field]'

describe('<ShareForm>', () => {
  it('mounts', () => {
    cy.viewport(1200, 1200)
    cy.mount(<ShareForm isLoading={false} handleSubmit={handleSubmit} />);
  })

  it('validation should work', () => {
    cy.viewport(1200, 1200);
    cy.mount(<ShareForm isLoading={false} handleSubmit={handleSubmit} />)
    cy.get(shareFormURLTextFieldSelector).type('some-invalid-url')
    cy.get(shareFormSubmitSelector).click();
    cy.get(shareFormURLTextFieldSelector).should('contain.text', "Invalid URL")
    cy.get(shareFormTitleTextFieldSelector).should('contain.text', "title must has at least 6 characters")
    cy.get(shareFormDescriptionTextFieldSelector).should('contain.text', "description must has at least 6 characters")
  })
})