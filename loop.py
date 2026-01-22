# ask = int(input("Enter a number to print its multiplication table: "))

# for i in range(1, 11):
#     result = ask * i
#     print(f"{ask} x {i} = {result}"


for i in range(1, 6):
    for j in range(1, 6-i):
        print(j, end=' ')
    print()
        
