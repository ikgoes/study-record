#include<stdio.h>
int dp[1001] = {0,1,2,};

int main() {
	int N;
	scanf("%d", &N);
	for (int i = 3; i <= N; i++)
		dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
	printf("%d", dp[N]);
}

/*
타일을 채우는 경우가

세로로 한개 채우기 또는 가로로 2개 쌓아서 채우기 밖에 없다.
세로로 세우는건 길이가 1이 추가  
가로로 세우는건 길이가 2가 추가
되므로 DP[i] = DP[i-1] + DP[i-2]
*/