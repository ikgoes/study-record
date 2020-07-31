const { Hashmap } = require("./hashMap.js");

test("clear test : 전체 맵이 초기화 되는지 확인한다 ", () => { 
	//given
	const hashmap = new Hashmap();
	hashmap.put("boostcamp", "javascript");
	hashmap.put("hashmap", "workforme");
	hashmap.put("cleartest", "thankyou");

	//when
	hashmap.clear();

	//then
	expect(hashmap._map).toHaveLength(0);
})

test("contain test : 해당 키가 존재하는 경우와 존재하지 않는 경우를 확인", () => { 
	//given
	const hashmap = new Hashmap();
	const [key, value] = ["boostcamp", "javascript"];
	const key1 = "hashmap";
	hashmap.put(value, key);

	//when
	const expected = hashmap.contains(key);
	const expected1 = hashmap.contains(key1);

	//then
	expect([expected, expected1]).toEqual([true,false]);
})

test("getValue test : 해당 키와 매치되는 값을 찾아주는지 확인", () => { 
	//given
	const hashmap = new Hashmap();
	const [key, value] = ["boostcamp", "javascript"];
	hashmap.put(value, key);

	//when
	const expected = hashmap.getValue(key);

	//then
	expect(expected).toEqual(value);
})

test("isEmpty test : 맵이 비어있는지 아닌지 확인", () => { 
	//given
	const hashmap = new Hashmap();
	const [key, value] = ["boostcamp", "javascript"];
	hashmap.put(value, key);

	//when
	const expected = hashmap.isEmpty();
	hashmap.remove(key);
	const expected1 = hashmap.isEmpty();

	//then
	expect([expected, expected1]).toEqual([false,true]);
})

test("keys test : 전체 키 목록을 [String] 배열로 리턴하는지 여러 경우를 확인", () => { 
	//given
	const hashmap = new Hashmap();
	const [key, value] = ["boostcamp", "javascript"];
	const [key1, value1] = ["hashmap", "workforme"];
	const [key2, value2] = ["sadface", "thankyou"];
	hashmap.put(value, key);
	hashmap.put(value1, key1);

	//when
	const expected = hashmap.keys();
	
	//then
	expect(expected).toStrictEqual([key, key1]);

	// hashmap.remove(key);
	// hashmap.remove(key1);
	// hashmap.put(value2, key2);
	// const expected1 = hashmap.keys();
	// expect(expected1).toStrictEqual([key2]);
})

test("put test : 키-값이 추가됐는지 확인", () => { 
	//given
	const hashmap = new Hashmap();
	const [key, value] = ["sadface", "thankyou"];

	//when
	hashmap.put(value, key);

	//then
	expect(hashmap.getValue(key)).toEqual(value);
})

test("remove test : 해당 키가 있는 값을 삭제하는지 확인", () => { 
	//given
	const hashmap = new Hashmap();
	const [key, value] = ["sadface", "thankyou"];
	const [key1, value1] = ["hashmap", "workforme"];
	const [key2, value2] = ["sadface", "thankyou"];
	hashmap.put(value, key);
	hashmap.put(value1, key1);
	hashmap.put(value2, key2);

	//when
	hashmap.remove(key1);

	//then
	expect(hashmap.contains(key1)).toBeFalsy();
})

test("replace test : 키-값으로 기존 값을 대체하는지 확인", () => {
	//given
	const hashmap = new Hashmap();
	const [key, value] = ["sadface", "thankyou"];
	const [key1, value1] = ["hashmap", "workforme"];
	hashmap.put(value, key);
	hashmap.put(value1, key1);

	//when
	hashmap.replace(value1, key);

	//then
	expect(hashmap.getValue(key)).toEqual(value1); 
})

test("size test : 전체 아이템 개수를 반환하는지 확인", () => { 
	//given
	const hashmap = new Hashmap();
	hashmap.put("boostcamp", "javascript");
	hashmap.put("hashmap", "workforme");
	hashmap.put("sizetest", "thankyou");
	hashmap.remove("workforme");

	//when
	const expected = hashmap.size();

	//then
	expect(expected).toEqual(2);
})