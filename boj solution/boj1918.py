s = input()
st = []
for c in list(s):
    if c.isalpha():
        print(c, end='')
    else:
        if c=='(':
            st.append(c)
        elif c=='*' or c=='/':
            while len(st) > 0 and (st[-1]=='*' or st[-1]=='/'):
                print(st.pop(), end='')
            st.append(c)    
        elif c=='+' or c=='-':
            while len(st) > 0 and st[-1] != '(':
                print(st.pop(), end='')
            st.append(c)
        elif c ==')':
            while len(st) > 0 and st[-1] != '(': 
                if st[-1] != '(':
                    print(st.pop(), end='')
                else:
                    st.pop()
            st.pop()
        
print(''.join(st[::-1]), end='')