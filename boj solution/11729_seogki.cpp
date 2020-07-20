#include<stdio.h>

int move[21] = { 0,1,3,7,15, };

void hanoi(int N, int from, int use, int to) {
	if (N == 1) {
		printf("%d %d\n", from, to);
		return;
	}
	hanoi(N - 1, from, to, use);
	hanoi(1, from, use, to);
	hanoi(N - 1, use, from, to);
}

int main() {
	int N;
	scanf("%d", &N);
	for (int i = 5; i <= N; i++)
		move[i] = move[i - 1] * 2 + 1;
	printf("%d\n", move[N]);
	hanoi(N, 1, 2, 3);
}