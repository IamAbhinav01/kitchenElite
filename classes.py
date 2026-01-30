# #Q1
# import random
# import string
# import regex as re
# class Generator:
#     def six_digit_otp(self):
#         s = ""
#         otp_digits = [str(random.randint(0, 9)) for i in range(6)]
#         otp = ''.join(otp_digits)
#         return otp
#     def eight_alphanum(self):
#         s=''
#         characters = string.ascii_letters + string.digits
#         s = ''.join(random.choice(characters) for i in range(8))
#         return s
    
# generator = Generator()
# print(generator.six_digit_otp())
# print(generator.eight_alphanum())

# #Q2
# class Validator:


#     def email_validator(self, email):
#         regex = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}"
#         print(f"{email} is a Valid Email" if re.fullmatch(regex, email) else f"{email} isInvalid Email")

#     def check_all_email(self,*emails):
#         for email in emails:
#             self.email_validator(email)

#     def password_validator(self,password):
#         return "Strong Password" if (re.fullmatch(r'^[A-Za-z0-9@#$%^&+=]{8,}$', password)) else "Weak Password"


# validator = Validator()
# validator.check_all_email("abhinavsunilhotmail.com","abhinavsunil@hotmail.com")

# #Q3
# print(validator.password_validator("B0c'8£M0)s+"))

# #Q4

# def roll_dice():
#     return "You Win " if random.randint(1, 7) == 6 else "Try again"

# print(roll_dice())

# #Q5
# def count_occurences_in_string(s):
#     char_counts = {}
#     for char in s:
#         if char.isalpha():
#             char = char.lower()
#         else:
#             continue
#         if char in char_counts:
#             char_counts[char] += 1
#         else:
#             char_counts[char] = 1 

#         result_string = "".join(f"{char}{count}" for char, count in char_counts.items())
#     return result_string

# string_example = "aaabbcccc"
# print(count_occurences_in_string(string_example))

# #Q6
# class Employee:
#     def __init__(self,name):
#         self.name = name
#         self.__salary = 0
#     def set_salary(self,salary):
#         if(salary < 0):
#             raise ValueError("Salary cannot be negative")
#         self.__salary = salary
#     def get_salary(self,name):
#         return f"The Salary of {name} {self.__salary}"
# e1 = Employee('Ramu')
# e1.set_salary(50000)
# print(e1.get_salary('Ramu'))

# #Q7
# class InsufficientBalanceError(Exception):
#     pass
# class Bank(InsufficientBalanceError):
#     def __init__(self,name):
#         self.name = name
#         self.__balance = 0
#     def deposit(self,amount):
#         if amount <= 0:
#             raise ValueError("Deposit amount must be positive")
#         self.__balance +=amount
#     def withdraw(self,amount):
#         if(self.__balance < amount):
#             raise InsufficientBalanceError("Insufficient funds")
#         if amount <= 0:
#             raise ValueError("Withdrawal amount must be positive")
#         self.__balance -=amount
#     def get_balance(self):
#         return self.__balance
    
# bank = Bank('Abhinav')
# bank.deposit(1000)
# bank.withdraw(500)
# print(bank.get_balance())

# #Q8
# class Student:
#     def __init__(self, name, marks=None): 
#         self.name = name
#         self.__marks = marks
    
#     def get_details(self):
#         if self.__marks is not None:
#             return f"The Student name is {self.name} and marks are {self.__marks}"
#         else:
#             return f"The Student name is {self.name} and marks are not available"
# s1 = Student('Abhinav',90)
# print(s1.get_details())
# s2 = Student('Avin')
# print(s2.get_details())

# #Q9
# class Payment:
#     def pay(self):
#         print("Paying the bill")
# class UPI(Payment):
#     def __init__(self,upi_id):
#         self.upi_id = upi_id

#     def Transfer(self,amount):
#         print(f"{amount} is transferred to {self.upi_id}")
# class CreditCard(Payment):
#     def __init__(self,card_number):
#         self.card_number = card_number

#     def Transfer(self,amount):
#         print(f"{amount} is transferred to {self.card_number}")
# pay = UPI(5245)
# pay.pay()
# pay.Transfer(1000)
# p = CreditCard(256987456)
# p.pay()
# p.Transfer(5000)
        

# #Q10

class Example:
    class_variable = "I'm shared across all instances"
    
    def __init__(self, instance_var):
        self.instance_var = instance_var
    
    @classmethod
    def class_method(cls):
        print(f"Class method accessing class variable: {cls.class_variable}")
        return cls("Created via class method")
    
    @staticmethod
    def static_method():
        print("Static method can't access class or instance variables directly")
        return "Static result"
    
    def instance_method(self):
        print(f"Instance method accessing instance var: {self.instance_var}")


example = Example("instance value")


Example.class_method()  

Example.static_method()  
example.instance_method()  