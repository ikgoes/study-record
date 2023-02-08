import sys
from itertools import combinations

input = sys.stdin.readline
n,m = map(int, input().split())
words = [0] * n
ans = 0

for i in range(n):
    tmp = input().rstrip()
    for x in tmp:
        words[i] |= (1 << (ord(x) - ord('a')))
print(list(map(bin,words)))

if m < 5:
    print(0)
else:
    target = ['a','c','t','i','n']
    candi = ['b','d','e','f','g','h','j','k','l','m','o','p','q','r','s','u','v','w','x','y','z']

    dic = 0 
    for j in target:
        dic |= (1 << (ord(j) - ord('a')))
    
    for i in list(combinations(candi, m - 5)):
        tmp, res = 0, 0

        tmp |= dic
        for j in i:
            tmp |= (1 << (ord(j) - ord('a')))
            
        for j in words:
            if tmp & j == j:
                res += 1
                
        ans = max(ans,res)
    
    print(ans)