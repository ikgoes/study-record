#include<stdio.h>
#include<queue>
#include<iostream>
using namespace std;

#define pii pair<int,int>
#define max(a,b) (a>b)?(a):(b)
int dx[4] = { 1,0,0,-1 };
int dy[4] = { 0,-1,1,0 };

#pragma warning(disable:4996)
#include<stdlib.h>

int arr[55][55];
int visit[55][55];
queue<pair<pii,int>> qu;

int main() {
	int N, M;
	int MAX = 0;
	char tmp;
	scanf("%D %D", &N, &M);
	for (int i = 0; i < N; i++)
		for (int j = 0; j < M; j++) {
			scanf("%1c", &tmp);
			arr[i][j] = (tmp == 'L') ? (1) : (0);
		}
	for (int i = 0; i < N; i++)
		for (int j = 0; j < M; j++) {
			if (arr[i][j] == 1)
			{
				qu.push({{ i,j },0});
				while (!qu.empty()) {
					int cnt = qu.front().second;
					MAX = max(MAX, cnt);
					for (int k = 0; k < 4; k++)
					{
						int x = qu.front().first.first + dx[k];
						int y = qu.front().first.second +dy[k];
						if (visit[][]arr[x + dx[k]][y + dy[k]] == 1 && x >= 0 && y >= 0 && x <= N && y <= M) {
							qu.push({ {x,y}, cnt + 1 });
						}
					}
					qu.pop;
				}
			}
		}
}