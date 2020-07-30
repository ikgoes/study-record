#include<queue>
#include<iostream>
using namespace std;

queue<int> qu;
vector<int> arr[10010];
bool visited[10010];
int res[10010];

int main() {
	int n, m, a, b, mx = 0, size = 0;
	scanf("%d%d", &n, &m);
	for (int i = 0; i < m; i++)
	{
		scanf("%d%d", &a, &b);
		arr[b].push_back(a);
	}

	for (int i = 1; i <= n; i++)
	{
		int cnt = 0;
		int visited[10010] = {};

		qu.push(i);
		visited[i] = 1;
		cnt++;

		while (!qu.empty())
		{
			int save = qu.front();
			qu.pop();
			for (int j = 0; j < arr[save].size(); j++)
			{
				int temp = arr[save][j];

				if (visited[temp] == 0)
				{
					qu.push(temp);
					visited[temp] = 1;
					cnt++;
				}
			}
		}
		if (mx < cnt)
		{
			size = 0;
			mx = cnt;
			res[size++] = i;
		}
		else if (mx == cnt)
		{
			res[size++] = i;
		}
	}
	for (int i = 0; i < size; i++)
		printf("%d ", res[i]);

	return 0;
}