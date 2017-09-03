import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { COLORS, UNIT, UNITS_IN_PX } from '../../constants';


const propTypes = {
  size: PropTypes.number.isRequired,
  hoverScale: PropTypes.number.isRequired,
  isSeen: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func,
};

const defaultProps = {
  hoverScale: 1.2,
};

const EpisodeDot = styled.div`
  display: block;
  float: left;
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  background-color: ${props => props.isSeen
    ? COLORS.blue.primary
    : '#E4E4E4'
  };
  margin: 1px;
  transition: 250ms;

  &:hover {
    transform: scale(${props => props.hoverScale});
    transition: 0ms;
    background-color: ${props => props.isSeen
      ? COLORS.blue.dark
      : COLORS.gray.light
    };
  }
`

EpisodeDot.propTypes = propTypes;
EpisodeDot.defaultProps = defaultProps;

export default EpisodeDot;