import { GET_CURRENCIES_FOR_GLOBAL_STATE, SAVE_NEW_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  currentID: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_FOR_GLOBAL_STATE:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_NEW_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.currentID,
          ...action.payload,
        },
      ],
      currentID: state.currentID + 1,
    };
  default:
    return state;
  }
};

export default walletReducer;
