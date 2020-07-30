#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<queue>
#include<vector>
#include<iostream>
using namespace std;
#define pii pair<int,int>
#define MIN(a,b) ((a>b)?(b):(a))
#define MAX(a,b) ((a>b)?(a):(b))
#pragma warning (disable:4996)
int map[55][55];
int visited[55];
int val[55];

int main() {
	int n, a, b;
	scanf("%d", &n);
	while (true) {
		scanf("%d %d",&a, &b);
		if (a == -1 && b == -1)
			break;
		map[a][b] = 1;
		map[b][a] = 1;
	}

	queue<pii> qu;
	int max = 987654321;

	for (int i = 1; i <= n; i++) {
		memset(visited, 0, sizeof(visited));
		qu.push({ i,0 });
		visited[i] = 1;
		
		int dist = 0;
		while (!qu.empty()) {
			pii now = qu.front();
			qu.pop();
			now.second++;
			for (int j = 1; j <= n; j++) {
				if (visited[j] == 0 && map[now.first][j] == 1){	
					qu.push({ j, now.second });
					visited[j] = 1;
				}
			}
			val[i] = now.second-1;
		}
		max = MIN(max, val[i]);
	}

	vector<int> ans;
	for (int i = 1; i <= n; i++)
		if (val[i] == max)
			ans.push_back(i);
	printf("%d %d\n", max,ans.size());
	for (int i = 0; i <ans.size() ; i++)
		printf("%d ", ans[i]);
	system("pause");
}