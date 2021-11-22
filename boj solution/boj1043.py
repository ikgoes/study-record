def find_parent(parent, x):
    if parent[x] != x:
        return find_parent(parent, parent[x])
    return parent[x]

def union_parent(parent, a, b):
    a = find_parent(parent, a)
    b = find_parent(parent, b)
    if a < b:
        parent[b] = a
    else:
        parent[a] = b

n, m = input().split(' ')
n, m = int(n), int(m)
truth_n, *truth_list = input().split(' ')
truth_n = int(truth_n)
truth_list = list(map(int, truth_list))
check_truth = [0] * (n+1)
p_list = []
for i in truth_list:
    check_truth[i] = 1

if truth_n == 0:
    print(m)
else:
    parent = [0] * (n+1)
    for i in range(n+1):
        parent[i] = i

    for i in range(m):
        party_n, *party_list = input().split(' ')
        party_n = int(party_n)
        party_list = list(map(int, party_list))
        p_list.append(party_list)

        if party_n > 1:
            for t in range(party_n-1):
                union_parent(parent, party_list[t], party_list[t+1])
    
    check = dict()
    okay = set()
    cnt = 0
    for i in range(1,n+1):
        if i==parent[i]:
            check[i] = {'num':1, 'list':[i]}
        else:
            p = find_parent(parent, i)
            check[p]['num'] += 1
            check[p]['list'].append(i)

    for i in check.keys():
        if len(set(check[i]['list'])-set(truth_list)) == check[i]['num']:
            for j in check[i]['list']:
                okay.add(j)
    
    for i in p_list:
        if len(set(i)-okay) == 0:
            cnt+=1
    print(cnt)