#include<stdio.h>
#include<stdlib.h>
#include<queue>
#include<iostream>
using namespace std;
#pragma warning(disable:4996)

int n;
int parent[55];
int arr[55], chk[55];

int erase(int no)
{
	if (no == -1)
		return 0;
	if (chk[no] == 1)
		return 1;
	return chk[no] = erase(parent[no]);
}

int solve(int del)
{
	int cnt = 0;

	chk[del] = 1;
	arr[parent[del]]--;

	for (int i = 0; i < n; i++) 
		if (arr[i] == 0) 
			if (erase(i) == 0)
				cnt++;
	return cnt;
}

int main()
{
	int tmp;
	int del;

	scanf("%d", &n);

	for (int i = 0; i < n; i++) {
		scanf("%d", &tmp);
		parent[i] = tmp;
		if (tmp != -1) {
			arr[tmp]++;
		}
	}
	scanf("%d", &del);

	printf("%d\n", solve(del));

	system("pause");
}
