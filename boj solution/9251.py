import sys
input = sys.stdin.readline

a = ' ' + input().strip()
b = ' ' + input().strip()

a_len, b_len = len(a), len(b)

dp = [[0] * (b_len) for _ in range(a_len)]

for i in range(1, a_len):
    a_temp = a[i]
    for j in range(1, b_len):
        b_temp = b[j]
        if a_temp == b_temp:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])

print(dp[a_len - 1][b_len - 1])