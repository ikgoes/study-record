import sys
input = sys.stdin.readline

def count_squares(curves):
    squares = set()
    for curve in curves:
        x, y, d, g = curve
        path = [(x, y)]
        direction = d
        for i in range(g):
            n = len(path)
            for j in range(n - 1, -1, -1):
                x, y = path[j]
                if direction == 0:
                    path.append((x + 1, y))
                elif direction == 1:
                    path.append((x, y - 1))
                elif direction == 2:
                    path.append((x - 1, y))
                else:
                    path.append((x, y + 1))
                direction = (direction + 1) % 4
        for i in range(len(path) - 1):
            x1, y1 = path[i]
            x2, y2 = path[i + 1]
            x_min, x_max = min(x1, x2), max(x1, x2)
            y_min, y_max = min(y1, y2), max(y1, y2)
            for x in range(x_min, x_max):
                for y in range(y_min, y_max):
                    squares.add((x, y))
    return len(squares)


n = int(input().strip())
curves = []
for i in range(n):
    x, y, d, g = map(int, input().strip().split())
    curves.append((x, y, d, g))

print(count_squares(curves))
