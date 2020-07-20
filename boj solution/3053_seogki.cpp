#include <stdio.h>
#define _USE_MATH_DEFINES
#include <math.h>

int main(){
    double radius;
    scanf("%lf",&radius);
    printf("%6f \n %6f", M_PI * radius * radius, 2*radius*radius);
    return 0;
}