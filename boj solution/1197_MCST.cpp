#include<stdio.h>
#include<iostream>
#include<queue>
using namespace std;
#define pii pair<int,int>
#pragma warning(disable:4996)
#include<stdlib.h>

priority_queue<pair<int, pii>> pq;
int arr[10005];

int find(int a)
{
	if (arr[a] == a)
		return a;
	return find(arr[a]);
}

inline void merge(int a, int b)
{
	if (a== b) return;
	arr[a] = b;
}

int main() {
	int V, E;
	scanf("%d %d", &V, &E);
	int a, b, w;
	for (int i = 0; i < E; i++){
		scanf("%d %d %d", &a, &b, &w);
		pq.push({ -w,{a,b} });
	}
	int sum = 0;

	for (int i = 1; i <= V; i++) arr[i] = i;

	while (!pq.empty()) {
		pair<int,pii> now = pq.top();
		int W = now.first;
		int a = now.second.first;
		int b = now.second.second;
		pq.pop();
		int hi = find(a);
		int cya = find(b);
		if (hi != cya){
			merge(hi,cya);
			sum += -W;
		}
		else
			continue;
	}
	printf("%d\n", sum);
	system("pause");
}