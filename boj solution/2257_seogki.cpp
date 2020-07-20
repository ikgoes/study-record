#include<stdio.h>
#pragma warning(disable : 4996)

int sum, tmp, last;
bool bracket;

int main() {
	char c;
	//for (; scanf("%c", &c) != EOF;) {
	for (int i = 0; i < 7; i++) {
		scanf("%c", &c);
		if (c == '(') {
			bracket = 1;
			continue;
		}
		else if (c == ')') {
			bracket = 0;
			sum += tmp;
			last = tmp;
			tmp = 0;
			continue;
		}
		else if (c >= 50 && c <= 57) {
			sum += last * (c - 48 - 1);
			continue;
		}
		if (!bracket) {
			if (c == 'H')
				last = 1;
			else if (c == 'C')
				last = 12;
			else if (c == 'O')
				last = 16;
			sum += last;
		}
		else {
			if (c == 'H')
				tmp += 1;
			else if (c == 'C')
				tmp += 12;
			else if (c == 'O')
				tmp += 16;
		}
	}
	printf("%d\n", sum);
	return 0;
}