import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEditedExpense as saveEditedExpenseAction,
  saveExpense as saveExpenseAction,
} from '../actions';

const availablePaymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const availableTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: availablePaymentMethods[0],
      tagInput: availableTags[0],
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveExpense, currencies, editor, saveEditedExpense, idToEdit } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput } = this.state;

    if (editor) {
      saveEditedExpense({
        id: idToEdit,
        value: valueInput,
        description: descriptionInput,
        currency: currencyInput,
        method: methodInput,
        tag: tagInput,
      });
    } else {
      saveExpense({
        value: valueInput,
        description: descriptionInput,
        currency: currencyInput,
        method: methodInput,
        tag: tagInput,
      });
    }
    this.setState({
      valueInput: '',
      descriptionInput: '',
      currencyInput: currencies[0],
      methodInput: availablePaymentMethods[0],
      tagInput: availableTags[0],
    });
  }

  render() {
    const { currencies, editor } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value-input">
          Valor da despesa
          <input
            id="value-input"
            name="valueInput"
            data-testid="value-input"
            type="number"
            onChange={ this.onChange }
            value={ valueInput }
          />
        </label>

        <label htmlFor="description-input">
          Descrição
          <input
            id="description-input"
            name="descriptionInput"
            data-testid="description-input"
            type="text"
            onChange={ this.onChange }
            value={ descriptionInput }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda
          <select
            id="currency-input"
            name="currencyInput"
            onChange={ this.onChange }
            value={ currencyInput }
          >
            {
              currencies.map((currency) => (
                <option value={ currency } key={ currency }>{currency}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method-input">
          <select
            id="method-input"
            name="methodInput"
            data-testid="method-input"
            onChange={ this.onChange }
            value={ methodInput }
          >
            {
              availablePaymentMethods.map((paymentMethod) => (
                <option
                  value={ paymentMethod }
                  key={ paymentMethod }
                >
                  {paymentMethod}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="tag-input">
          <select
            id="tag-input"
            name="tagInput"
            data-testid="tag-input"
            onChange={ this.onChange }
            value={ tagInput }
          >
            {
              availableTags.map(
                (tag) => <option value={ tag } key={ tag }>{tag}</option>,
              )
            }
          </select>
        </label>

        <button type="submit">{ editor ? 'Editar despesa' : 'Adicionar despesa'}</button>

      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { editor, idToEdit } }) => ({
  editor,
  idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (objOfExpense) => {
    dispatch(saveExpenseAction(objOfExpense));
  },
  saveEditedExpense: (objOfExpense) => {
    dispatch(saveEditedExpenseAction(objOfExpense));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveEditedExpense: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
};

WalletForm.defaultProps = {
  editor: false,
  idToEdit: 0,
};
