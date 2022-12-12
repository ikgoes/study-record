#include<stdio.h>

int x1,y1,x2,y2,x3,y3;

int main(){
    scanf("%d %d %d %d %d %d", &x1,&y1,&x2,&y2,&x3,&y3);

    int t1 = (y2-y1)*(x3-x1) + y1*(x2-x1);
    int t2 = (x2-x1)*y3;
    printf("%d\n",(t1==t2)?(0):((t1>t2)?(-1):(1)));
}