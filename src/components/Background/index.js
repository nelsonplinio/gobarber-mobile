import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Toolbar,
  Title,
  Actions,
  ActionButton,
  BackButtonIcon,
} from './styles';

export default function Background({ children, title, backButton }) {
  return (
    <Container>
      {(title || backButton) && (
        <Toolbar>
          <Actions>
            {backButton && (
              <ActionButton onPress={backButton.onPress}>
                {backButton.icon ? (
                  backButton.icon()
                ) : (
                  <BackButtonIcon name="arrow-back" size={26} color="#fff" />
                )}
              </ActionButton>
            )}
          </Actions>
          <Title>{title}</Title>
          <Actions>
            <ActionButton />
          </Actions>
        </Toolbar>
      )}

      {children}
    </Container>
  );
}

Background.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  backButton: PropTypes.shape({
    onPress: PropTypes.func,
    icon: PropTypes.func,
  }),
};

Background.defaultProps = {
  title: null,
  backButton: null,
};
