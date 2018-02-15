import { OPEN_MODAL, CLOSE_MODAL } from './Types.js';

export const OpenModal = () => ({
  type: OPEN_MODAL,
  open: true
});

export const CloseModal = () => ({
  type: CLOSE_MODAL,
  open: false
});
