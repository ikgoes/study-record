#include<stdio.h>
#include<stdlib.h>
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

#define pii pair<int,int>
#define dist(a,b,c,d) abs((a)-(c))+abs((b)-(d))
#define MAX 50

int N,M, tmp;
vector<pii> C, H;
int ans = 987654321;

int main(){
    scanf("%d %d", &N,&M); 
    for(int i = 0 ; i <N;i++){
        for(int j = 0 ; j<N;j++){
            scanf("%d", &tmp);
            if(tmp==1) H.push_back({i,j});
            else if (tmp==2) C.push_back({i,j});
        }
    }

    vector<int> temp;
    int H_size = H.size();
    int C_size = C.size();
    for(int i = 0 ; i < C_size;i++) 
        temp.push_back((i<M)?(1):(0));

    do {
        vector<pii> selected;
        int sum = 0;

        for (int i = 0; i < C.size(); ++i)
            if (temp[i] == 1)
                selected.push_back(C[i]);

        for(int i = 0 ; i <H_size; ++i){
            int t_sum = 987654321;
            for(int j = 0 ; j<M; ++j)
                t_sum = min(t_sum, dist(H[i].first, H[i].second,selected[j].first, selected[j].second));
            sum += t_sum;
        }

        ans = min(ans,sum);
    } while (prev_permutation(temp.begin(), temp.end()));

    printf("%d\n", ans);
}