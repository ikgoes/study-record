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
    const autoComplete = (url) => {
      if (DIRECTORY.test(url))
        url += '/';
      else
        DIRECTORY.test(DIRECTORY_WRONG);

      if (!(SCHEME.test(url))) {
        url = "http://".concat(url);
      } else
        SCHEME.test(SCHEME_WRONG);

      return url;
    };
    const URL_PARSER = /([^\b:$]+):(\/\/(([^\/\b:$]+):?([^:\b@$]+)?@)?([^\/\b:$]+)(:([\d]+))?)?([^\s^\?]+)(\?([^\s]+))?(#[^\s]+)?$/g
    const URLSegment = URL_PARSER.exec(autoComplete(URL));

    let path = URLSegment[9].split('/').filter(part => part !== "");
    path = ['/'].concat(path);
    const getPathComponents = () => {
      return path;
    };
    const getAbsoluteString = () => {
      let URLString = "";
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

    const checkValidity = () => {
      if (this.scheme === undefined) {
        throw "there is no scheme";
      }
      if (!this.host === undefined) {
        throw "path is incorrect";
      }
    }
    checkValidity();
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

/*
const TEST_URL = () => {
  var zumurl = new URL("http://admin@zum.com/#!/home?query=zum"); //

  var naverurl = new URL("http://m.naver.com");
  console.log(zumurl.isEqual(naverurl));

  var url1 = new URL("http://admin@zum.com/#!/home?query=zum");
  console.log(zumurl.isEqual(url1));

  var url2 = new URL("http://admin@zum.com/#!/home");
  console.log(zumurl.isEqual(url2));

  var url3 = new URL("http://admin@zum.com/?param=zum");
  console.log(zumurl.isEqual(url3));

  var url4 = new URL("http://zum.com/#!/home");
  console.log(zumurl.isEqual(url4));
}

TEST_URL(); */

module.exports = {
  URL
};