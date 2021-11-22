#include <stdio.h>
#define MAX 500

int map[MAX + 1];
int temp, sum;

int main(){
    int H,W;
    scanf("%d %d", &H,&W);
    for(int i = 0 ; i<W; i++)
        scanf("%d", &map[i]);

    for(int i = H; i >= 0; i--){
        int cnt = 0;
        for(int j = 0; j < W; j++){
            if(map[j] >= i){
                cnt++;
                if(cnt >= 2)
                    sum += (j - temp - 1);
                temp = j;
            }
        }
    }
    
    printf("%d\n", sum);
}