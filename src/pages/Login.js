import React from 'react';

const MIN_LENGTH_PASSWORD = 6;
const EMAIL_REGEX = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInputValue: '',
      passwordInputValue: '',
      emailIsValid: false,
      passwordIsValid: false,
    };
    this.onChangeInputValue = this.onChangeInputValue.bind(this);
  }

  onChangeInputValue({ target }) {
    this.setState({
      [target.name]: target.value,
    }, this.validateInput);
  }

  onSubmit(event) {
    event.preventDefault();
  }

  validateInput() {
    const { emailInputValue, passwordInputValue } = this.state;

    if (passwordInputValue.length >= MIN_LENGTH_PASSWORD) {
      this.setState({ passwordIsValid: true });
    } else {
      this.setState({ passwordIsValid: false });
    }
    if (EMAIL_REGEX.test(emailInputValue)) {
      this.setState({ emailIsValid: true });
    } else {
      this.setState({ passwordIsValid: false });
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
          data-testid="email-input"
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

export default Login;
