import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function admin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@admin/CREATE_DELIVERYMEN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@admin/CREATE_RECIPIENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@admin/CREATE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@admin/CREATE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
