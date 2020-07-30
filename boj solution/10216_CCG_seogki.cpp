#include<stdio.h>
#include<stdlib.h>
#include<vector>
#include<queue>
#include<string.h>
#pragma warning(disable:4996)
using namespace std;

vector<int> adj[3005];
int chk[3005];

struct node
{
	int a;
	int b;
	int v;
};

int net(node a, node b)
{
	if ((a.v + b.v)*(a.v + b.v) >= (b.a - a.a)*(b.a - a.a) + (b.b - a.b)*(b.b - a.b))
		return 1;
	else
		return 0;
}

int dfs(vector<int> adj[], int pos) 
{
	if (chk[pos]) 
		return 0;
	chk[pos] = 1;

	for (int i = 0; i < adj[pos].size(); i++)
		dfs(adj, adj[pos][i]);
	return 1;
}


int main() 
{
	int t;
	scanf("%d", &t);
	while (t--) 
	{
		int n, x, y, r;
		scanf("%d", &n);

		node arr[3005];
		for (int i = 0; i < n; i++)
			adj[i].clear();
		memset(chk, 0, sizeof(chk));

		for (int i = 0; i < n; i++) 
		{
			scanf("%d %d %d", &x, &y, &r);
			arr[i] = { x,y,r };
		}
		for (int i = 0; i < n; i++)
		{
			for (int j = 0; j < n; j++)
			{
				if (i == j)
					continue;
				if (net(arr[i], arr[j]) == 1)
					adj[i].push_back(j);
			}
		}
		int cnt = 0;	
		for (int i = 0; i < n; i++) {
			if (dfs(adj, i))
				cnt++;
		}
		printf("%d\n", cnt);
	}
	system("pause");
}
