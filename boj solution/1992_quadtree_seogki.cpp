#include<stdio.h>
using namespace std;

char ARR[65][65];

void run(int x, int y, int len)
{
	char HD = ARR[x][y];
	for (int i = x; i < x + len; ++i) {
		for (int j = y; j < y + len; ++j) {
			if (HD != ARR[i][j]) {
				printf("(");
				run(x, y, len / 2);
				run(x, y + len / 2, len / 2);
				run(x + len / 2, y, len / 2);
				run(x + len / 2, y + len / 2, len / 2);
				printf(")");
				return;
			}
		}
	}
	printf("%c", HD);
}
int main()
{
	int N;
	scanf("%d", &N);
	for (int i = 0; i<N; ++i)
		scanf("%s", ARR[i]);
	run(0, 0, N);
}