#include<queue>
#include<iostream>
#include<string>
using namespace std;

int main() {
	int T, N, L;
	string name;
	scanf("%d", &T);
	while (T--) {
		scanf("%d", &N);
		priority_queue<pair<int, string>> pq;
		for (int i = 0; i < N; i++) {
			cin >> name >> L;
			pq.push(make_pair(L, name));
		}
		cout << pq.top().second << '\n';
	}
}