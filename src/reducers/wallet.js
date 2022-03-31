// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { LOAD_COINS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOAD_COINS:
    return {
      ...state,
      currencies: action.coins,
    };
  default:
    return state;
  }
};

export default wallet;
