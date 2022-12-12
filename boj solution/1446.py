import sys
input = sys.stdin.readline

N, D = list(map(int, input().split(' ')))
highway = dict()

for i in range(N):
    start, end, dist = list(map(int,input().split(' ')))
    if end > D or dist >= end-start:
        continue
    if start in highway.keys() and highway[start][0] == end:
        if highway[start][1] > dist:
            highway[start] = [end, dist]
        else:
            continue
    highway[start]=[end,dist]

dp = [0] * (D+1)
dp[0] = 0

#if len(highway)==0:
#    print(D)
#else:
for i in range(1,D+1):
    dp[i] = dp[i-1]+1
    for start in highway.keys():
        end = highway[start][0]
        dist = highway[start][1]
        if end == i:
            dp[i] = min(dp[i], dp[i-(end-start)]+dist)                

print(dp[D])
