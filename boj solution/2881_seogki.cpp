#include<stdio.h>
#include<vector>
#include<iostream>
#include<algorithm>
#include<stdlib.h>
#pragma warning(disable:4996)
using namespace std;
#define pii pair<int,int>

vector<pii> list;
vector<pii> list2;
int n, x, y;

int main() {
	scanf("%d", &n);

	for (int i = 0; i < n; i++) {
		scanf("%d %d", &x, &y);
		list.push_back({ x,y });
		list2.push_back({ y,x });
	}

	int p,x1,x2,y1,y2;
	
	scanf("%d", &p);
	sort(list.begin(), list.end());
	sort(list2.begin(), list2.end());

	for (int i = 0; i < p; i++)
	{
		scanf("%d %d %d %d", &x1, &y1, &x2, &y2);

		int ans = 0;
		ans += upper_bound(list.begin(), list.end(), make_pair(x1, y2)) - lower_bound(list.begin(), list.end(), make_pair(x1, y1));
		ans += upper_bound(list.begin(), list.end(), make_pair(x2, y2)) - lower_bound(list.begin(), list.end(), make_pair(x2, y1));
		ans += upper_bound(list2.begin(), list2.end(), make_pair(y1, x2 - 1)) - lower_bound(list2.begin(), list2.end(), make_pair(y1, x1 + 1));
		ans += upper_bound(list2.begin(), list2.end(), make_pair(y2, x2 - 1)) - lower_bound(list2.begin(), list2.end(), make_pair(y2, x1 + 1));

		printf("%d\n", upper_bound(list.begin(), list.end(), make_pair(x1, y2)) - lower_bound(list.begin(), list.end(), make_pair(x1, y1)));
		printf("%d\n", upper_bound(list.begin(), list.end(), make_pair(x2, y2)) - lower_bound(list.begin(), list.end(), make_pair(x2, y1)));
		printf("%d\n", upper_bound(list2.begin(), list2.end(), make_pair(y1, x2 - 1)) - lower_bound(list2.begin(), list2.end(), make_pair(y1, x1 + 1)));
		printf("%d\n", upper_bound(list2.begin(), list2.end(), make_pair(y2, x2 - 1)) - lower_bound(list2.begin(), list2.end(), make_pair(y2, x1 + 1)));

		printf("%d\n",ans);
	}

	system("pause");
}