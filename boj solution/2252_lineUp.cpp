#include<stdio.h>
#include<queue>
#include<iostream>
#include<vector>
using namespace std;

#include<stdlib.h>
#pragma warning(disable:4996)

int indegree[100005];
vector<int> map[100005];
queue<int> qu;
vector<int> ans;

int main()
{
	int N, M, a, b;
	scanf("%d %d", &N, &M);
	for (int i = 0; i < M; i++) {
		scanf("%d %d", &a, &b);
		indegree[b]++;
		map[a].push_back(b);
	}

	for (int i = 1; i <= N; i++) {
		if (indegree[i] == 0) {
			qu.push(i);
		}
	}

	while (!qu.empty()) {
		int now = qu.front();
		printf("%d ", now);
		qu.pop();
		for (int i = 0; i < map[now].size(); i++) {
			int toGo = map[now][i];
			if (!(--indegree[toGo])) qu.push(toGo);
		}
	}
	printf("\n");
	system("pause");
}