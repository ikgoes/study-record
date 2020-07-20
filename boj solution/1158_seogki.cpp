#include<iostream>
#include<queue>
using namespace std;

int main() {
	int N, K;
	scanf("%d %d", &N, &K);
	queue<int> q;
	for (int i = 1; i <= N; i++)
		q.push(i);
	printf("<");
	for (int i = 0; i < N - 1; i++) {
		for (int j = 0; j < K-1; j++) {
			q.push(q.front());
			q.pop();
		}
		printf("%d, ", q.front());
		q.pop();
	}
	printf("%d>", q.front());
	q.pop();
}