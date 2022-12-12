#include <stdio.h>
#define MAX 100000
#define MOD 16769023

int n, sum;
int dp[MAX + 1][3]; // 0: -1 | 1:0 | 2:1
    
int main()
{
    dp[1][0] = 1;
    dp[1][1] = 0;
    dp[1][2] = 1;
    
    scanf("%d", &n);
    for(int i =2 ; i<=n; i++){
        dp[i][0] = dp[i-1][1] % MOD;
        dp[i][1] = (dp[i-1][0] + dp[i-1][2]) % MOD;
        dp[i][2] = dp[i-1][1] % MOD;
    }
    
    for(int i = 0; i<3; i++)
        sum += dp[n][i];
        
    printf("%d\n", sum % MOD);
    return 0;
}
