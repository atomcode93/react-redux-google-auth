import {getName} from '../services/API/userInfos'
import history from "../services/auth/history";

let token = localStorage.getItem('access_token')
console.log("id_token;",localStorage.getItem('id_token'))
getName()


let arr = JSON.parse(localStorage.getItem('mockData'));
console.log(arr)
let data = arr===null?{
  login: '',
  firstname: '',
  lastname: '',
  picture: '', // or from an url: 'https://placeimg.com/120/120/people', // or from a relative path (NOTE: this path like public/.. may not be availaible when in dev hot reload!) './public/img/user.jpg',
  showPicture: true,
  token: ''
}:JSON.parse(localStorage.getItem('mockData'))


export let userInfosMockData = {
  login: data.login,
  firstname: data.firstname,
  lastname: data.lastname,
  picture: data.picture, // or from an url: 'https://placeimg.com/120/120/people', // or from a relative path (NOTE: this path like public/.. may not be availaible when in dev hot reload!) './public/img/user.jpg',
  showPicture: true,
  token: token
}


if(arr===null && token!==null){
  setTimeout("location.reload(true)",4000)
}
// if(userInfosMockData!==null && token==null){
//   setTimeout("location.reload(true)",3000)
// }

export default userInfosMockData;
