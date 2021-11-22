#include <iostream>
#include <stack>
#define MAX 50
#define pii pair<int,int>
using namespace std;

string arr;
int temp;

int main(){
    stack<pii> st;
    cin >> arr;
    int len = arr.length();

    for(int i = 0; i<len; i++){
        if(arr[i+1] == '('){
            st.push({temp, arr[i]-'0'});
            temp = 0;
        }else if (arr[i] == ')'){
            pii top = st.top();
            st.pop();
            temp = temp * top.second + top.first;            
        }else if (arr[i]-'0' >= 0 && arr[i] -'0' <=9){
            temp++;
        }
    }
    printf("%d\n", temp);
}