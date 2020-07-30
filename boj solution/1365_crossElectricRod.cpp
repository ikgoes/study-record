#include<stdio.h>
#include<iostream>
#include<algorithm>
using namespace std;
#pragma warning (disable:4996)
#define pii pair<int,int>

int arr[100005];
int dp[100005];

int main()
{
	int n;
	scanf("%d", &n);
	for (int i = 0; i < n; i++) 
		scanf("%d", &arr[i]);
	int len = 0;
	for (int i = 0; i < n; i++){
		int c = lower_bound(dp, dp + len, arr[i]) - dp;
		if (c == len)
			dp[len++] = arr[i];
		else
			dp[c] = arr[i];
	}

	printf("%d\n", n-len);
	system("PAUSE");
}
