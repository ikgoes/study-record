#include<stdio.h>
#pragma warning(disable : 4996)
int f[41][2];

int main() {
	int T,N;
	scanf("%d", &T);
	f[0][0] = 1;
	f[0][1] = 0;
	f[1][0] = 0;
	f[1][1] = 1;
	for (int i = 2; i < 41; i++){
		f[i][0] = f[i - 1][0] + f[i - 2][0];
		f[i][1] = f[i - 1][1] + f[i - 2][1];
	}
	while (T--) {
		scanf("%d", &N);
		printf("%d %d\n", f[N][0], f[N][1]);
	}
}

/*
피보나치 수열에서 1과 0을 호출하는 빈도를 세는 문제
피보나치 수열 연산 횟수를 세는 것과 같으므로 memoization을 빈도수에 적용
*/