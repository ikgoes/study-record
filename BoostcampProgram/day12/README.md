# 미션1

```mysql
drop table if exists user_log;
CREATE TABLE user_log(
	nickname varchar(64) primary key,
	money dec(10, 2),
    last_visit datetime
);
```
를 이용하여 MySQL에서

`make_user.js` 파일을 통하여 1,000,000명의 user를 랜덤하게 생성하여 `.csv` 파일을 만든 한 후에,

생성된 파일을 도커로 이동시킨 후, MySQL에서 업로드하였습니다.

# 미션2

```mysql
drop table if exists user;
create table user (
	id int primary key auto_increment,
    start datetime not null,
    end datetime
);

drop table if exists eart;
create table seat(
	id tinyint primary key auto_increment,
    userid int,
    foreign key (userid) references user(id)
);
```

위와 같이 조건에 맞는 테이블 스키마를 작성 작성하였고,

`startInternetCafe.js` 를 통해 자리와 사용자가 들어갈 테이블을 생성한 후,
`InternetCafe.js` 를 통하여 사용자들을 자리에 넣어주었습니다.
