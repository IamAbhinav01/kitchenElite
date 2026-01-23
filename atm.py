class ATM:
    def __init__(self,balance=0):
        self.balance = balance
    def deposit(self,amount):
        self.balance += amount
        print(f" Successfully deposited ₹{amount}")
    def withdraw(self,amount):
        if self.balance < amount:
            print(' Insufficient Balance')
        else:
            self.balance -= amount
            print(f" Successfully withdrew ₹{amount}")
    def peeking(self):
        print(f' your current balance is {self.balance}')

my_atm = ATM(20000)

while 1:
    print('\n' + '='*20)
    print('WELCOME TO ATM')
    print('1: Balance Enquiry')
    print('2: Deposit')
    print('3: Withdraw')
    print('4: Exit')
    
    try:
        press = int(input("\nSelect an option: "))
        
        if press == 1:
            my_atm.peeking()

        elif press == 2:
            amount = float(input("Enter amount to deposit: "))
            my_atm.deposit(amount)

        elif press == 3:
            amount = float(input("Enter amount to withdraw: "))
            my_atm.withdraw(amount)

        elif press == 4:
            print("Thank you for using our ATM. Goodbye!")
            break  

        else:
            print("Invalid selection. Please try again.")
            
    except ValueError:
        print("Please enter a valid number.")
    










