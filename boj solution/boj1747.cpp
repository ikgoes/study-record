#include<iostream>
#include<string>
#include<math.h>
using namespace std;
#define MAX 1000000

int n;

bool check_prime(int n) { 
    if (n < 2) 
        return false; 
    for (int i = 2; i * i <= n; i++) 
        if (n % i == 0) 
            return false;  
    return true; 
}

bool check_palindrome(int n){
    string str = to_string(n);
    int len = str.length();
    if(len<2)
        return true;
    for(int i = 0; i<(int)(len/2);i++)
        if(str[i] != str[len-1-i])
            return false;
    return true;
}

int main(){
    scanf("%d", &n);

    for(int i = n; i<= MAX * 2; ++i){
        if(check_palindrome(i) && check_prime(i)){
            printf("%d\n", i);
            break;
        }
    }
}