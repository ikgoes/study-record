#include<stdio.h>
#include<stdlib.h>
#include<algorithm>
using namespace std;
#define max(a,b) ((a>b)?(a):(b))

int arr[1005];
int dp[1005];

int main() {
	int n;
	scanf("%d", &n);
	for (int i = 1; i <= n; i++) 
		scanf("%d", &arr[i]);
	for (int i = 1; i <= n; i++)
	{
		dp[i] = arr[i];
		for (int j = 1; j < i; j++)
			if (arr[j]<arr[i] && dp[j] + arr[i]>dp[i])
				dp[i] = dp[j] + arr[i];
	}
	sort(dp + 1, dp + n + 1);
	printf("%d\n", dp[n]);
}