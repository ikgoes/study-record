#include<stdio.h>
#include<stdlib.h>
#include<vector>
#include<iostream>
#pragma warning (disable:4996)
#define max(a,b) ((a>b)?(a):(b))
using namespace std;

int money[305][35];
int trk[305][35];
int dp[305][35];

int main() {
	int n, m; // m 은 기업의 수, n 은 투자한 액수
	scanf("%d %d", &n, &m);
	for (int i = 1; i <= n; i++)
		for (int j = 0; j <= m; j++)
			scanf("%d", &money[i][j]);

	for (int i = 1; i <= m; i++) {
		for (int j = 1; j <= n; j++) {
			int tmp = 0;
			int MAX = 0;
			for (int k = 0; k <= j; k++) {
				if (dp[j - k][i - 1] + money[k][i] > MAX)
				{
					MAX = dp[j - k][i - 1] + money[k][i];
					tmp = k;
				}
			}
			dp[j][i] = MAX;
			trk[j][i] = tmp;
		}
	}

	vector<int> ans;
	int b = n;
	for (int i = m; i >= 1; i--) {
		ans.push_back(trk[b][i]);
		b -= trk[b][i];
	}
	printf("%d\n", dp[n][m]);
	for (int i = ans.size() - 1; i >= 0; i--) {
		printf("%d ", ans[i]);
	}

	system("PAUSE");
}

