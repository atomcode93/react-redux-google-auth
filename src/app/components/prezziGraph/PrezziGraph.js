// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import Chart          from 'chart.js';
import Panel          from '../panel/Panel';


class PrezziGraph extends PureComponent {
  static propTypes = {
    labels:   PropTypes.array,
    datasets: PropTypes.array
  };

  chart = null;
  linechart = null;

  componentDidMount() {

   // console.log('components/prezzigraph/componentDidMount');
    const { labels, datasets } = this.props;
    this.drawChart({labels, datasets});
  }

  componentWillReceiveProps(newProps) {
    console.log('components/prezzigraph/componentWillReceiveProps');
    console.log(this.props);
    const { labels, datasets } = this.props;


    console.log('newProps');
    console.log(newProps);

    //if ((newProps.labels.length > 0 && newProps.datasets.length > 0) &&
    //    (labels.length === 0 && datasets.length === 0)) {
    if ((newProps.labels.length > 0 && newProps.datasets.length > 0)) {
          console.log('DISEGNO');
      this.drawChart({
        labels: newProps.labels,
        datasets: newProps.datasets
      });
    }
  }

  render() {
    return (
      <Panel
        hasTitle={true}
        title={'Prezzi'}>
        <div className="checkbox">
                        <label>
                          <input type="checkbox" />
                          Visualizzazione per fascia
                        </label>
        </div>
        <div className="checkbox">
                        <label>
                          <input type="checkbox" />
                          Visualizzazione a tabella
                        </label>
        </div>
        <canvas
          ref={this.getCanvaRef}
          id="linechart"
          width="600"
          height="220"
        />
      </Panel>
    );
  }

  getCanvaRef = ref => (this.linechart = ref)

  drawChart(data) {
    // BAR CHART
    const options = {
      responsive : false,
      maintainAspectRatio: true
    };

    if (this.linechart) {
      this.chart = new Chart(
        this.linechart.getContext('2d'),
        {
          type: 'line',
          data,
          options
        }
      );
    }
  }
}

export default PrezziGraph;
