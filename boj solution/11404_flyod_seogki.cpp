#include<stdio.h>
#include<stdlib.h>
#pragma warning(disable:4996)

int map[105][105];
#define INF 987654321;
#define min(a,b) ((a<b)?(a):(b))

int main() {
	int N,M;
	scanf("%d %d", &N, &M);
	int a, b, w;

	for (int i = 1; i <= N; i++)
		for (int j = 1; j <= N; j++)
			map[i][j] = INF;

	for (int i = 1; i <= M; i++)
	{
		scanf("%d %d %d", &a, &b, &w);
		map[a][b] = min(w, map[a][b]);
	}

	for (int i = 1; i <= N; i++)
		map[i][i] = 0;

	for (int k = 1; k <= N; k++)
		for (int i = 1; i <= N; i++)
			for (int j = 1; j <= N; j++)
				if (map[i][j] > map[i][k] + map[k][j] && map[i][k] && map[k][j])
					map[i][j] = map[i][k] + map[k][j];

	for (int i = 1; i <= N; i++) {
		for (int j = 1; j <= N; j++)
			printf("%d ",map[i][j]);
		printf("\n");
	}
	system("pause");
}