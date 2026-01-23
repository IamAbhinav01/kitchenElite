# ask = int(input("Enter a number to print its multiplication table: "))

# for i in range(1, 11):
#     result = ask * i
#     print(f"{ask} x {i} = {result}"


# for i in range(1, 6):
#     for j in range(1, 6-i):
#         print(j, end=' ')
#     print()
        
# def factorial(n):
#     if n == 0 or n == 1:
#         return 1
#     return n*factorial(n-1)


# print(factorial(5))




def fibbionacci(s,e):
    a, b = 0, 1

    for _ in range(s):
        a, b = b, a + b


    for _ in range(s, e):
        print(a, end=' ')
        a, b = b, a + b

print(fibbionacci(2,10))
    
def greet(name):
    return name
def show(name):
    print(f"Hello, {name}")

    