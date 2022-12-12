// Example program
#include <iostream>
#include <string>
#include <math.h>
using namespace std;

int main()
{
    int n;
    int arr[225];
    scanf("%d",&n);
    int MAX = (int)sqrt(n) + 1;
    for(int i=0;i< MAX;i++){
        arr[i] = i*i;
    }
    
    // choose one
    for(int i =1 ; i< MAX; i++){
        if(n==arr[i]){
            printf("1\n"); 
            return 0;
        } 
    }
    
    // choose two
    for(int i =1; i<MAX;i++){
        for(int j = 1 ; j<MAX;j++){
            if(n==arr[i]+arr[j]){
                printf("2\n");
                return 0;
            }
        }
    }
    // choose three
    for(int k = 1; k<MAX;k++){ 
        for(int i =1; i<MAX;i++){
            for(int j = 1 ; j<MAX;j++){
                if(n==arr[i]+arr[j]+arr[k]){
                    printf("3\n");
                    return 0;
                }
            }
        }
    }
    
    printf("4\n");
    return 0;
}
