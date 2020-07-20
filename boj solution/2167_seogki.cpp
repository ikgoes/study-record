#include<stdio.h>
int dp[302][302];
int main()
{
    int N,M,NUM,CNT,I,J,X,Y;
    scanf("%d %d",&N,&M);
    for (int i = 1; i <= N; i++)
        for(int j= 1 ;j<=M;j++)
        {
            scanf("%d",&NUM);
            dp[i][j] = dp[i-1][j] + dp[i][j-1] - dp[i-1][j-1] + NUM;
        }
    scanf("%d",&CNT);
    while(CNT--){
        scanf("%d %d %d %d", &I,&J,&X,&Y);
        printf("%d\n",dp[X][Y] -dp[X][J-1]-dp[I-1][Y]+dp[I-1][J-1]);
    }
}