from math import radians,tan
def grad(g):
    def f(x):
        return g*x  
    return f
def dist(Px,Py,Bx,By):
    area = abs((0-Px)*(By-Py)-(0-Py)*(Bx-Px))
    AB = ((0-Bx)**2+(0-By)**2)**0.5
    return (area/AB)
N=int(input())
for _ in range(N):
    T,X=map(float, input().split())
    f = grad(tan(radians(X)))
    pin = 0
    while abs(pin-f(T))>0.525:
       pin+=1.05
    print('yes' if dist(T,pin,T+1,f(T+1))<0.06+0.1 else 'no')
