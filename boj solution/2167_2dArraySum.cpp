#include<stdio.h>
#pragma warning(disable:4996)
int map[310][310];
int sum[310][310];

int main()
{
	int n, m;
	scanf("%d %d", &n, &m);
	for (int i = 1; i <= n; i++)
		for (int j = 1; j <= m; j++)
		{
			scanf("%d", &map[i][j]);
			sum[i][j] += sum[i - 1][j] + sum[i][j - 1] + map[i][j];
			sum[i][j] -= sum[i - 1][j - 1];
		}
	int t;
	scanf("%d", &t);
	while (t--)
	{
		int x1, y1, x2, y2;
		scanf("%d %d %d %d", &x2, &y2, &x1, &y1);
		printf("%d\n", sum[x1][y1] - sum[x1][y2 - 1] - sum[x2 - 1][y1] + sum[x2 - 1][y2 - 1]);
	}
}