// Coloque aqui suas actions
import allCoins from '../services/coinApi';

export const LOGIN = 'LOGIN';
export const LOAD_COINS = 'LOAD_COINS';

export const login = (payload) => ({ type: LOGIN, payload });
export const loadCoins = (coins) => ({ type: LOAD_COINS, coins });

export function fetchCoins() {
  return async (dispatch) => {
    const result = await allCoins();
    const keys = Object.keys(result);
    const filteredKeys = keys.filter((key) => key !== 'USDT');
    console.log(filteredKeys);
    dispatch(loadCoins(filteredKeys));
  };
}
