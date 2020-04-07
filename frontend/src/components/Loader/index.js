import React from 'react';
import PropTypes from 'prop-types';

import { FiRotateCw } from 'react-icons/fi';

import { Container } from './styles';

export default function Loader({ loading = false }) {
  return (
    <>
      {loading && (
        <Container>
          <section>
            <FiRotateCw size={50} color="#525f7f" />
          </section>
        </Container>
      )}
    </>
  );
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
