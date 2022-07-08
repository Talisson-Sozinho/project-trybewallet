import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  GET_CURRENCIES_FOR_GLOBAL_STATE,
  SAVE_EDITED_EXPENSE,
  SAVE_NEW_EXPENSE,
} from '../actions';

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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((currentExpense) => {
        if (currentExpense.id === action.payload.id) {
          return {
            ...currentExpense,
            ...action.payload,
          };
        }
        return currentExpense;
      }),
    };
  default:
    return state;
  }
};

export default walletReducer;
