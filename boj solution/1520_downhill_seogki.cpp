#include <iostream>
#include <stdlib.h>
#include <string.h>
#define pii pair<int,int>
#define mp(a,b) make_pair(a,b)
#define f first
#define s second
using namespace std;

int DX[4] = { 1,-1,0,0 };
int DY[4] = { 0,0,1,-1 };

int N, M;
int MAP[505][505], DP[505][505];

int DFS(pii st) {
	DP[st.f][st.s] = 0;
	if (st.f == N && st.s == M)
		return 1;
	for (int k = 0; k < 4; k++) {
		int NX = st.f + DX[k];
		int NY = st.s + DY[k];
		if (MAP[NX][NY] < MAP[st.f][st.s] && MAP[NX][NY] != -1) {
			if (DP[NX][NY] != -1)
				DP[st.f][st.s] += DP[NX][NY];
			else
				DP[st.f][st.s] += DP[NX][NY] = DFS({ NX,NY });
		}
	}
	return DP[st.f][st.s];
}
int main() {
	memset(MAP, -1, sizeof(MAP));
	memset(DP, -1, sizeof(DP));
	scanf("%d %d", &N, &M);
	for (int i = 1; i <= N; i++)
		for (int j = 1; j <= M; j++)
			scanf("%d", &MAP[i][j]);
	DFS({ 1, 1 });

	printf("%d\n", DP[1][1]);
}