#include<iostream>
#include<vector>
#include<queue>
#define max(a,b) ((a)>(b)? (a):(b))
using namespace std;

int dx[4] = { -1,1,0,0 };
int dy[4] = { 0,0,1,-1 };
int MAP[501][501], DP[501][501];
int MAX, N;

int outRange(int X, int Y) {
	return (X <= 0 || X > N || Y <= 0 || Y > N);
}

int nextD(int x, int y)
{
	if (DP[x][y] != 0)
		return DP[x][y];
	else {
		for (int k = 0; k < 4; k++) {
			int NX = x + dx[k], NY = y + dy[k];
			if (outRange(NX, NY)) continue;
			if (MAP[NX][NY] >MAP[x][y])
				DP[x][y] = max(DP[x][y], nextD(NX, NY) + 1);
		}
	}
	return DP[x][y];
}

int main()
{
	scanf("%d", &N);
	for (int i = 1; i <= N; i++)
		for (int j = 1; j <= N; j++)
			scanf("%d", &MAP[i][j]);
	for (int i = 1; i <= N; i++) {
		for (int j = 1; j <= N; j++) {
			nextD(i, j);
			MAX = max(MAX, DP[i][j]);
		}
	}
	printf("%d\n", MAX + 1);
}
