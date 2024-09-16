import wikipedia 
#from IPython.display import display, Markdown # add for Jupyter

def askPrompt():
    uinput = input("Search: ").lower()
    if uinput:
        search(uinput)
    

def search(prompt):
    result = wikipedia.search(prompt)
    # Get the summary of the first result
    summary = wikipedia.summary(result[0])
    print(prompt) 
    print(summary) # console display
    #display(Markdown(summary)) # Jupyter display
    askPrompt()
askPrompt()