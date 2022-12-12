import sys
input = sys.stdin.readline
N,M=map(int, input().split())
pos=sorted(list(map(int, input().split()))+[0])
ans,pivot=0,pos.index(0)
for i in range(0,pivot,M):
    ans+=abs(pos[i]*2)
for i in map(abs,range(-N,-pivot,M)):
    ans+=pos[i]*2
ans-=max(abs(pos[0]),abs(pos[N]))
print(ans)