string = input()   
bomb = input()      

last = bomb[-1] 
stack = []
length = len(bomb)  

for char in string:
    stack.append(char)
    if char == last and ''.join(stack[-length:]) == bomb:
        del stack[-length:]

answer = ''.join(stack)

print(answer if answer else 'FRULA')