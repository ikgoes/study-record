// 20041
#include<stdio.h>
#include<iostream>
using namespace std;

#define lld long long int
#define pll pair<lld,lld>
#define MAXDIS 2000000000
#define MAX 500000


int dx[4] = {0,0,1,-1};
int dy[4] = {1,-1,0,0};

int main(){
    printf("nice to meet you");
    int n;
    bool caught[4];
    pll check[4];
    pll arr[MAX + 1];
    lld x,y;
    
    scanf("%d", &n);
    for(int i =0; i<n;i++){
        scanf("%lld %lld",&x,&y);
        arr[i] = {x,y};
    }
    scanf("%lld %lld", &x,&y);
    
    for(int i=0;i<4;i++){
        lld nx = x+dx[i]*MAXDIS;
        lld ny = y+dy[i]*MAXDIS;
        check[i] = {nx,ny};
    }
    
    for(int i=0; i<4;i++){
        for(int j=0;j<n;j++){
            lld nx = arr[j].first;
            lld ny = arr[j].second;
            //lld dist = abs(check[i].first-nx) + abs(check[i].second -ny);
            lld dist = 0;
            if(dist<=MAXDIS)
                caught[i] = true;
                break;    
        }
    }
    
    int res=0;
    for(int i =0;i<4;i++){
        res += caught[i]?1:0;
    }
    
    printf("%s\n", res==4?"NO":"YES");
}