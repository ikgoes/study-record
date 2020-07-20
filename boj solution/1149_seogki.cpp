#include<stdio.h>
#define min(a,b) ((a)<(b))?(a):(b)
int N, dp[1001][3];

int main() {
	scanf("%d", &N);
	for (int i = 1; i <= N; i++) {
		int MAP[3];
		scanf("%d %d %d", &MAP[0], &MAP[1], &MAP[2]);
		for (int j = 0; j < 3; j++)
			dp[i][j] = (min(dp[i - 1][(j + 1) % 3], dp[i - 1][(j + 2) % 3])) + MAP[j];
	}
	printf("%d\n", min( min( dp[N][0], dp[N][1]), dp[N][2]));
}