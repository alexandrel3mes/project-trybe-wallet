// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  LOAD_COINS,
  SEND_PRICES,
  RMV_EXPENSE,
  EDIT_EXPENSE,
  EDIT_COMPLETE,
} from '../actions';

const INITIAL_STATE = {
  editMode: {
    edit: false,
    toBeEdited: 0,
  },
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
  case EDIT_EXPENSE:
    return {
      ...state,
      editMode: {
        edit: true,
        toBeEdited: action.id,
      },
    };
  case EDIT_COMPLETE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((ex) => ex.id !== action.editedExpense.id),
        action.editedExpense,
      ],
      editMode: {
        edit: false,
        toBeEdited: state.editMode.toBeEdited,
      },
    };
  default:
    return state;
  }
};

export default wallet;
