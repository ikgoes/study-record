#include<stdio.h>
#include<stdlib.h>
#pragma warning (disable:4996)
#define min(a,b) ((a)>(b)?(b):(a))

int table[1005][3];
int dp[1005][3];

int mini(int a, int b, int c) { return min(min(a, b), c); }

int main() {
	int n;
	scanf("%d", &n);

	for (int i = 1; i <= n; i++) {
		int a[3];
		scanf("%d %d %d", &a[0], &a[1], &a[2]);
		for (int j = 0; j < 3; j++)
			dp[i][j] = min(dp[i - 1][(j + 1) % 3], dp[i - 1][(j + 2) % 3]) + a[j];
	}

	printf("%d\n", mini(dp[n][0], dp[n][1], dp[n][2]));
	system("PAUSE");
}
