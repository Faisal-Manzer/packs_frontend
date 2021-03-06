import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const DeliveredFormFields = [
  {
    key: 'transaction_no',
    kwargs: {
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Transaction No.',
  },
  {
    key: 'delivered',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: null,
    customLabel: 'Mark Delivered',
  },
  {
    key: 'document',
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: null,
    customLabel: 'Document',
  },
];

export const DeliveredProductFormFields = [
  {
    key: 'product',
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Product',
  },
  {
    key: 'quantity',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
  },
  {
    key: 'fault',
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Fault',
  },
];
