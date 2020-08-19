const {
	URL
} = require("./URLDecoder.js");
const STATE_MESSAGE = [,
	"They have same scheme, username, password, host and port",
	"They have same scheme, host and port",
	"They are same from scheme to path",
	"They are same URL",
	"They are not same URL"
];

test("checking each member variable of http://admin@zum.com/#!/home?query=zum", () => {
	//given
	var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");

	//when

	//then
	expect(zumurl.scheme).toEqual("http");
	expect(zumurl.user).toEqual("admin");
	expect(zumurl.password).toEqual(undefined);
	expect(zumurl.host).toEqual("zum.com");
	expect(zumurl.port).toEqual(NaN);
	expect(zumurl.pathComponents).toEqual(['/', "#!", "home"]);
	expect(zumurl.query).toEqual("query=zum");
	expect(zumurl.isFileURL).toBeFalsy();
	expect(zumurl.absoluteString).toEqual("http://admin@zum.com/#!/home?query=zum");
})

test("checking each member variable of http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12", () => {
	//given
	var url = new URL("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12");

	//when

	//then
	expect(url.scheme).toEqual("http");
	expect(url.user).toEqual("user_name");
	expect(url.password).toEqual("pass-word");
	expect(url.host).toEqual("boostcamp.connect-foundation.or.kr");
	expect(url.port).toEqual(2020);
	expect(url.pathComponents).toEqual(["/", "first", "second", "last"]);
	expect(url.lastPathComponent).toEqual("last");
	expect(url.query).toEqual("query=ab&param=12");
	expect(url.isFileURL).toBeFalsy();
	expect(url.absoluteString).toEqual("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12");
})

test("checking file url", () =>{
	var url = new URL("file:///C:/Users/Seogki/");

	//then
	expect(url.isFileURL).toBeTruthy();
	expect(url.pathComponents).toEqual(["/","C:","Users","Seogki"]);
})

test("checking url1 : http://admin@zum.com/#!/home?query=zum", () => {
	//given
	var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");
	var url1 = new URL("http://admin@zum.com/#!/home?query=zum");

	//when
	let result = zumurl.isEqual(url1);

	//then
	expect(result).toEqual(STATE_MESSAGE[4]);
})

test("checking url2 : http://admin@zum.com/#!/home", () => {
	//given
	var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");
	var url2 = new URL("http://admin@zum.com/#!/home");

	//when
	let result = zumurl.isEqual(url2);

	//then
	expect(result).toEqual(STATE_MESSAGE[3]);
})

test("checking url3 : http://admin@zum.com/?param=zum", () => {
	//given
	var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");
	var url3 = new URL("http://admin@zum.com/?param=zum");

	//when
	let result = zumurl.isEqual(url3);

	//then
	expect(result).toEqual(STATE_MESSAGE[1]);
})

test("checking url4 : http://zum.com/#!/home", () => {
	//given
	var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");
	var url4 = new URL("http://zum.com/#!/home");

	//when
	let result = zumurl.isEqual(url4);

	//then
	expect(result).toEqual(STATE_MESSAGE[2]);
})

test("checking url5 : http://naver.com/#!/home", () => {
	//given
	var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");
	var url5 = new URL("http://naver.com/#!/home");

	//when
	let result = zumurl.isEqual(url5);

	//then
	expect(result).toEqual(STATE_MESSAGE[5]);
})

test("checking path append and delete", () => {
	//given
	var url = new URL("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12");

	//when
	url.deleteLastPathComponent();
	url.appendPathComponent("this_is_really_last");
	let result = url.pathComponents;

	//then
	expect(result).toEqual(["/","first","second","this_is_really_last"]);
})