#include<stdio.h>

int dp[11]={0,1,2,4,};

int main(){
    int T,N;
    scanf("%d",&T);
    while(T--){
        scanf("%d",&N);
        for(int i = 4; i<=N ; i++)
            dp[i] = dp[i-1] + dp[i-2] + dp[i-3];
        printf("%d\n",dp[N]);
    }
}
