#include <stdio.h>
#include <queue>
#include <stdlib.h>
#include <iostream>
using namespace std;
#pragma warning(disable:4996)

int main() 
{
	int n, tmp, res = 0;
	priority_queue<int> q;

	scanf("%d", &n);

	while (n--) {
		scanf("%d", &tmp);
		q.push(-tmp);
	}

	while (q.size() > 1) {
		int a = -q.top(); 
		q.pop();
		int b = -q.top(); 
		q.pop();
		res += a + b;
		q.push(-(a + b));
	}
	printf("%d", res);
	system("pause");
}