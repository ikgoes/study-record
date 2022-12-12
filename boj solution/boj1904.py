n = int(input())
arr = [0] * 4

arr[1] = 1
arr[2] = 2

for i in range(3,n+1):
    arr[i%4] = (arr[(i-1)%4] + arr[(i-2)%4])%15746
    
print(arr[n%4]%15746)