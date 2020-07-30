#include<stdio.h>
#include<stdlib.h>
#pragma warning(disable:4996)

int dp[17][17];

int combi(int a, int b) {
	int r = 1;
	for (int i = 1; i <= b; i++)
		r = r*(a- i + 1) / i;
	return r;
}

int main()
{
	int N, M, K, row = 0, col = 0;
	scanf("%d %d %d", &N, &M, &K);
	
	if (K) {
		row = (K - 1) / M;
	    col = (K - 1) % M;
	}

	printf("%d\n", combi(row + col, col) * combi(N + M - 2 - row - col, N - 1 - row));
	system("pause");
}