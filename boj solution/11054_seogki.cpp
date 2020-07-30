#include<stdio.h>
#include<iostream>
#include<stdlib.h>
#include<algorithm>
#pragma warning (disable:4996)
using namespace std;
int input[1005];
int DP[1005];
int DP2[1005];
int temp[1005];
int main() {
	int N;
	scanf("%d", &N);
	for (int i = 0; i < N; i++) {
		scanf("%d", &input[i]);
	}
	DP[0] = 1;
	for (int i = 1; i < N; i++) {
		for (int j = i - 1; j >= 0; j--) {
			if (input[i] > input[j]) {
				DP[i] = max(DP[i], DP[j]);
			}
		}
		DP[i]++;
	}
	int max2 = 0;
	int res1, res2;
	DP2[N - 1] = 1;
	for (int i = N - 2; i >= 0; i--) {
		for (int j = i + 1; j < N; j++) {
			if (input[i] > input[j]) {
				DP2[i] = max(DP2[i], DP2[j]);
			}
		}
		DP2[i]++;
	}

	for (int i = 0; i < N; i++) 
		temp[i] = DP2[i] + DP[i];
	
	int sum = -1;
	for (int i = 0; i < N; i++) {
		sum = max(sum, temp[i]);
	}
	printf("%d\n", sum-1);
	system("pause");
}