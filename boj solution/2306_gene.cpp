#include<stdio.h>
#include<string.h>
#include <algorithm>
using namespace std;

int main()
{
	int t;
	scanf("%d", &t);
	while (t--){
		int dp[2][1005][1005];
		int n;
		int arr[1005];
		memset(dp, 0, sizeof(dp));
		memset(arr, 0, sizeof(arr));

		scanf("%d", &n);
		for (int i = 0; i < n; i++)
			scanf("%d", &arr);

	}
}

#define my 0 

int dp[2][1001][1001];
int arr[1001];
int t, n, i;

int func(int turn, int x, int y) {
	if (x == y) {
		if (turn == my)
			return arr[x];
		else
			return 0;
	}

	int& ref = dp[turn][x][y];
	if (ref != -1)
		return ref;

	if (turn == my)
		ref = max(func(turn ^ 1, x + 1, y) + arr[x], func(turn ^ 1, x, y - 1) + arr[y]);
	else
		ref = min(func(turn ^ 1, x + 1, y), func(turn ^ 1, x, y - 1));

	return ref;
}
