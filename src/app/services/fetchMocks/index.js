// @flow weak

import { appConfig }    from '../../config';
import {
  userInfosMockData,
  teamMatesMock
}                       from '../../models';




const baseURL = "http://localhost:3333/grafico/";

function makeReq(url, errorMessage = '', options = {}) {
  return fetch(url, options)
    .then(response => {
      console.log(response)
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(errorMessage);
      }
  });
}

export const getAll = () => {
  const errorMessage = 'Errore durante il download dei dati';
  return makeReq(baseURL, errorMessage);
};

export const sendSuperheroToTheServer = (superhero) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(superhero)
  };
    
  const errorMessage = 'Errore nel collegamento col server';

  return makeReq(baseURL, errorMessage, options);
};

export const deleteSuperheroFromTheServer = (superheroId) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const errorMessage = "Impossibile cancellare l'elemento dal server";

  const url = `${baseURL}/${superheroId}`;
    
  return makeReq(url, errorMessage, options);
}




export const fetchMockUserInfosData = async (
  timeToWait: number = appConfig.FAKE_ASYNC_DELAY
): Promise<any> => {
  return new Promise(
    resolve => {
      setTimeout(
        () => resolve({ token: userInfosMockData.token, data: {...userInfosMockData}}), // { token: userInfosMockData.token, data: {...userInfosMockData}}
        timeToWait
      );
    }
  );
};

export const fetchMockTeamMatesData = (
  timeToWait: number = appConfig.FAKE_ASYNC_DELAY
): Promise<any> => {
  return new Promise(
    resolve => {
      setTimeout(
        () => resolve([...teamMatesMock]),
        timeToWait
      );
    }
  );
};
