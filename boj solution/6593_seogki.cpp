#include<stdio.h>
#include<stdlib.h>
#include<iostream>
#include<queue>
#include<string.h>
using namespace std;
#pragma warning (disable:4996)

#define max(a,b) (a>b)?(a):(b)
struct cords {
	int x;
	int y;
	int z;
};

int map[35][35][35];
int chk[35][35][35];

int dx[6] = {-1,0,0,1,0,0};
int dy[6] = {0,0,-1,0,0,-1};
int dz[6] = {0,1,0,0,-1,0};

int main() {
	int a, b, c;
	char tmp;
	cords S;
	cords E;
	while (1) {
		memset(map, 0, sizeof(map));
		memset(chk, 0, sizeof(chk));
		scanf("%d %d %d", &a, &b, &c);
		if (a == 0 && b == 0 && c == 0) break;

		for (int i = 1; i <= a; i++) {
			for (int j = 1; j <= c; j++) {
				for (int k = 1; k <= b; k++) {
					scanf("%1c", &tmp);
					map[i][j][k] = (tmp == '#') ? 0 : 1;
					if (tmp == 'S') S = { i,j,k };
					if (tmp == 'E') E = { i,j,k };
				}
				getchar();
			}
			getchar();
			getchar();
		}

		queue<pair<int,cords>> qu;
		chk[S.x][S.y][S.z] = 1;
		qu.push({ 0,S });
		int cnt = 0;
		bool flag = 0;

		while (!qu.empty()) {
			int day = qu.front().first;
			cnt = max(day, cnt);

			if (qu.front().second.x == E.x && qu.front().second.y == E.y && qu.front().second.z == E.z){
				flag = 1;
				break;
			}

			for (int i = 0; i < 6; i++) {
				int X = qu.front().second.x + dx[i];
				int Y = qu.front().second.y + dy[i];
				int Z = qu.front().second.z + dz[i];
				if (map[X][Y][Z] == 1 && chk[X][Y][Z] == 0)
				{
					chk[X][Y][Z] = 1;
					qu.push({ day + 1, { X, Y, Z } });
				}
			}
		}
		if (flag)
			printf("Trapped!\n");
		else
			printf("Escaped in %d minute(s).", cnt);
	}
	system("pause");
}