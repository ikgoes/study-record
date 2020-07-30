#include <stdio.h>
#include <math.h>
int N, R, C, cnt, size;

int main() {
	scanf("%d %d %d", &N, &R, &C);
	while (N) {
		size = pow(2, N) / 2;
		int tmp;
		if (C < size && R < size)
			tmp = 0;
		else if (C >= size && R < size)
			tmp = 1;
		else if (C < size && R >= size)
			tmp = 2;
		else if (C >= size && R >= size)
			tmp = 3;
		C = C % size;
		R = R % size;

		cnt += pow(size, 2) * tmp;
		N--;
	}
	printf("%d\n", cnt);
	return 0;
}