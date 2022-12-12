def inMap(n, m, a, b):
    return ((a>=0) and (a<n) and (b>=0) and (b<m))

def rollDice(dice, direc):
    U, E, W, N, S, B = dice
    roll = [[], [W, U, B, N, S, E], [E, B, U ,N, S, W], [S, E, W, U, B, N], [N ,E, W, B, U, S]]
    return roll[direc]
    
n,m,x,y,k = list(map(int,input().split()))

arr = list()
for i in range(n):
    arr.append(list(map(int, input().split())))

direction = [[],[0,1],[0,-1],[-1,0],[1,0]]
dice = [0,0,0,0,0,0] # top,-,-,-,-,bottom

for cmd in map(int, input().split()):
    dx, dy = direction[cmd]
    nx, ny = x+dx, y+dy
    
    if not inMap(n,m,nx,ny):
        continue
    
    dice = rollDice(dice, cmd)
    
    if arr[nx][ny] == 0:
        arr[nx][ny] = dice[-1]
    else:
        dice = dice[:-1] + [arr[nx][ny]]
        arr[nx][ny] = 0
        
    print(dice[0])
    x, y = nx, ny