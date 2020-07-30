include<stdio.h>
#include<algorithm>
using namespace std;
int n, m, dp[1001][1001], maxi;
int main() {
	scanf("%d %d", &n, &m);
	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= m; j++) {
			int a;
			scanf("%1d", &a);
			if (a) {
				dp[i][j] = min(dp[i - 1][j - 1], min(dp[i - 1][j], dp[i][j - 1])) + 1;
				maxi = max(maxi, dp[i][j]);
			}
		}
	}
	printf("%d", maxi*maxi);
	return 0;
}