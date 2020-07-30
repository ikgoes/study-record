#include<stdio.h>
#include<iostream>
#include<string.h>
#include<queue>
using namespace std;

#pragma warning (disable:4996)
#define INF 987654321
#define pii pair<int,int>

int map[130][130];
int dist[130][130];
const int dx[4] = { 0,0,1,-1 };
const int dy[4] = { 1,-1,0,0 };
priority_queue<pair<int, pii> > pq;

int main() {
	int N;
	int cnt = 1;
	while (true) {
		scanf("%d", &N);
		if (N == 0)
			break;
		memset(map, 0, sizeof(map));
		for (int i = 1; i <= N; i++)
			for (int j = 1; j <= N; j++) {
				scanf("%d", &map[i][j]);
				dist[i][j] = INF;
			}

		dist[1][1] = 0;
		pq.push({ -0,{1,1} });
		while (!pq.empty())
		{
			int myDis = -pq.top().first;
			pii now = pq.top().second;
			pq.pop();
			for (int i = 0; i < 4; i++) {
				int X = now.first + dx[i];
				int Y = now.second + dy[i];
				int toDis = myDis + map[now.first][now.second];
				if (dist[X][Y] > toDis && map[X][Y] != 0) {
					dist[X][Y] = toDis;
					pq.push({ -toDis,{X,Y} });
				}
			}
		}
		printf("Problem %d: %d", cnt, dist[N][N]);
		cnt++;
	}
}