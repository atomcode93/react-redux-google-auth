// @flow weak
let data = localStorage.getItem("access_token")


export async function getName() {
  let date;
  return await fetch('https://ragnar.eu.auth0.com/userinfo', {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then((resulte) => resulte.json())
    .then(async (resulte) => {
      date = {
        email:resulte.email,
        login: resulte.nickname,
        firstname: resulte.given_name,
        lastname: resulte.family_name,
        picture: resulte.picture, // or from an url: 'https://placeimg.com/120/120/people', // or from a relative path (NOTE: this path like public/.. may not be availaible when in dev hot reload!) './public/img/user.jpg'
      };
      console.log("mockDate", JSON.stringify(resulte))
      await localStorage.setItem('mockData', JSON.stringify(date));
    });
}

