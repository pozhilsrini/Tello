import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'emotion/react';

import { toggleEpisode, showEditShowModal } from '../../actions';
import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { isMobile } from '../../helpers/responsive.helpers';
import { truncateStringByWordCount } from '../../utils';
import placeholderImage from '../../images/placeholder.png';
import { ShowProps } from '../../types';

import Button from '../Button';
import EpisodeGrid from '../EpisodeGrid';
import ShowStatus from '../ShowStatus';


export class SummaryShow extends Component {
  static propTypes = {
    show: ShowProps,
    demo: PropTypes.bool,
    toggleEpisode: PropTypes.func.isRequired,
    showEditShowModal: PropTypes.func,
  }

  handleClickEpisode = (episode) => {
    const { show, toggleEpisode, demo } = this.props;

    toggleEpisode({
      demo,
      showId: show.id,
      showName: show.name,
      episodeId: episode.id,
      episodeName: episode.name,
    });
  }

  handleClickEditButton = () => {
    this.props.showEditShowModal({ showId: this.props.show.id });
  }

  render() {
    const {
      demo,
      show: { name, image, seasons, status, summary },
    } = this.props;

    // We want to show a "manage" button on hover, unless we've explicitly
    // disabled it (which we do for demo units), or unles we're on mobile
    // (TODO: Mobile solution).
    const showActions = !demo && !isMobile()

    return (
      <Wrapper>
        <ImageHeader image={image || placeholderImage}>
          {showActions && (
            <Actions data-selector="actions">
              <Button
                size="small"
                color="dark"
                onClick={this.handleClickEditButton}
              >
                Manage Show
              </Button>
            </Actions>
          )}
        </ImageHeader>

        <Body>
          <ShowName>{name}</ShowName>
          <ShowStatus status={status} />

          <Summary>
            {truncateStringByWordCount(summary, 20)}
          </Summary>
        </Body>

        <EpisodeGrid
          handleClickEpisode={this.handleClickEpisode}
          seasons={seasons}
        />
      </Wrapper>
    );
  }
}

const setBackgroundImage = ({ image }) => `url(${image})`;

const Wrapper = styled.div`
  position: relative;
  background: ${COLORS.white};

  &:hover [data-selector="actions"] {
    opacity: 1;
  }
`;

const ImageHeader = styled.header`
  position: relative;
  height: ${UNITS_IN_PX[6]};
  background-image: ${setBackgroundImage};
  background-size: cover;
  background-position: center center;
`;

const ShowName = styled.h3`
  font-size: 28px;
  letter-spacing: -1px;
  line-height: 28px;
  margin-bottom: 4px;
`;

const Body = styled.div`
  position: relative;
  z-index: 2;
  padding: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.veryDark};
`;

const Summary = styled.div`
  margin-top: ${HALF_UNIT_PX};
  font-size: 14px;
`;

const Actions = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
  opacity: 0;
  padding: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.veryDark};
  transition: opacity 600ms;
`;

const mapDispatchToProps = {
  toggleEpisode,
  showEditShowModal,
};

export default connect(null, mapDispatchToProps)(SummaryShow);
