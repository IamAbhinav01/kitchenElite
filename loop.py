# ask = int(input("Enter a number to print its multiplication table: "))

# for i in range(1, 11):
#     result = ask * i
#     print(f"{ask} x {i} = {result}"


# for i in range(1, 6):
#     for j in range(1, 6-i):
#         print(j, end=' ')
#     print()
        
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n*factorial(n-1)


print(factorial(5))