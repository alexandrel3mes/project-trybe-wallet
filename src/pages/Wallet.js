import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoins } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchToApi } = this.props;
    fetchToApi();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <p data-testid="total-field">despesa geral: 0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <form>
          <label htmlFor="valor">
            Valor:
            <input type="text" data-testid="value-input" />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input type="textarea" data-testid="description-input" />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select id="currencies">
              { currencies
                .map((currencie) => <option key={ currencie }>{currencie}</option>)}
            </select>
          </label>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(fetchCoins()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchToApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
