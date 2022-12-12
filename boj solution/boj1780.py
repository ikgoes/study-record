import sys
input = sys.stdin.readline

def solve(arr, r, c, N):
    global ans
    cur = arr[r][c]
    
    for i in range(r, r+N):
        for j in range(c, c+N):
            if arr[i][j] != cur:
                n = int(N/3)
                solve(arr, r, c, n) 
                solve(arr, r, c + n, n) 
                solve(arr, r, c + (2 * n), n) 
                solve(arr, r + n, c, n) 
                solve(arr, r + n, c + n, n) 
                solve(arr, r + n, c + (2 * n), n) 
                solve(arr, r + (2 * n), c, n) 
                solve(arr, r + (2 * n), c + n, n) 
                solve(arr, r + (2 * n), c + (2 * n), n)
                return
            
    ans[cur+1]+=1
    return

N = int(input())
arr = []
for _ in range(N):
    r = list(map(int, input().rsplit()))
    arr.append(r)
    
ans = [0,0,0]
solve(arr, 0, 0, N)
print('\n'.join(map(str,ans)))