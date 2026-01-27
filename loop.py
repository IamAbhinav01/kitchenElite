# # ask = int(input("Enter a number to print its multiplication table: "))

# # for i in range(1, 11):
# #     result = ask * i
# #     print(f"{ask} x {i} = {result}"


# # for i in range(1, 6):
# #     for j in range(1, 6-i):
# #         print(j, end=' ')
# #     print()
        
# # def factorial(n):
# #     if n == 0 or n == 1:
# #         return 1
# #     return n*factorial(n-1)


# # print(factorial(5))




# # def fibbionacci(n): 

# #     if(n<=1):
# #         return n
# #     return fibbionacci(n-1) + fibbionacci(n-2)

# # print(fibbionacci(7))

# #     a, b = 0, 1

# #     for _ in range(s):
# #         a, b = b, a + b


# #     for _ in range(s, e):
# #         print(a, end=' ')
# #         a, b = b, a + b

# # print(fibbionacci(2,10))
    
# # def greet(name):
# #     return name
# # def show(name):
# #     print(f"Hello, {name}")

# # for i in range(1,10):
# #     print_square = lambda x:x*x
# #     print(print_square(i))



# # a = 10
# # b = 20
# # c = 30

# # if a > b and a > c:
# #     print("a is the largest")
# # elif b > a and b > c:
# #     print("b is the largest")
# # else:
# #     print("c is the largest")

# # list1 = [1, 2, 3, 4, 5]
# # list2 = [6, 7, 8, 9, 10]


# # max1 = list1[0]
# # max2 = list1[0]
# # for i in list1:
# #     if i > max1:
# #         max1 = i
# # for j in list2:
# #     if j > max2:
# #         max2 = j 

    
# # def is_even(n):
# #     return n % 2 == 0

# # n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# # en = filter(is_even, n)
# # print(list(en))

# # def double(n):
# #     return n * 2

# # n = [5, 6, 7, 8]
# # res = map(double, n) 
# # print(list(res))

# #Q1

# s = "programming"
# ## without inbuilt function
# def count_frequency(s):
#     freq = {}
#     for char in s:
#         if char in freq:
#             freq[char] += 1
#         else:
#             freq[char] = 1
#     return freq

# print(count_frequency(s))

# print('\n')
# #Q2
# s = "Python is great"
# # print(s.split(' '))
# # res = ' '.join(reversed(s.split('')))
# # print(res)

# def reverse_words(s):
#     words = s.split(' ')
#     for i in words: 
#         print(i[::-1], end=' ')
# reverse_words(s)


# #Q3

# print('\n')
# #using *args
# def multiply(*args):
#     result = 1
#     for num in args:
#         if type(num) == int :
#             result *= num
#     return result

# print(multiply(2, 3,'a', 4))


# #Q4
# #lambda filter map
# ## fidn even num and sqaure them
# arr1 = [1,2,3,4,5,6]
# def solve(arr):
#     even_nums = list(filter(lambda x: x % 2 == 0, arr1))
#     squared_even_nums = list(map(lambda x: x ** 2, even_nums))
#     return squared_even_nums
# print(solve(arr1))
# print('\n')

# #Q5
# # longest word in a string

# ss = "I love programming in Python"

# def longest_word(s):
#     word = s.split(' ')
#     longest = ' '
#     for i in word:
#         if(len(i) > len(longest)):
#             longest = i

#     return longest
# print(longest_word(ss))


# #Q6
# #Checking Anagrams
# def anagrams(s1,s2):
#     s1 = s1.replace(" ", "").lower()
#     s2 = s2.replace(" ", "").lower()
    
#     return sorted(s1) == sorted(s2)
# print(anagrams("Listen", "Silent"))
# print('\n')

# #Q8
# lst = [1,22,3,5,5,7]

# def remove_duplicates(arr1):
#     sett = set()
#     for i in arr1:
#         sett.add(i)
#     return sett
# print(remove_duplicates(lst))

# #Q9
# #i/p  [1,2,3,4],[3,4,5,6] o/p -->[3,4]
# def common_elements(arr1,arr2):
#     return (arr1 & arr2);
# #Q10
# #rotate by k pos

# # arr1 = [1,2,3,4,5]
# # k = 2

# #Q11
# # n = 5;
# # sum = 5 *(5 + 1)/2
# # print(sum)
# def missing_elem(arr1):
#     summ= 0
#     n = len(arr1) + 1
#     for i in arr1:
#         summ+=i;
#     tsm = int(n*(n+1)/2)
#     return tsm - summ
# print(missing_elem([1,2,3,5]))
#  #Q12
# import copy 
# a = [[10,20],[30,40]]
# b = copy.deepcopy(a)
# b[0][0]
# print(a)
# # print(b)
# def welcome(func):
#     def fc():
#         print(f"Hi, Welcome , ")
#         func()
#     return fc
# @welcome
# def showname():
#     print("Abhinav")
# showname()

## print specific time and date with help of time and date module
import random


guess = random.randint(1,10)
score = 10
attempts = 0
while score > 0 and score < 50:
    num = int(input("Guess the number from 1 - 10 :"))
    attempts+=1
    if(num == guess):  
        print("Congats you are great") 
        score+=10
        
    elif(num > guess): 
        print("Your guess is too strong")
        score-=5
      
    else: 
        print("Too weak")
print("Your score is : ",score)
print("No of Attempets: ",attempts)

