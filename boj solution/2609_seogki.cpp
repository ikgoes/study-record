#include<stdio.h>

int gcd(int a, int b){
	return b ? gcd(b, a%b) : a;
}
int lcm(int a, int b){
    return a * b / gcd(a,b);
}
int main(){
    int A,B;
    scanf("%d %d",&A,&B);
    printf("%d \n%d",gcd(A,B),lcm(A,B));
}