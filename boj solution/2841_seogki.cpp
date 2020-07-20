#include<iostream>
#include<stack>
using namespace std;

int N, P, LN, FN, CNT;

int main() {
	stack<int> line[7];
	for (int i = 1; i < 7; i++)
		line[i].push(0);
	scanf("%d %d", &N, &P);
	while (N--) {
		scanf("%d %d", &LN, &FN);
		if (line[LN].top() == FN);
		else if (line[LN].top() < FN) {
			line[LN].push(FN); CNT++;
		}
		else
		{
			while (line[LN].top() > FN) {
					line[LN].pop(); CNT++;
			}
			if (line[LN].top() < FN) {
				line[LN].push(FN); CNT++;
			}
		}
	}
	printf("%d\n", CNT);
}