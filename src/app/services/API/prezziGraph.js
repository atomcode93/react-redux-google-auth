// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON
  //,
  //getLocationOrigin
}                     from '../fetchTools';


export const getPrezziGraphData = () => {
  //const url = `${getLocationOrigin()}/${appConfig.earningGraph.data.API}`;
  //const url="http://localhost:3333/grafico"
  const url="http://localhost:3009/pun/2017-11-01/2019-03-01"
  //(console.log(url)
  //const options = { };
  const options = {...defaultOptions};

  /*
  fetch("http://localhost:3009/pun/2018-01-01/2019-03-01",options)
  .then(checkStatus)
  .then(parseJSON)
  .then(data => data)
  .then(data => console.log(data))
  .catch(error => error);
*/
//  console.log(url1)
//  console.log (options)
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};
