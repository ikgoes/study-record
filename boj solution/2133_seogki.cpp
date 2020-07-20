#include<stdio.h>
int dp[31] = {1,0,3,};

int main() {
	int N;
	scanf("%d", &N);
	for (int i = 4; i <= N; i += 2) {
		dp[i] = 3 * dp[i - 2];
		for (int j = 4; j <= i; j += 2)
			dp[i] += 2 * dp[i - j];
	}
	printf("%d", dp[N]);
}