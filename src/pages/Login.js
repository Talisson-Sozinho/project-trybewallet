import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser as saveUserAction } from '../actions';

const MIN_LENGTH_PASSWORD = 6;
const EMAIL_REGEX = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInputValue: '',
      passwordInputValue: '',
      emailForSubmit: '',
      emailIsValid: false,
      passwordIsValid: false,
    };
    this.onChangeInputValue = this.onChangeInputValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInputValue({ target }) {
    this.setState({
      [target.name]: target.value,
    }, this.validateInput);
  }

  onSubmit(event) {
    event.preventDefault();
    const { history, saveUser } = this.props;
    const { emailForSubmit } = this.state;
    saveUser(emailForSubmit);
    history.push('/carteira');
  }

  validateInput() {
    const { emailInputValue, passwordInputValue } = this.state;

    if (passwordInputValue.length >= MIN_LENGTH_PASSWORD) {
      this.setState({ passwordIsValid: true });
    } else {
      this.setState({ passwordIsValid: false });
    }
    if (EMAIL_REGEX.test(emailInputValue)) {
      this.setState({ emailIsValid: true, emailForSubmit: emailInputValue });
    } else {
      this.setState({ emailIsValid: false, emailForSubmit: '' });
    }
  }

  render() {
    const {
      emailInputValue,
      passwordInputValue,
      emailIsValid,
      passwordIsValid,
    } = this.state;

    return (
      <form onSubmit={ this.onSubmit }>
        <input
          data-testid="email-input"
          name="emailInputValue"
          type="email"
          onChange={ this.onChangeInputValue }
          value={ emailInputValue }
        />
        <input
          data-testid="password-input"
          name="passwordInputValue"
          type="password"
          onChange={ this.onChangeInputValue }
          value={ passwordInputValue }
        />
        <button
          type="submit"
          disabled={ !(emailIsValid && passwordIsValid) }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => {
    dispatch(saveUserAction(email));
  },
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveUser: PropTypes.func.isRequired,
};
