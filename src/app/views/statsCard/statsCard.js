// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  WorkProgress,
  StatsCard as StatsCardComponent
}                         from '../../components';
import Highlight          from 'react-highlight';
import history from "../../services/auth/history";

class StatsCard extends PureComponent {
  componentWillMount() {
    const { actions: { enterStatsCard } } = this.props;
    enterStatsCard();
  }


  componentDidMount() {
    let token = localStorage.getItem('access_token')
    if(token === null){
      history.replace('/login');
    }
  }

  componentWillUnmount() {
    const { actions: { leaveStatsCard } } = this.props;
    leaveStatsCard();
  }

  render() {


    return(
      <AnimatedView>
        {/* preview: */}
        <div className="row">

            <WorkProgress />

        </div>



      </AnimatedView>
    );
  }
}

StatsCard.propTypes= {
  actions: PropTypes.shape({
    enterStatsCard: PropTypes.func.isRequired,
    leaveStatsCard: PropTypes.func.isRequired
  })
};

export default StatsCard;
