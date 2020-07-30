#include<stdio.h>
#include<stdlib.h>
#pragma warning(disable:4996)
int arr[1005];
int ans[1005];

int find(int u)  { 
	if (u == arr[u])
		return u;  
	return find(arr[u]); 
} 
void merge (int u, int v){ 
	u = find(u); 
	v = find(v);  
	if (u == v) 
		return; 
	arr[u] = v; 
}

int main() {
	for (int i = 0; i < 1005; i++)
		arr[i] = i;
	int n, m,a,b;
	scanf("%d %d", &n, &m);
	for (int i = 0; i < m; i++)
	{
		scanf("%d %d", &a, &b);
		merge(a,b);
	}
	for (int i = 0; i <= n; i++)
		ans[find(arr[i])]++;

	int cnt = 0;
	for (int i = 1; i <= n; i++)
		if (ans[i] != 0)
			cnt++;
	printf("%d\n", cnt);
	system("pause");
}