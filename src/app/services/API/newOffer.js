let arr = JSON.parse(localStorage.getItem('mockData'));
let data = arr===null?{
  email: '',
}:JSON.parse(localStorage.getItem('mockData'))

//const URL_NEWOFFER = 'http://localhost:8082/dboff';
//const URL_NEWOFFERList = 'http://localhost:8082/dblistaOff/';
const URL_NEWOFFER = 'http://localhost:3009/offertanew/'+data.email;
const URL_NEWOFFERList = 'http://localhost:3009/offerte/'+data.email;

export async function getOffer() {
  //localStorage.getItem('mockData')
  console.log('ci passo x');
  //console.log(localStorage.getItem('mockData'));
  console.log(URL_NEWOFFER);
  //console.log('ci passo y');

  return await fetch(URL_NEWOFFER)
    .then((resulte) => resulte.json())
    ;
}
export async function getOfferList(value) {

  return await fetch(URL_NEWOFFERList+'/1' + (value ? '/'+value: ''))
    .then((resulte) => resulte.json())
    ;
}
export async function gpostOfferList() {
  return await fetch(URL_NEWOFFER,{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "offerte": [
        {
          "kam":'123'
        }
      ],
    })
  })
  getOffer()
}
