#include<stdio.h>

long long int dp[91]={0,1,};

int main(){
    int n;
    scanf("%lld",&n);
    for(int i=2; i<=n;i++)
        dp[i]=dp[i-1]+dp[i-2];
    printf("%lld\n",dp[n]);
}