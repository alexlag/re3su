import 'semantic-ui-css/semantic.css';
import 'styles/main.scss';

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import Hello from 'components/Hello';

const App = ({ to }) =>
  <Container>
    <Hello to={to} />
  </Container>;

App.propTypes = {
  to: T.string.isRequired,
};

function mapStateToProps(state) {
  return {
    to: state.to,
  };
}

export default connect(mapStateToProps)(App);
