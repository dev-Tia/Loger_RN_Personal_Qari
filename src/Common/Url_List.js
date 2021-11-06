import {getUrl} from '../../Function/Async';

const Url = async () => {
  var url = '';
  const Url_Async = async () => {
    var value = await new getUrl();
    //console.log('value =', value);
    return value;
  };
  url = await new Url_Async();
  console.log('url = ', url);
  return {
    Url_Now: url.CurrentServer,
    Axios_First: url.Qari_signin_login + 'user/auth?device=', // ? '&tel=' mac주소 + 핸드폰 번호 => 인증번호 앞 두자리 받음
    Axios_Second: url.Qari_signin_login + 'user/auth_check?device=', // ? '&tel=' '&key=' mac주소 + 핸드폰 번호 + 인증번호 => bool값 받음
    Axios_Third: url.Qari_visit + 'visit/visit?user_tel=', //?  '&nano_id=' 핸드폰 번호 + 가계정보 => 인증된 시간 돌려받음
    Qr_Check_Url: url.Qari_visit + 'store?', //? 우리 어플용 QR인지 체크함
    hero_loger: 'https://heronoah.github.io/Loger_JSON/JSON/qari/server.json',
    Notice:
      'https://heronoah.github.io/Loger_JSON/JSON/qari/person_notification.json',
    Corona_new:
      'https://api.corona-19.kr/korea/country/new/?serviceKey=d19d227e0b85c9ac7ecf2478dd802dd04',
    Corona:
      'http://api.corona-19.kr/korea/?serviceKey=d19d227e0b85c9ac7ecf2478dd802dd04',
  };
};

export default Url;
// ? http://loger.iptime.org:8001
// ? https://qari.cafe24app.com
