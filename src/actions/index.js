// Coloque aqui suas actions
import allCoins from '../services/coinApi';

export const LOGIN = 'LOGIN';
export const LOAD_COINS = 'LOAD_COINS';
export const SEND_EXPENSES = 'SEND_EXPENSES';
export const SEND_PRICES = 'SEND_PRICES';
export const RMV_EXPENSE = 'RMV_EXPENSE';

export const login = (payload) => ({ type: LOGIN, payload });
export const loadCoins = (coins) => ({ type: LOAD_COINS, coins });
export const sendExpenses = (payload) => ({ type: SEND_EXPENSES, payload });
export const sendPrices = (prices) => ({ type: SEND_PRICES, prices });
export const rmvExpense = (expenseID) => ({ type: RMV_EXPENSE, expenseID });

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
    /* dispatch(sendExpenses(state)); */
    const result = await allCoins();
    /* const { USDT, ...rest } = result; */
    const rightObj = {
      exchangeRates: result,
    };
    const newObj = { ...state, ...rightObj };
    dispatch(sendPrices(newObj));
  };
}
