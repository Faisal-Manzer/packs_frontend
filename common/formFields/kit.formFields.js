import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const kitFormFields = [
  {
    key: 'kit_name',
    rules: [{required: true, message: 'Please enter kit name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Kit Name',
  },
  {
    key: 'kit_info',
    rules: [{required: true, message: 'Please enter kit info!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Kit Info',
  },
  {
    key: 'components_per_kit',
    rules: [{required: true, message: 'Please enter components per kit!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Components Per Kit',
  },
  {
    key: 'kit_client',
    rules: [{required: true, message: 'Please enter kit client name!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Kit Client',
  },
];
