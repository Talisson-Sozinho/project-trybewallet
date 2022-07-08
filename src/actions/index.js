export const SAVE_USER_ON_GLOBAL_STORAGE = 'SAVE_USER_ON_GLOBAL_STORAGE';

export const saveUser = (email) => ({
  type: SAVE_USER_ON_GLOBAL_STORAGE,
  payload: email,
});

export const GET_CURRENCIES_FOR_GLOBAL_STATE = 'GET_CURRENCIES_FOR_GLOBAL_STATE';

export const getCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    const currenciesProcessed = Object.keys(currencies).filter((key) => key !== 'USDT');
    dispatch({
      type: GET_CURRENCIES_FOR_GLOBAL_STATE,
      payload: currenciesProcessed,
    });
  } catch (e) {
    console.error(e);
  }
};

export const SAVE_NEW_EXPENSE = 'SAVE_NEW_EXPENSE';

export const saveExpense = (newExpense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    const currenciesProcessed = currencies;
    dispatch({
      type: SAVE_NEW_EXPENSE,
      payload: {
        ...newExpense,
        exchangeRates: currenciesProcessed,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

export const saveEditedExpense = (expenseEdited) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: expenseEdited,
});
