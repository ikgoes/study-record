#include <stdio.h>
#include <algorithm>
using namespace std;

char arr[2190][2190];
char base[3][3] = {{'*','*','*'},{'*',' ','*'},{'*','*','*'}};

void printStar(int n, int row, int col){
    if(n==3){
        for(int i = 0 ; i < 3;i++)
            for(int j = 0; j< 3 ;j++)
                arr[row+i][col+j] = base[i][j];
        return;
    }
    int div = n/3;
    for(int i = 0; i< 3;i++)
        for(int j =0; j<3; j++)
            if(i != 1 || j!= 1)
                printStar(div,row + div*i ,col + div*j);
}

int main(){
    int N;
    scanf("%d",&N);
    fill(&arr[0][0], &arr[N][N],' ');
    printStar(N,0,0);

    for(int i = 0 ; i<N;i++){
        for(int j = 0 ; j<N;j++)
            printf("%c",arr[i][j]);
        printf("\n");
    }
}