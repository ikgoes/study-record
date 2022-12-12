from math import ceil
from functools import reduce

_,A,[B,C]=eval('map(int,input().split()),'*3)
print(reduce(lambda a,c: a+(ceil((0 if (c-B)<0 else c-B)/C) + 1), A, 0))