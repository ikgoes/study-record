#include<stdio.h>
#include<string.h>
#include<stack>
#include<iostream>
#include<algorithm>
using namespace std;
#pragma warning (disable:4996)
#define pii pair<int,int>

pii arr2[100005];
int arr[100005];
int dp[100005];
int prv[100005];
stack<int> ans;

int main()
{
	memset(prv,sizeof(prv),-1);
	int n;
	scanf("%d", &n);
	for (int i = 0; i < n; i++)
		scanf("%d%d", &arr2[i].first,&arr2[i].second);
	sort(arr2, arr2 + n);
	for (int i = 0; i < n; i++)
		arr[i] = arr2[i].second;
	
	int len = 0;
	for (int i = 0; i < n; i++) {
		int c = lower_bound(dp, dp + len, arr[i]) - dp;
		if (c == len) {
			dp[len++] = arr[i];
			prv[arr[i]] = dp[len - 2];
		}
		else{
			dp[c] = arr[i];
			prv[arr[i]] = dp[c - 1];
		}
	}
	printf("%d\n", n - len);
	int tmp = len;
	ans.push(dp[len]);
	while (tmp == -1) {
		ans.push(tmp);
		tmp = dp[tmp];
	}
	while (!ans.empty())
	{
		printf("%d\n",);
	}
	system("PAUSE");
}
