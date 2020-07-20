#include<stdio.h>
#pragma warning(disable : 4996)
int bino[1005][1005];

int main() {
	int N, K;
	scanf("%d %d", &N, &K);
	bino[1][1] = 1;
	for (int i = 2; i <= N+1 ; i++) 
		for (int j = 1; j <= i ; j++) 
			bino[i][j] = (bino[i - 1][j - 1] + bino[i - 1][j]) % 10007;

    printf("%d\n",bino[N+1][K+1]);
    return 0;
}