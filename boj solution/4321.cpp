#include<stdio.h>
#include<iostream>
#include<queue>
#include<vector>
#include<algorithm>
#pragma warning(disable: 4996)
#include<stdlib.h>

using namespace std;

int d[3] = { (2),(-1),(1) };
int visit[100005];
queue<pair<int, int > > q;
int main() {
	int n, k;
	scanf("%d%d", &n, &k);
	q.push({ n,0 });
	int sum = 0;
	while (!q.empty()) {
		int now = q.front().first;
		int val = q.front().second;
		visit[now] = 1;
		if (now == k) { printf("%d\n", val); break; }
		q.pop();
		printf("%d\n", now);
		for (int i = 0; i < 3; i++) {
			int next;
			if (i == 0) 
				next = now * d[i];
			else 
				next = now + d[i];
			printf("NEXT = %d \n",next);
			if (next != n && next <= 100005 && next >= 0 && !visit[next]) {
				visit[next] = 1;
				q.push({ next, val + 1 });
			}
		}
	}
	//printf("%d\n", sum);
	system("PAUSE");

}