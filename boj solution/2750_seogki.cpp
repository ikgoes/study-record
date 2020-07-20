#include<iostream>
#include<algorithm>
#include<vector>
using namespace std;

int main() {
	int T, N;
	vector<int> v;
	scanf("%d", &T);
	while (T--) {
		scanf("%d", &N);
		v.push_back(N);
	}
	sort(v.begin(), v.end());
	for (auto it : v)
		printf("%d\n", it);
}