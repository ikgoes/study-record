#include <stdio.h>
#include <queue>
using namespace std;

#define MAX 3000
#define pbi pair<pair<bool,int>,int>

struct compare{
    bool operator()(pbi a, pbi b){
        return a.second > b.second;
    }
};

int main(){
    int n, sum=0;
    int arr[MAX+1];
    pbi diff[MAX+1];
    bool check[MAX+1];
    scanf("%d", &n);
    
    for(int i = 0; i<n;i++)
        scanf("%d", &arr[i]);
    
    for(int i = 0; i<n;i++){
        if(i==0)
            diff[i] = {{true,i},(arr[i+1] - arr[i])};
        else if(i==n-1)
            diff[i] = {{false,i},(arr[i]-arr[i-1])};
        else{
            if((arr[i]-arr[i-1]) > (arr[i+1]-arr[i]))
                diff[i] = {{true,i},arr[i+1]-arr[i]};
            else
                diff[i] = {{false,i},arr[i]-arr[i-1]};
        }    
    }

    priority_queue<pbi, vector<pbi>, compare> pq;
    for(int i=0;i<n;i++)
        pq.push(diff[i]);
    
    while(!pq.empty()){
        pbi top = pq.top();
        int direction = top.first.first;  
        int index = top.first.second; 
        int amount = top.second;
        pq.pop();
        if(check[index]==true)
            continue;
        check[index] = true;
        
        // true -> right딘
        if(direction)
            check[index+1] = true;
        else
            check[index-1] = true;
        
        sum += amount * amount;
    }
    
    printf("%d\n",sum);
    return 0;  
}