// flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  StatsCard,
  PrezziGraph,
  Notifications,
  WorkProgress,
  TwitterFeed,
  TodoListDemo,
  TeamMatesDemo
}                         from '../../components';
import history from '../../services/auth/history';

class Dashboard extends PureComponent {
  static propTypes = {
    info: PropTypes.object,
    prezziGraphLabels:   PropTypes.array,
    prezziGraphDatasets: PropTypes.array,
    teamMatesIsFetching:  PropTypes.bool,
    teamMates:            PropTypes.arrayOf(
      PropTypes.shape({
        picture:      PropTypes.string,
        firstname:    PropTypes.string,
        lastname:     PropTypes.string,
        profile:      PropTypes.string,
        profileColor: PropTypes.oneOf(['danger', 'warning', 'info', 'success'])
      })
    ),
    actions: PropTypes.shape({
      enterHome: PropTypes.func,
      leaveHome: PropTypes.func,
      fetchPrezziGraphDataIfNeeded:  PropTypes.func,
      fetchTeamMatesDataIfNeeded:     PropTypes.func
    })
  };

  componentWillMount() {
    console.log('view/dashboard/dashboard/componentWillMount')
    const { actions: { enterHome } } = this.props;
    enterHome();
  }

  async componentDidMount() {
    let token = await localStorage.getItem('access_token')
    if(token === null){
      setTimeout(()=>history.replace('/login'),3000)

    }
    console.log('view/dashboard/dashboard/componentDidMount')
    const {
      actions: {
        fetchPrezziGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded
      }
    } = this.props;

    fetchPrezziGraphDataIfNeeded();
    fetchTeamMatesDataIfNeeded();


  }



  componentWillUnmount() {
    const { actions: { leaveHome } } = this.props;
    leaveHome();
    let token = localStorage.getItem('access_token')
    console.log("123",localStorage.length)
    if(token === null){
      history.replace('/login')
    }
  }

  render() {
    const {
      teamMates,
      teamMatesIsFetching,
      prezziGraphLabels,
      prezziGraphDatasets
    } = this.props;

    return(
      <AnimatedView>
        <div
          className="row"
          style={{marginBottom: '5px'}}>
          <div className="col-md-2">
            <StatsCard
              statValue={'137'}
              statLabel={'Offerte Power'}
              icon={<i className="fa fa-check-square-o" />}
              backColor={'red'}
            />
          </div>
          <div className="col-md-2">
            <StatsCard
              statValue={'50.000'}
              statLabel={'Valore Economico'}
              icon={<i className="fa fa-euro" />}
              backColor={'blue'}
            />
          </div>
          <div className="col-md-2">
            <StatsCard
              statValue={'50.000'}
              statLabel={'Margine offerte in essere'}
              textIcon={'€/Mwh'}
              icon={<i className="fa fa-euro" />}
              backColor={'violet'}
            />
          </div>
          <div className="col-md-2">
            <StatsCard
              statValue={'50.000'}
              statLabel={'Margine offerte sottoscritte'}
              icon={<i className="fa fa-euro" />}
              backColor={'green'}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <WorkProgress />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <PrezziGraph
              labels={prezziGraphLabels}
              datasets={prezziGraphDatasets}
            />
          </div>
        </div>



      </AnimatedView>
    );
  }
}

export default Dashboard;
