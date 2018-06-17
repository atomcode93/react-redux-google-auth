// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import Dashboard              from './Dashboard';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,

    prezziGraphIsFetching: state.prezziGraph.isFetching,
    prezziGraphLabels:     state.prezziGraph.labels,
    prezziGraphDatasets:   state.prezziGraph.datasets,
    teamMatesIsFetching:    state.teamMates.isFetching,
    teamMates:              state.teamMates.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterHome: actions.enterHome,
        leaveHome: actions.leaveHome,

        fetchPrezziGraphDataIfNeeded:  actions.fetchPrezziGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded:     actions.fetchTeamMatesDataIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
