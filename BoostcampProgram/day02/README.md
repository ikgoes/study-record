미션 1 : 가상 환경 설치하기
==

- **각자 컴퓨터 환경에서 사용할 수 있는 가상 환경(Virtual Machine)에서 리눅스 운영체제를 설치한다. (권장 설치 운영체제 : ubuntu 18.04)**

가상 환경울 구성하기 위해, 오라클에서 무료로 제공하는 [VirtualBox](https://www.virtualbox.org)를 이용하여 설치하였고, ubuntu 버전은 20.04를 이용하였다.


- **가상 환경에 원격으로 접속할 수 있도록 ssh 설정을 하고**

원격 접속을 하기 위해서는 SSH를 필요로 한다.
여기서 SSH(Secure Shell Protocol) 컴퓨터와 컴퓨터가 인터넷과 같은 네트워크를 통해 보안을 가지고 안전하기 통신하기 위해 사용되는 프로토콜이다.

1. 데이터전송
2. 원격제어 

이 두 가지 이유가 SSH를 사용하는 이유인데, SSH를 이용하여 데이터을 전송하고, AWS와 같은 클라우드 서비스를 이용할 때 AWS의 인스턴스 서버에 접속하여 명령을 내리기 위해 SSH를 통해 접속을 한다. (FTP와 같은 프로토콜도 있지만 **보안** 때문에 SSH를 활용한다.)

        sudo apt-get install ssh
        sudo apt-get install openssh-server

를 통해 우분투에서 SSH를 설치하고,

![screeni][logo]

[logo]:https://s3.us-west-2.amazonaws.com/secure.notion-static.com/58e01553-1e56-49f8-8a13-6c28345f9eea/Day02-1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200728%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200728T123334Z&X-Amz-Expires=86400&X-Amz-Signature=e716218d8e1f58c36a2010c09ebb10f004f44457d21e850bfa7f21081b7f9a7d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Day02-1.png%22 "image1"

포트포워딩을 통해 로컬과 연결을 하기 위해
        `ifconfig`
를 활용하여 네트워크 디바이스 파일인 (enp0s3)에서 inet address에서 IP를 얻어었고
로컬의 IP는 `ipconfig`를 통해 확인할 수 있었습니다.

이후, VirtualBox에서 설치된 우분투에 대한 포트포워딩을 진행하였습니다.

![screeni][logo1]

[logo1]:https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6e299d66-9907-41cf-9ca2-d8094d4812cc/Day02-2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200728%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200728T123350Z&X-Amz-Expires=86400&X-Amz-Signature=4147b6e20a2b59f0f7d413dda2cafc2a8a81a3c3f0cc710205f78b6c1a0fea17&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Day02-2.png%22 "image2"

로컬에서는 푸티(PuTTY)를 이용하여 접속을 할 수 있었습니다.

[출처]

https://baked-corn.tistory.com/52

https://itrainbowm.tistory.com/7

http://parkjuwan.dothome.co.kr/wordpress/2017/07/08/virtualbox-linux-ssh/

- **root 계정 이외에 본인 접속할 계정을 추가한다. 본인 계정에 대한 패스워드를 설정한다.**


root 계정 이외에 본인 접속할 계정을 추가하는 방법은 가상머신의 우분투에서 루트 계정으로

        adduser NAME
        passwd NAME       

을 통해 `NAME`을 가진 계정을 생성하였고, `passwd NAME`으로 그 계정의 패스워드를 설정할 수 있었습니다.

- **로컬 컴퓨터에서 가상 환경 리모트 컴퓨터에 ssh로 접속해서 본인 계정으로 로그인한다.**

이 과정을 통해, PuTTY에서 방금 생성한 계정으로 로그인 하여 가상 환경 리모트 컴퓨터로 접속할 수 있었습니다.

![screeni][logo2]

[logo2]:https://s3.us-west-2.amazonaws.com/secure.notion-static.com/13c19cdc-11d6-4e4c-9ba7-ecce00576207/Day02-3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200728%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200728T123407Z&X-Amz-Expires=86400&X-Amz-Signature=42ddbe67be8129c681671592cf03ccb40bfec9933f4da6fd531f88961d2c9aa5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Day02-3.png%22 "image3"

[출처]

https://jhnyang.tistory.com/10

- **본인 계정에서 `/backup` 디렉토리를 생성하고 `764` 모드로 접근 권한을 바꿔서, 본인 계정으로 쓸 수 있도록 설정한다.**

본인 계정에서 `/backup` 디렉토리를 생성하려고 하였으나, 새롭게 만든 계정의 홈 디렉토리가 존재하지 않아, 우선 홈 디렉토리를 수동으로 생성하였습니다.

![screeni][logo3]

[logo3]:https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d0e60660-9f2e-41fc-a0e6-ab4570dde757/Day02-4.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200728%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200728T123432Z&X-Amz-Expires=86400&X-Amz-Signature=b375a4faba13ecce8efdf7cc885a6a664dd09d5b054e650372a8491d259fc383&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Day02-4.png%22 "image4"

        $ sudo mkdir /home/seogki
        $ sudo chown seogki.seogki /home/seogki 

계정의 홈 디렉토리를 생성해준 후에 디렉토리의 소유자를 계정이 갖도록 변경 하였습니다. 하지만, 아직 원래 계정이라면 가지고 있어야 할 계정 정보에 관한 숨김파일 및 디렉토리들이 없으므로 

        $ cd /home/seogki
        $ sudo cp -r /etc/skel/. .
        $ sudo chown -R seogki.seogki .

계정 정보에 관한 숨김파일과 디렉토리는 `/etc/skel`에 담겨져 있어 `-r` 옵션을 이용하여 내부 파일들을 현재 디렉토리인 홈 디렉토리로 옮겨주었습니다. 
(`/etc` 내용은 root가 접근할 수 있으므로 `sudo` 명령어로 권한을 강제하여 복사하였습니다.)

        $ chmod 764 /home/seogki // wrxwr-w--를 뜻한다. 
를 추가로 사용하여 사용권한을 변경할 수 있다.

[출처]

https://serverfault.com/questions/63764/create-home-directories-after-create-users
- **리눅스를 설치하고 가상 환경에서 터미널을 열고 date 날짜를 오늘 날짜로 출력한 상태로, 화면을 캡처한다.**

![screeni][logo4]

[logo4]:https://s3.us-west-2.amazonaws.com/secure.notion-static.com/13b25edb-86c9-4744-8840-7c1b1e63b4e8/Day02-5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200728%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200728T123444Z&X-Amz-Expires=86400&X-Amz-Signature=c960d020bd3c0fb17a618be48522477b0a55e8e576e09ad05a7c978d24fa5788&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Day02-5.png%22 "image5"

미션 2 : 쉘 스크립트
==

- **내 PC의 특정한 디렉토리 아래 `day1` 부터 `day16`까지 문제 해결을 저장한 디렉토리가 있다고 가정한다.**

- **각 디렉토리 아래에는 작업한 소스 파일들이 들어있다. 작업한 소스는 `a.cs` 처럼 파일 내용은 없어도 되고, 확장자가 `cs`로 끝난다. `bash` 셀 스크립트로 현재 디렉토리 아래있는 `day1`에서 `day16` 디렉토리 중에서 있는 `.cs` 파일만 `zip`으로 압축해서 백업하는 스크립트를 자동화해서 구현한다.**

- **스크립트 진행 도중에 `.cs` 파일이 없는 디렉토리가 있으면, 어느 디렉토리가 없는지 문구를 출력한다.**

- **예를 들어 `day7/` 경로 아래 `.cs` 파일이 없으면 `day7 is empty` 같은 문구를 출력할 수 있다.**

- **스크립트는 `.cs` 파일들을 압축해서 가상머신 리눅스 `/backup` 경로에 복사한다.**

- **로컬에 생성한 `.zip` 파일은 `scp` 명령을 사용해서 가상 머신으로 복사한다. (패스워드를 입력하는 단계를 생략할 필요는 없다.)**

- **백업 파일 이름에는 오늘 날짜를 붙여서 복사한다. 예시) `backup_20200730.zip`**

---
*환경은 Window10에서 Git Bash를 활용하여 실습하였다.*

일작 시작하기에 앞서서, `day1` 부터 `day16`까지 임의로 아래 이미지와 같이 생성을 하였다.

![image][mark]

[mark]:https://s3.us-west-2.amazonaws.com/secure.notion-static.com/51eb3774-2fce-4f7e-9dbf-08d2445ca8aa/Day02-bb.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200728%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200728T124524Z&X-Amz-Expires=86400&X-Amz-Signature=1994a718a85b0a4caac7e4673cfbf6f044b3d60a844f9580af4cb4030079e574&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Day02-bb.png%22 "tree image"

위에 주어진 조건을 수행하기 위해, 필요한 문법을들 먼저 간단한 설명과 함께 나열을 해보자면,

* ### 기초문법

`#!/bin/bash` bash에서 실행될 코드라는 뜻이다. (`sh`, `python` 등 다양하게 목적에 맞게 변경 가능)

`#` : 주석처리는 # 기호로 시작하여 작성

`echo "MESSAGE"` : "MESSAGE" 를 출력한다.

`read` : shell에서 입력을 받는다.

`변수명=데이터` : 변수를 저장할 떄 쓰이고, 사용할 시에는 `$변수명` 으로 사용한다.

`변수명=(데이터1 데이터2 데이터3 ...)`: 변수를 배열로 선언하고싶을때 사용, `$(변수명[인덱스번호])`로 사용한다.

~~~
인덱스번호는
echo ${example[1]}        # $example 배열의 두 번째 인덱스에 해당하는 데이터 출력
echo ${example[@]}        # $example 배열의 모든 데이터 출력
echo ${example[*]}        # $example 배열의 모든 데이터 출력 
~~~

* ### 반복문

~~~bash
for 변수 in 변수값1 변수값2 ...; do
    명령문
done
~~~

* ### 조건문

~~~BASH
if [ 조건 ]; then
    명령문
else
    명령문
fi

#활용한 조건들
-e 파일명               # 파일이 존재하면 참
-d 파일명               # 파일이 디렉토리면 참
-h 파일명               # 심볼릭 링크파일
-f 파일명               # 파일이 일반파일이면 참
~~~
`Shell` 프로그래밍에서는 `SPACE`에 매우 민감하여, `if`과 조건 사이에 공백을 추가하거나 없애면 에러가 발생하게 된다. (`변수명=데이터` 선언할 때도 공백을 추가하면 안된다.)

* ### 날짜 관련 함수
~~~bash
echo "$(date +%y%m%d)"         #200728
echo "$(date +%H)시  $(date +%M)분  $(date +%S)초" #20시 08분 23초 를 출력
~~~

위의 함수들을 함하여 아래 `Shell` 프로그램을 구현하였다.

~~~BASH
#!/bin/bash

NOW=$(date +"%y%m%d-%H%M")
echo "please insert the directory to backup .cs files"
read DIR

if [ -d ${DIR} ] 
then
	echo "cs files in ${DIR} will be zipped!"
else
	echo "${DIR} is not a correct directory"       
	exit
fi

for file in ${DIR}/*
do
	if [ -f ${file}/*.cs ]; then             <- 구현을 했을 당시 조건문이 수행이 되지 않았다.
		zip -r backup_$NOW.zip $file/*.cs
	else
		if [ -d ${file} ]
		then 
			echo "${file} is empty"
		fi
	fi
done

# backup
scp backup_$NOW.zip seogki@192.168.0.7:~/backup
~~~

구현을 한 결과 조건문이 수행이 바르게 되지 않아서 `else` 문을 수행하지 않고 모든 디렉토리에 대해서 `zip`을 수행하였다. 결과물은 바르게 나왔으나, 조건에 맞는 문구를 출력하지 못하였다.

이후에는 `scp` 명령어를 이용하여 로컬에서 `ssh`를 이용하여 네트워크가 연결된 호스트로 파일을 `~/backup`에 저장하였다. 
~~~bash
scp 파일명 유저명@IP주소:목적디렉토리
#ex)
scp backupfile seogki@123.123.1.2:~/backup
~~~

![image][mark5]

[mark5]:https://s3.us-west-2.amazonaws.com/secure.notion-static.com/57f703b2-5db5-45cd-8cb6-dff20debaa07/___.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200728%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200728T133323Z&X-Amz-Expires=86400&X-Amz-Signature=b65225003aa7e178609f3359983d49f84c9cedcedf37b4146f3c624d620bb616&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22___.png%22
"result image"