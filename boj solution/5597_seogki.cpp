#include <stdio.h>
using namespace std;

bool arr[31];

int main(){
    int att;
    for(int i = 0; i< 28 ; i++)
    {
        scanf("%d",&att);
        arr[att] = 1;
    }
    for(int i = 1 ; i< 31;i++)
        if(!arr[i])
            printf("%d\n",i);
    return 0;
}