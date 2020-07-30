#include<stdio.h>

int arr[1010];
int dp[1010];

int main() {
	int n;
	scanf("%d", &n);
	for (int i = 0; i < n; i++)
		scanf("%d", &arr[i]);

	dp[0] = 1;
	int max = 0;

	for (int i = 1; i < n; i++) {
		int maxl = 0;
		for (int j = 0; j < i; j++)
		{
			if (arr[i] > arr[j])
				if (maxl < dp[j])
					maxl = dp[j];
		}
		dp[i] = maxl + 1;
	}

	for (int i = 0; i < n; i++)
		if (dp[i] > max)
			max = dp[i];
	printf("%d\n", max);
}