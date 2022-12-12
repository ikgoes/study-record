#include <string.h>
#include <iostream>
#include <queue>
#include <algorithm>
using namespace std;

#define pii pair<int,int>

int map[10][10]; // N의 크기가 최대 8이니, 0번지와 9번지는 밖 boundary로 하기위해서 10으로 선언
int N, M;
int dx[4] = {1,0,0,-1}; // 4개의 방향을 순회하기 위한 변수
int dy[4] = {0,1,-1,0};
vector<pii> zero_space;
vector<pii> virus_space;

int bfs(pii p1, pii p2, pii p3, vector<pii> virus){ // virus가 있는 공간과 벽을 설치할 3 공간을 받아서
    int max_space = 0;
    int tmp[10][10];
    queue<pii> q;
    for(int i = 0 ; i <= N+1; i++)
        for(int j = 0; j<= M+1; j++)
            tmp[i][j] = map[i][j]; // tmp에 map을 복사한 후
    tmp[p1.first][p1.second] = 1;
    tmp[p2.first][p2.second] = 1;
    tmp[p3.first][p3.second] = 1;
    for(int i = 0; i< virus.size(); i++) q.push(virus[i]); // 바이러스들을 queue에 push 하여 순회 시작

    while(!q.empty()){
        int x = q.front().first;
        int y = q.front().second; 
        q.pop();
        tmp[x][y] = 2; // 탐색한 공간은 바이러스가 퍼진 2로 초기화
        for(int k = 0; k<4;k++){
            if(tmp[x+dx[k]][y+dy[k]] == 0) // 4방향을 탐색하면서 0 ->  바이러스가 퍼질 수 있으면 push하여 또 진행
                q.push({x+dx[k], y+dy[k]}); 
        }
    }

    for(int i = 1 ; i <= N; i++)
        for(int j = 1; j<= M; j++)
            if(tmp[i][j] == 0)
                max_space++;     // bfs가 종료 되었을 시점에서 안전공간의 개수 체크
    return max_space;
}

// combination을 이용하여 안전 공간이 n 일때 0~n-1 중에서 3개를 골르는 경우의 수를 전부 반환하는 함수
vector<vector<int>> combination(int n, int r){ 
    vector<vector<int>> possible_comb;
    vector<int> s;
    for(int i = 0; i<n; i++) s.push_back(i); 

    // v라는 벡터에 총 3개의 false 그리고 나머지는 true로 채워 넣고
	vector<bool> v(3, true);
    v.insert(v.end(), n-3, false); 
    do {
        vector<int> temp;
        for (int k = 0; k < n; k++) 
            if (v[k]) temp.push_back(s[k]); // v 를 next_permutation을 이용하여 매번 섞어 v가 true인 부분에서 push 하는 방식 
        possible_comb.push_back(temp);
    } while (next_permutation(v.begin(), v.end()));

    return possible_comb;
}

int main() {
    memset(map, 1, sizeof(map)); // 밖 테두리를 1로 설정한다. 전체 map을 1로 둘러쌓아 bfs 탐색에 용이

    scanf("%d %d", &N, &M);
    for (int i = 1; i <= N; i++)
        for (int j = 1; j <= M; j++){
                scanf("%d", &map[i][j]);
                if(map[i][j] == 0) zero_space.push_back({i,j});
                if(map[i][j] == 2) virus_space.push_back({i,j});
            }  
    
    int MAX = -1;
    vector<vector<int>> choice = combination(zero_space.size(),3); // 0~zero_space.size()-1  로 만들수 있는 경우의 수 모음
    
    for(int i = 0; i<choice.size(); i++)
        MAX = max(MAX, bfs(zero_space[choice[i][0]],zero_space[choice[i][1]],zero_space[choice[i][2]], virus_space));
    printf("%d\n", MAX);
    return 0;
}