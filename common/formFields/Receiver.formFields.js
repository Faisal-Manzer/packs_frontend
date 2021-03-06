import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const receiverFormFields = [
  {
    key: 'name',
    rules: [{required: true, message: 'Please enter receiver name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver Name',
  },
  {
    key: 'city',
    rules: [{required: true, message: 'Please enter receiver city!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver City',
  },
  {
    key: 'address',
    rules: [{required: true, message: 'Please enter receiver address!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver Address',
  },
  {
    key: 'emitter',
    rules: [{required: true, message: 'Please enter emitter!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Emitter',
  },
];
