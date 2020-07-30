#!/bin/bash
# 로컬디렉토리내에서 .cs 파일들을 저장하여 가상머신 속 backup 폴더로
# SSH를 통해 접근하여 백업 하는 쉘 프로그램

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

for file in ${DIR}/* ; do
	if [ -e ${file}/*.cs ]; then             
		zip -r backup_$NOW.zip $file/*.cs
	else
		if [ -d ${file} ]
		then 
			echo "${file} is empty"
		fi
	fi
done

# backup
scp backup_$NOW.zip seogki@192.107.7.1:~/backup
