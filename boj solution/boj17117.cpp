#include<stdio.h>
#include<string.h>

#define MAX 50
int R,C,T;
int MAP[MAX][MAX], next[MAX][MAX];
int dx[4] = {0,0,1,-1};
int dy[4] = {1,-1,0,0};

int main(){
    scanf("%d %d %d", &R,&C,&T);
    for(int i = 0 ; i < R; ++i)
        for(int j = 0 ; j < C; ++j)
            scanf("%d", &MAP[i][j]);
    
    while(T--){
        memset(next, 0, sizeof(next));
        for(int i = 0 ; i < R; ++i)
            for(int j = 0 ; j < C; ++j){
                int count = 0;
                if(MAP[i][j] == -1)
                    continue;
                for(int k=0; k<4;++k){
                    int nx = i+dx[k];
                    int ny = j+dy[k];
                    if(nx<0 || ny <0 || nx == R || ny == C || MAP[i][j] == -1)
                        continue;
                    next[nx][ny] += (MAP[i][j]%5);
                    count++;
                }
                printf("%d\n", count);
                next[i][j] = MAP[i][j] - (count * (MAP[i][j]%5));
            }
        
        for(int i = 0 ; i < R; ++i)
            for(int j = 0 ; j < C; ++j)
                MAP[i][j] = next[i][j];
    }

    printf("MAP--\n");
    
    for(int i = 0 ; i < R; ++i){
        for(int j = 0 ; j < C; ++j){
            printf("%d ", MAP[i][j]);
        }
        printf("\n");
    }
    return 0;
}