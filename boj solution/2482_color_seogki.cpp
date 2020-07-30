#include<stdio.h>
#pragma warning(disable:4996)
#include<stdlib.h>
#define MOD 1000000003

int dp[1005][1005];

int main() {
	int N, K;
	scanf("%d %d", &N,&K);
	if (K == 1) {
		printf("%d", N);
		return 0;
	}
	for (int i = 0; i <= N; i++)
		dp[i][0] = 1;
	for (int i = 1; i <= N; i++)
		dp[i][1] = i;
	for (int i = 2; i <= N; i++) 
	{
		for (int j = 1; j <= K; j++) 
		{
			dp[i][j] = (dp[i - 2][j - 1] + dp[i - 1][j]) % MOD;
		}
	}
	printf("%d\n", ((dp[N][K] - dp[N - 4][K - 2]) % MOD + MOD) % MOD);
	system("pause");
}