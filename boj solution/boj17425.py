import sys
input = sys.stdin.readline
MAX = 1_000_001

dp = [0 for _ in range(MAX)]
for i in range(1, MAX):  # O(n)
    for j in range(i, MAX, i): # O(log n)
        dp[j] += i
    dp[i] += dp[i-1]
    
t = int(input())
for _ in range(t):
    n = int(input())
    print(dp[n])