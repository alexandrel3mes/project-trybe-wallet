import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoins, fetchWhenAddExpenses } from '../actions';
import store from '../store/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      description: '',
    };
  }

  componentDidMount() {
    const { fetchToApi } = this.props;
    fetchToApi();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleEnd = () => {
    console.log(store.getState().wallet.expenses);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
    }));
  }

  render() {
    const { email, currencies, expensesDispatch, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const filtered = expenses.map((expense) => {
      const currCode = expense.currency;

      const obj = {
        value: expense.value,
        curr: Number(expense.exchangeRates[currCode].ask),
        name: expense.exchangeRates[currCode].name,
      };
      return obj;
    });

    const names = filtered.map((el) => el.name);
    const changes = filtered.map((el) => el.curr);
    const multiplied = filtered.map((el) => Number((el.value * el.curr).toFixed(2)));
    const reducer = (accumulator, curr) => accumulator + curr;
    const allValue = multiplied.reduce(reducer, 0);

    return (
      <div>
        <header>
          <h4 data-testid="email-field">{ `Email: ${email}` }</h4>
          <p data-testid="total-field">
            {`Despesa Geral: R$ ${allValue}`}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <form>
          <label htmlFor="valor">
            Valor:
            <input
              name="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="textarea"
              data-testid="description-input"
              value={ description }
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select
              id="currencies"
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
              { currencies.map((currencie) => (
                <option
                  value={ currencie }
                  key={ currencie }
                >
                  {currencie}
                </option>))}
            </select>
          </label>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ () => { expensesDispatch(this.state); this.handleEnd(); } }
          >
            Adicionar despesa
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((exp, index) => (
              <tr key={ exp.id }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{Number(exp.value).toFixed(2)}</td>
                <td>{names[index].split('/', 1)}</td>
                <td>{Number(changes[index]).toFixed(2)}</td>
                <td>{multiplied[index]}</td>
                <td>Real</td>
                <td>
                  <button type="button">
                    Editar
                  </button>
                  <button type="button" data-testid="delete-btn">
                    Excluir
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(fetchCoins()),
  expensesDispatch: (state) => dispatch(fetchWhenAddExpenses(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchToApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  expensesDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
