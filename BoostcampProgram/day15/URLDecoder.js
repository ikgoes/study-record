// URL을 정규표현식을 통해 분해 구현 코드

const DIRECTORY = /\..{2,3}$/g
const SCHEME = /^(www\.)|:/g
const DIRECTORY_WRONG = ".com/"
const SCHEME_WRONG = "asd";

class URI {
  constructor() {}
}

class URL extends URI {
  constructor(URL) {
    super();

    // URL을 파싱
    const URL_PARSER = /([^\b:$]+):(\/\/(([^\/\b:$]+):?([^:\b@$]+)?@)?([^\/\b:$]+)(:([\d]+))?)?([^\s^\?]+)(\?([^\s]+))?(#[^\s]+)?$/g
    const URLSegment = URL_PARSER.exec(this.autoComplete(URL));

    // read-only로 만들기 위한 변수 선언
    let URLString = "";
    let path = URLSegment[9].split('/').filter(part => part !== "");
    path = ['/'].concat(path);

    const getPathComponents = () => {
      return [...path];
    };

    // URL의 속성들의 존재유무를 확인하여 재구성하는 함수
    const getAbsoluteString = () => {
      URLString = "";
      URLString += this.scheme + "://";
      URLString += (this.user !== undefined) ? ((this.user) + ((this.password !== undefined) ? (":" + (this.password)) : "") + "@") : "";
      URLString += this.host;
      URLString += !isNaN(this.port) ? (":" + this.port) : "";
      URLString += this.pathComponents.reduce((acc, val, index) => {
        return acc += (index === 1) ? (val) : ("/" + val)
      });
      URLString += (this.query !== undefined) ? ("?" + this.query) : "";
      return URLString;
    };

    // 멤버 변수, pathComponents와 absoluteString는 read-only로 만들기 위해 함수 scope안에 선언
    this.scheme = URLSegment[1];
    this.user = URLSegment[4];
    this.password = URLSegment[5];
    this.host = URLSegment[6];
    this.port = parseInt(URLSegment[8]);
    this.pathComponents = getPathComponents();
    this.lastPathComponent = this.pathComponents.slice(-1)[0];
    this.query = URLSegment[11];
    this.isFileURL = (this.scheme === "file");
    this.absoluteString = getAbsoluteString();

    // 입력된 URL이 가능한지 체크, 불가능 하면 Throw를 한다.
    this.checkValidity();
  }

  checkValidity = () => {
    if (this.scheme === undefined) // scheme 존재 유무
      throw "there is no scheme";

    if (!this.host === undefined) // host 존재 유무
      throw "path is incorrect";

    if (!isNaN(this.port) && this.port >= 65536) // 포트 존재 및 사이즈 확인
      throw ("port is out of range")
  }
  // naver.com
  autoComplete = (url) => {
    if (DIRECTORY.test(url))
      url += '/';
    else
      DIRECTORY.test(DIRECTORY_WRONG);
    console.log(url);
    if (!(SCHEME.test(url)))
      url = "http://".concat(url);
    else
      SCHEME.test(SCHEME_WRONG);

    return url;
  }

  appendPathComponent = (path) => {
    this.pathComponents.push(path);
  }

  deleteLastPathComponent = () => {
    this.pathComponents.length--;
  }

  isEqual = (testingURL) => {
    const STATE_MESSAGE = [, "They have same scheme, username, password, host and port", "They have same scheme, host and port", "They are same from scheme to path", "They are same URL", "They are not same URL"];
    let CONDITION = 0;
    if (testingURL.absoluteString === this.absoluteString) CONDITION = 4;
    else {
      if (testingURL.scheme === this.scheme && testingURL.host === this.host) {
        CONDITION = 2;
        if (testingURL.user === this.user && testingURL.password === this.password) {
          CONDITION = 1;
          if (this.pathComponents.every((value, index) => {
              return (value === testingURL.pathComponents[index]);
            }))
            CONDITION = 3;
        }
      }
      CONDITION = CONDITION || 5;
    }
    return STATE_MESSAGE[CONDITION];
  }
}

module.exports = {
  URL
};