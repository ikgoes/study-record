#include<stdio.h>

long long int t[36]={1,1,2,5,};
int N;
int main(){
    scanf("%d",&N);
    for(int i = 4 ;i <= N; i++)
        for(int j = 0; j< i; j++)
                t[i] += t[j] * t[i-1-j];
    printf("%lld",t[N]);
}