#include<iostream>
#include<set>
#include<string>
#include<algorithm>
using namespace std;

int main() {
	set<string> P;
	string name, state;
	int N;
	scanf("%d", &N);
	for (int i = 0; i < N; i++) {
		cin >> name >> state;
		if (state == "enter")
			P.insert(name);
		else
			P.erase(name);
	}
	for (auto it = P.rbegin() ; it != P.rend(); it++)
		cout<< *it<<'\n';
}