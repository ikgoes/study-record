#include<iostream>
#include<regex>
#include<string>
using namespace std;

int T;

int main(){
    scanf("%d",&T);
    while(T--){
        string pat;
        cin>>pat;
        printf("%s\n", regex_match(pat,regex("(100+1+|01)+"))?"YES":"NO");
    }
}