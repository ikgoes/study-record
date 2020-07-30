#include<stdio.h>
#include<vector>
#include<iostream>
using namespace std;

int arr[1000001];
int parent[1000001];
int N, M;

int find(int a)
{
	if (parent[a] == a)
		return a;
	return find(parent[a]);
}

void merge(int a, int b)
{
	int u = find(a);
	int v = find(b);

	if (u == v)
		return;
	if (arr[u] > arr[v])
		parent[v] = u;
	else if (arr[u] == arr[v])
	{
		parent[v] = u;
		arr[u]++;
	}
	else
		parent[u] = v;
}

int main()
{
	scanf("%d %d", &N, &M);
	
	for (int i = 0; i <= N; i++)
	{
		parent[i] = i;
		arr[i] = 1;
	}

	for (int i = 0; i < M; i++)
	{
		int K, a, b;
		scanf("%d %d %d", &K, &a, &b);
		if (K == 1)
			printf("%s", find(a) == find(b) ? "YES\n" : "NO\n");
		else
			merge(a, b);
	}
	return 0;
}