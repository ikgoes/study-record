#include<stdio.h>
#include<iostream>
#include<vector>
#include<string.h>
#include<queue>
#include<algorithm>
#include<map>
#include<functional>
#include<stdlib.h>
#pragma warning(disable:4996)
#define pii pair<int,int>

using namespace std;
priority_queue<pair<int, pii>, vector<pair<int, pii>>, greater<pair<int, pii>>> pq;

int v[100005];
int sum,N,M;

int find(int x) {
	if (x == v[x]) return x;
	return v[x] = find(v[x]);
}

void merge(int x, int y, int z) {
	x = find(x);
	y = find(y);
	if (x == y)return;
	v[x] = y;
	sum += z;
	N--;
}

int main() {
	scanf("%d%d", &N, &M);
	for (int i = 0; i <= N; i++) {
		v[i] = i;
	}
	int a, b, c;
	for (int i = 0; i < M; i++) {
		scanf("%d %d %d", &a, &b, &c);
		pq.push({ c,{ a,b } });
	}
	while (!pq.empty()) {
		if (N == 2) break;
		int a = pq.top().second.first;
		int b = pq.top().second.second;
		int w = pq.top().first;
		merge(a, b, w);
		pq.pop();
	}
	printf("%d\n", sum);
	system("pause");
}