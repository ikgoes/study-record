import sys
from heapq import heappush, heappop
input = sys.stdin.readline

N = int(input())
heap = list()

for i in range(N):
    T = int(input())
    if T==0:
        print('0' if len(heap)==0 else heappop(heap))
    else:
        heappush(heap, T)