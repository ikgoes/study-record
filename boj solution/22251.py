import sys
input = sys.stdin.readline

N,K,P,X = list(map(int,input().split(' ')))

MAT = dict()
MAT[0] = [0,4,3,3,4,3,2,3,1,2]
MAT[1] = [4,0,5,3,2,5,6,1,5,4]
MAT[2] = [3,5,0,2,5,4,3,4,2,3]
MAT[3] = [3,3,2,0,3,2,3,2,2,1]
MAT[4] = [4,2,5,3,0,3,4,3,3,2]
MAT[5] = [3,5,4,2,3,0,1,4,2,1]
MAT[6] = [2,6,3,3,4,1,0,5,1,2]
MAT[7] = [3,1,4,2,3,4,5,0,4,3]
MAT[8] = [1,5,2,2,3,2,1,4,0,1]
MAT[9] = [2,4,3,1,2,1,2,3,1,0]

def make_poss(top):
    return list(map(num_to_str, list(range(1,top+1))))

def num_to_str(n):
    return list(map(int,list(format(n,'0'+str(K)))))

def a_to_b(a,b):
    cnt = 0
    for i in range(len(b)):
        cnt += MAT[a[i]][b[i]]
        print(a,b, a[i], b[i], MAT[a[i]][b[i]], P)
    return cnt

candi = make_poss(N)
target = num_to_str(X)
CNT = 0

for i in candi:
    if P >= a_to_b(target,i):
        CNT += 1

print(CNT)

