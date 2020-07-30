#!/bin/bash
# 로컬디렉토리내에서 .cs 파일들을 저장하여 가상머신 속 backup 폴더로
# SSH를 통해 접근하여 백업 하는 쉘 프로그램
# bash array
files=()

for day in */; do
	for file in ${day}*.cs ; do
		if [[ $js != "${day}*.cs" ]]; then
			echo $file
			files+=($file)
		else
			echo "$day empty!"
		fi
	done
done

NOW=$(date +"%y%m%d-%H%M")
zipfile=backup_$NOW
echo "compressing $zipfile with ${files[@]}..."
zip $zipfile ${files[@]}

# backup
scp backup_$NOW.zip seogki@192.168.0.7:~/backup
