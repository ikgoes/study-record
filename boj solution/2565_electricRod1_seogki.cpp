#include<stdio.h>
#include<algorithm>
#include<stdlib.h>
#include<iostream>
#pragma warning(disable:4996)
using namespace std;

#define pii pair<int,int>
pii arr[105];
int dp[105];

int main() {
	int n;
	scanf("%d", &n);
	for (int i = 0; i < n; i++)
		scanf("%d %d",&arr[i].first, &arr[i].second);
	sort(arr, arr + n);

	dp[0] = 1;
	int max = 0;

	for (int i = 1; i < n; i++) {
		int maxl = 0;
		for (int j = 0; j < i; j++)
		{
			if (arr[i].second > arr[j].second)
				if (maxl < dp[j])
					maxl = dp[j];
		}
		dp[i] = maxl + 1;
	}

	for (int i = 0; i < n; i++)
		if (dp[i] > max)
			max = dp[i];

	printf("%d\n", n - max);
	system("PAUSE");
}