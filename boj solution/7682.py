import sys
input = sys.stdin.readline

while True:
    a = input()
    if a == 'end':
        break
    
    a = list(a)
    O = a.count('O') #79
    X = a.count('X') #68
    dot = a.count('.') #46

    win_bit = '11000000,000111000,000000111,100100100,010010010,001001001,100010001,001010100'
    win_bit = win_bit.split()
    win_bit = list(map(list,win_bit))

    def check_any_win(board,L):
        for check in win_bit:
            t = []
            for idx, i in enumerate(check):
                if i=='1':
                    t.append(board[idx])
            if t==[L,L,L]:
                return L
        return False
    
    if O>X: print("invalid");continue
    if dot==0:
        if X==0+1:
            print("valid" if check_any_win(a,'O') else "invalid")
            continue

    if dot%2==1:
        if X==O+1 and check_any_win(a,'X')=='X' and check_any_win('O')==False:
            print("valid")
            continue
    else:
        if X==O and check_any_win(a,'O')=='O' and check_any_win(a,'X')==False:
            print("valid")
            continue
    print("invalid")

            
- .가 없다면. 아래의 조건을 만족 안하면 Avail = False
1) X가 O보다 개수가 1개가 많은지 확인한다. 아니라면
2) 3개의 연속된 O가 있다면


- .가 짝수개 && 0이 아니라면 -> X가 이겨야 한다. 아래의 조건을 만족 안하면 Avail = False
1) X가 O보다 개수가 1개 많은지 확인한다
2) 연속된 3개의 X가 1개 있는지 확인한다
3) 연속된 3개의 O가 0개 인지 확인한다


- .가 홀개 -> O가 이겨야 한다. 아래의 조건을 만족 안하면 Avail = False
1) O와 X의 개수가 같은지 확인한다
2) 연속된 3개의 O가 1개 있는지 확인한다
3) 연속된 3개의 X가 0개 인지 확인한다

 