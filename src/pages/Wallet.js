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
    const { email } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <p data-testid="total-field">despesa geral: 0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(fetchCoins()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchToApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
