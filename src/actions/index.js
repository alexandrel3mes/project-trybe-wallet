// Coloque aqui suas actions
import store from '../store/index';
import allCoins from '../services/coinApi';

export const LOGIN = 'LOGIN';
export const LOAD_COINS = 'LOAD_COINS';
export const SEND_PRICES = 'SEND_PRICES';
export const RMV_EXPENSE = 'RMV_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_COMPLETE = 'EDIT_COMPLETE';

export const login = (payload) => ({ type: LOGIN, payload });
export const loadCoins = (coins) => ({ type: LOAD_COINS, coins });
export const sendPrices = (prices) => ({ type: SEND_PRICES, prices });
export const rmvExpense = (expenseID) => ({ type: RMV_EXPENSE, expenseID });
export const editExpense = (id) => ({ type: EDIT_EXPENSE, id });
export const editComplete = (editedExpense) => ({ type: EDIT_COMPLETE, editedExpense });

export function fetchCoins() {
  return async (dispatch) => {
    const result = await allCoins();
    const keys = Object.keys(result);
    const filteredKeys = keys.filter((key) => key !== 'USDT');
    dispatch(loadCoins(filteredKeys));
  };
}

export function fetchWhenAddExpenses(state) {
  return async (dispatch) => {
    const result = await allCoins();
    const rightObj = {
      exchangeRates: result,
    };
    const newObj = { ...state, ...rightObj };
    dispatch(sendPrices(newObj));
  };
}

export function editExpenses(state) {
  const getEditNumber = store.getState().wallet.editMode.toBeEdited;
  const wholeState = state;
  wholeState.id = getEditNumber;
  return async (dispatch) => {
    const result = await allCoins();
    const rightObj = {
      exchangeRates: result,
    };
    const newObj = { ...wholeState, ...rightObj };
    dispatch(editComplete(newObj));
  };
}
