import sys
from  difflib import get_close_matches
import os.path
import random
import string
import io
import requests

#converts a string into list of words
def token(string):
    start = 0
    i = 0
    token_list = []
    for x in range(0, len(string)):
        if " " == string[i:i+1][0]:
            token_list.append(string[start:i+1])
            #print string[start:i+1]
            start = i + 1
        i += 1
    token_list.append(string[start:i+1])
    return token_list

#creates a file with random name if not exists
def createfiles():
    fname = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
    exists = os.path.isfile("userData/"+fname)
    if exists:
        fname = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
    return fname 
#save comment in the file
def submitComment(comment):
    with open("" + "comments.txt", 'a') as file2:
        file2.write("<br><br>"+comment+"<br><br><br><br>\n")
    return "yes"
#load all the comments from file
def showComment():
    data = ""
    with open("" + "comments.txt", 'r') as myfile:
        data = myfile.read().replace('\n', '')
    return data
#save user review in file
def submitReviewFile(review, yes, incontext, rhyming):
    with open("" + "reviews.txt", 'a') as file:
        file.write(review + " " + str(yes) + " " + str(incontext) + " " + str(rhyming)+"\n")
        file.close()
    return ""
#load the review result, analyze them and return 
def usability2():
    reviewsCounter = 0
    total = 0
    lastResult = ""
    yesCounter = 0
    inContextCounter = 0
    rhymingCounter = 0
    thisLine = []
    lineWordCounter = 0
    with open('reviews.txt', 'r') as inF:
        for line in inF:
            print line
            lineWordCounter = 0
            reviewsCounter += 1
            thisLine = token(line)
            for metrics in thisLine:
                metrics = metrics.rstrip('\n')
                if(lineWordCounter == 0):
                    total += int(metrics)
                if(lineWordCounter == 1):
                    if(int(metrics) == 1):
                        yesCounter += 1
                if(lineWordCounter == 2):
                    if(int(metrics) > 5):
                        inContextCounter += 1
                if(lineWordCounter == 3):
                    if(int(metrics) > 5):
                        rhymingCounter += 1
                lineWordCounter += 1
    lastResult = str(reviewsCounter) + " " + str(total) + " " + str(yesCounter) + " " + str(inContextCounter) + " " + str(rhymingCounter)
    return lastResult 
#save questionnaire in the file
def submitQuestionnaier(totalPoints,visibility,matching,userControl,consistency,errorPrevention,recognition,flexibility,aesthetic,helpUsers,helpDoc,satisfied):
    with open("" + "questionnaier.txt", 'a') as file:
        file.write(totalPoints + " " + str(satisfied) + " " +  str(visibility) + " " + str(matching) + " " + str(userControl) + " " + str(consistency)+ " " + str(errorPrevention)+ " " + str(recognition)+ " " + str(flexibility)+ " " + str(aesthetic)+ " " + str(helpUsers)+ " " + str(helpDoc)+"\n")
        file.close()
    return ""
#load questionnaire results, analyze them and return
def showQuestionnaierResults():
    reviewsCounter = 0
    total = 0
    lastResult = ""
    visibilityCounter = 0
    matchingCounter = 0
    userControlCounter = 0
    consistencyCounter = 0
    errorPreventionCounter = 0
    recognitionCounter = 0
    flexibilityCounter = 0
    aestheticCounter = 0
    helpUsersCounter = 0
    helpDocCounter = 0
    satisfiedCounter = 0
    thisLine = []
    lineWordCounter = 0
    with open('questionnaier.txt', 'r') as inF:
        for line in inF:
            print line
            lineWordCounter = 0
            reviewsCounter += 1
            thisLine = token(line)
            for metrics in thisLine:
                metrics = metrics.rstrip('\n')
                if(lineWordCounter == 0):
                    total += int(metrics)
                if(lineWordCounter == 1):
                    if(int(metrics) == 1):
                        satisfiedCounter += 1
                if(lineWordCounter == 2):
                    if(int(metrics) > 3):
                        visibilityCounter += 1
                if(lineWordCounter == 3):
                    if(int(metrics) > 3):
                        matchingCounter += 1
                if(lineWordCounter == 4):
                    if(int(metrics) > 3):
                        userControlCounter += 1
                if(lineWordCounter == 5):
                    if(int(metrics) > 3):
                        consistencyCounter += 1
                if(lineWordCounter == 6):
                    if(int(metrics) > 3):
                        errorPreventionCounter += 1
                if(lineWordCounter == 7):
                    if(int(metrics) > 3):
                        recognitionCounter += 1
                if(lineWordCounter == 8):
                    if(int(metrics) > 3):
                        flexibilityCounter += 1
                if(lineWordCounter == 9):
                    if(int(metrics) > 3):
                        aestheticCounter += 1
                if(lineWordCounter == 10):
                    if(int(metrics) > 3):
                        helpUsersCounter += 1
                if(lineWordCounter == 11):
                    if(int(metrics) > 3):
                        helpDocCounter += 1
                lineWordCounter += 1
    lastResult = str(reviewsCounter) + " " + str(total) + " " + str(satisfiedCounter) + " " + str(visibilityCounter) + " " + str(matchingCounter) + " " + str(userControlCounter) + " " + str(consistencyCounter)+ " " + str(errorPreventionCounter)+ " " + str(recognitionCounter)+ " " + str(flexibilityCounter)+ " " + str(aestheticCounter)+ " " + str(helpUsersCounter)+ " " + str(helpDocCounter)
    return lastResult 

def getMeaning(string):
    result = ""
    page = requests.get("scrapers/meaning.php?q="+string)
    result += page.content+"\n"
    return result

def getFunFacts(string):
    result = ""
    page = requests.get("scrapers/funfacts.php?q="+string)
    result += page.content+"\n"
    return result    
#save the number of related lines of a context
def statusStarter(fname,numberoflines):
    statusFile = open("userData/status-"+fname+".txt", "w")
    statusFile.write(numberoflines+"\n")
#updates the number of related lines of a context
def statusUpdater(status, fname):
    statusFile = open("userData/status-"+fname, "a")
    statusFile.write(status+"\n")
#loads the number of related lines of a context
def statusChecker(fname):
    statusFile = open("userData/status-"+fname, "r")
    lineList = statusFile.readlines()
    statusFile.close()
    return lineList[-1]
#updates the state of progress in lyric generation
def progressUpdater(status, fname):
    statusFile = open("userData/progress-"+fname, "a")
    statusFile.write(status+"\n")
#loads the state of progress in lyric generation
def progressChecker(fname):
    statusFile = open("userData/progress-"+fname, "r")
    lineList = statusFile.readlines()
    statusFile.close()
    return lineList[-1]
#check if there is bot has any related knowledge about the given words
def wordsInfo(words):
    thisWords  = []
    result  = ""
    thisWords = token(words)
    for word in thisWords:
        exists = os.path.isfile("wordsInfo/" + word + ".txt")
        if exists:
            with io.open("wordsInfo/" + word + ".txt", 'r', encoding="utf8") as inF:
                for line in inF:
                    result +=  line+"<br>"
        else:
            result += "for <font size='3' color='red'><b>"+word+"</b></font> I didn't find any related info<br><br><br>"
    return result
#gains the knowlege about a context by finding realted lines about the given word
def createWordInfo(word):
    exists = os.path.isfile("wordsInfo/" + word + ".txt")
    if not exists:
        lines = []
        thisWordLineCounter = 0
        thisWordCounter = 0
        lines = findLines(word)
        for line in lines:
            thisWordLineCounter += 1
            thisWordCounter += line.count(word)
        with open("wordsInfo/" + word + ".txt" , 'w+') as word_f:
            content = "<font size='3' color='blue'><b>"+word+"</b></font><br>"
            content += "Number of related <b>lines:</b> "+str(thisWordLineCounter)+"<br>"
            content += "Number of <b>occurrences:</b> "+str(thisWordCounter)+"<br>"
            word_f.write(content)
    
#lets the rap to gather existing knowledge about the given context
def checkDataset(words):
    numberoflines = 0
    thisWords  = []
    thisWords = token(words)
    fname = createfiles()
    file = open("userData/" + fname + ".txt", 'w')
    file.close()
    for word in thisWords:
        numberoflines += addToDataset(word, fname)
    if(numberoflines < 20):
        statusStarter(fname,"<b>not sufficient</b>")
    else:
        statusStarter(fname,str(numberoflines))
    return fname
#checks if the bot has the knowledge about the word or no, if no, gains the knowledge
def addToDataset(word, fname):
    exists = os.path.isfile("dataset/" + word + ".txt")
    numberoflines = 0
    if exists:
        with io.open("dataset/" + word + ".txt", 'r', encoding="utf8") as inF, io.open("userData/" + fname + ".txt", 'a') as result_f:
            for line in inF:
                result_f.write(line)
                numberoflines += 1
    else:
        lines = []
        with open("dataset/" + word + ".txt" , 'w+') as word_f, io.open("userData/" + fname + ".txt", 'a', encoding="utf8") as result_f:
           lines = findLines(word)
           if lines:
               createWordInfo(word)
           for line in lines:
               word_f.write(line.encode("utf-8"))
               result_f.write(line)
               numberoflines += 1
    return numberoflines
#bot needs knowledge about the given word? this will help to gain
def findLines(word):
    reload(sys)
    sys.setdefaultencoding('Cp1252')
    lines = []
    ignore_list = []
    with open('swearWords.txt', 'r') as swear:
        ignore_list = swear.readlines()
    ignore_list = [x.strip() for x in ignore_list]
    with io.open('lyrics.txt', 'r', encoding="utf8") as inF:
        for line in inF:
            if word in line:
                if any(y in line for y in ignore_list):
                    continue
                lines.append(line)
    return lines
