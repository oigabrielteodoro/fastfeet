import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Wrapper, Container } from './styles';

export default function AdminLayout({ children, path }) {
  return (
    <Wrapper>
      <Header path={path} />
      <Container>{children}</Container>
    </Wrapper>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
