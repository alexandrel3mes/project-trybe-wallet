// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { LOAD_COINS, SEND_EXPENSES, SEND_PRICES, RMV_EXPENSE } from '../actions';

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
  case SEND_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SEND_PRICES:
    return {
      ...state,
      expenses: [...state.expenses, action.prices],
    };
  case RMV_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((exp) => exp.id !== action.expenseID)],
    };
  default:
    return state;
  }
};

export default wallet;
