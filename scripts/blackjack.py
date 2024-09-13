import random
import sys
 
cash = 250
cashC = 00
 
 
 
 
def guessJob():
    global cash
 
    randomNum = random.randint(1,15)
    guess = int(input("Guess the number from 1 - " + "15:"))
    if guess == randomNum:
        cash += 150
        print("YOU WON!!")
        print("Your cash is now: $" + str(cash))
        choices()
    else:
        cash -= 25
        print("You lost! Cash is now: $" + str(cash))
        print("Number was: " + str(randomNum))
        choices()
 
def slotsJob():
    global cash
 
    amount = int(input("How much do you want to gamble?"))
    if cash < amount:
        print("You are too poor to bet this much, please try again.")
        slotsJob()
 
    machinePrint = ""
 
    machinePrint += str(random.randint(1,4))
    machinePrint += str(random.randint(1,4))
    machinePrint += str(random.randint(1,4))
 
    print(machinePrint)
 
    if machinePrint == "111" or machinePrint == "222" or machinePrint == "333" or machinePrint == "444":
        cash += amount * 15
        print("YOU WON THE JACKPOT!!! Your cash is now: $" + str(cash))
        choices()
    else:
        cash -= amount
        print("You lost, unlucky! Your cash is now: $" + str(cash))
        choices()
 
 
def bjJob():
    global cash
 
    amount = int(input("How much do you want to gamble?"))
    if cash < amount:
        print("You are too poor to bet this much, please try again.")
        bjJob()
 
    cardValue = random.randint(2,21)
 
    while True:
        print("You have: " + str(cardValue))
        choice = str(input("Would you like to hit or stay?"))
        if choice == "hit":
            cardValue += random.randint(1,11)
            if cardValue > 21:
                print("You have: " + str(cardValue))
                cash -= amount
                print("You lost, unlucky! Your cash is now: $" + str(cash))
                choices()
        if choice == "stay":
            botValue = random.randint(16,21)
            print("Bot had: " + str(botValue))
            if cardValue > botValue and cardValue <= 21:
                cash += amount * 1.5
		    
                print("You won! Congratulations, you now have: $" + str(cash))
                choices()
            elif cardValue > 21 or cardValue <= botValue:
                cash -= amount
                print("You lost, unlucky! Your cash is now: $" + str(cash))
                choices()
   
   
 
 
 
 
def choices():
    decision = input("What do you want to do? (work, buy, sell, quit(ONLY IF YOU WANT TO LEAVE PROGRESS DOESNT SAVE))").lower()
 
    if decision == "work":
        job = input("What do you want to do? (guess, slots, blackjack)")
 
        if job == "guess":
            guessJob()
        elif job == "slots":
            slotsJob()  
        elif job == "blackjack":
            bjJob()
        else:
            choices()
    elif decision == "quit":
        print("Goodbye! Hope you had fun :)")
        sys.exit()
    else:
        choices()  
 
choices()


























