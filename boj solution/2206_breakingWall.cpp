#include<stdio.h>
#include<stdlib.h>
#include<queue>
#include<iostream>
using namespace std;
#pragma warning(disable:4996)

struct Pos {
	int x, y, bomb;
};

int dis = 1, ans = 0;
char map[1001][1001];
bool chk[1001][1001][2];
int dx[4] = { 1,-1,0,0 };
int dy[4] = { 0,0,1,-1 };

queue<Pos> q;

int main() {
	int n, m;
	scanf("%d %d", &n, &m);
	for (int i = 0; i<n; i++)
		cin >> map[i];

	Pos s;
	s.x = 0, s.y = 0, s.bomb = 0;
	q.push(s);
	chk[s.x][s.y][s.bomb] = true;

	while (!q.empty()) {
		int q_size = q.size();
		while (q_size--) {
			Pos p = q.front(); q.pop();
			int x = p.x, y = p.y, b = p.bomb;

			if (x == m - 1 && y == m - 1) {
				ans = dis;
				printf("%d\n",ans);
				return 0;
			}
			for (int i = 0; i<4; i++) {
				if (x + dx[i] >= 0 && x + dx[i]<n && y + dy[i] >= 0 && y + dy[i]<m && !chk[x + dx[i]][y + dy[i]][b] && map[x + dx[i]][y + dy[i]] == '0') {
					chk[x + dx[i]][y + dy[i]][b] = 1;
					Pos t;
					t.x = x + dx[i], t.y = y + dy[i], t.bomb = b;
					q.push(t);
				}
			}
			if (b == 0) {
				for (int i = 0; i<4; i++) {
					if (x + dx[i] >= 0 && x + dx[i]<n && y + dy[i] >= 0 && y + dy[i]<m && !chk[x + dx[i]][y + dy[i]][b]) {
						chk[x + dx[i]][y + dy[i]][b + 1] = 1;
						Pos t;
						t.x = x + dx[i], t.y = y + dy[i], t.bomb = b + 1;
						q.push(t);

					}
				}


			}
		}
		dis++;
	}
	if (ans == 0)printf("-1\n");
}