import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <>
        <Header />
        <h1>Wallet</h1>
        <WalletForm />
        <Table />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};
