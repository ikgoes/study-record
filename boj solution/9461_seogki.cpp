#include<stdio.h>

long long int dp[101] = { 0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9 ,};

int main(){
	int T, N;
	scanf("%d", &T);
	for (int i = 11; i <= 100; i++)
		dp[i] = dp[i - 1] + dp[i - 5];
	while (T--)
	{
		scanf("%d", &N);
		printf("%lld\n", dp[N]);
	}
}