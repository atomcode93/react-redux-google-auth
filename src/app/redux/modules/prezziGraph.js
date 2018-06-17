// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getPrezziGraphData
}                           from '../../services/API';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_PUN_GRAPH_DATA   = 'REQUEST_PUN_GRAPH_DATA';
const RECEIVED_PUN_GRAPH_DATA  = 'RECEIVED_PUN_GRAPH_DATA';
const ERROR_PUN_GRAPH_DATA     = 'ERROR_PUN_GRAPH_DATA';

type PrezziGraphDataset = {
  label: string,
  fillColor: string,
  strokeColor: string,
  pointColor: string,
  pointStrokeColor: string,
  pointHighlightFill: string,
  pointHighlightStroke: string,
  data: Array<number>
}


type PrezziGraphState = {
  isFetching: boolean,
  labels:     Array<string>,
  datasets:   Array<PrezziGraphDataset>,
  time:       string
};

/*
  reducer
 */
const initialState: PrezziGraphState = {
  isFetching: false,
  labels:     [],
  datasets:   [],
  time:       null
};

export default function prezziGraph(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_PUN_GRAPH_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  case 'RECEIVED_PUN_GRAPH_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      labels:     action.labels,
      datasets:   action.datasets,
      time:       action.time
    };
  case 'ERROR_PUN_GRAPH_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  default:
    return state;
  }
}


/*
  action creators
 */
export function fetchPrezziGraphDataIfNeeded() {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchPrezziData(getState())) {
      return dispatch(fetchPrezziGraphData());
    }
  };
}
function requestPrezziGraphData(time = moment().format()) {
  return {
    type:       REQUEST_PUN_GRAPH_DATA,
    isFetching: true,
    time
  };
}
function receivedPrezziGraphData(data, time = moment().format()) {
  
  var dati = {
      "labels": data.labels,
      "datasets": [
        {
          "label": "Pun",
          "fillColor": "rgba(220,220,220,0.2)",
          "strokeColor": "rgba(220,220,220,1)",
          "pointColor": "rgba(220,220,220,1)",
          "pointStrokeColor": "#fff",
          "pointHighlightFill": "#fff",
          "pointHighlightStroke": "rgba(220,220,220,1)",
          "data": data.reali
        },
        {
          "label": "Proxy",
          "borderColor" : 'rgba(0, 0, 0, 0.1)',
          "data": data.proxy
        }
      ]
  };

  //console.log(...dati.labels);

  return {
    type:       RECEIVED_PUN_GRAPH_DATA,
    isFetching: false,
    labels:     [...dati.labels],
    datasets:   [...dati.datasets],
    time
  };
}
function errorPrezziGraphData(error, time = moment().format()) {
  return {
    type:       ERROR_PUN_GRAPH_DATA,
    isFetching: false,
    error,
    time
  };
}
function fetchPrezziGraphData() {
  return dispatch => {
    dispatch(requestPrezziGraphData());
   
    getPrezziGraphData()
        .then(
        //  data => dispatch(receivedPrezziGraphData(data), console.log(data))
        data => dispatch(receivedPrezziGraphData(data))
        )
        .catch(
          error => dispatch(console.log(error))
        );
  };
}
function shouldFetchPrezziData(state) {
  const prezziGraphStore = state.prezziGraph;
  // just check wether fetching (assuming data could be refreshed and should not persist in store)
  if (prezziGraphStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
