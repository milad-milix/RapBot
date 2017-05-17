import os
from flask import Flask, render_template, request,json
from utilities import submitQuestionnaier, showQuestionnaierResults, showComment, submitComment, getMeaning, getFunFacts, wordsInfo, checkDataset, findLines, submitReviewFile, usability2, statusChecker, statusUpdater, progressChecker
import deeprap
from threading import Thread
from collections import Counter
import time
app = Flask(__name__)
@app.route("/")
def main():
    return render_template('index.html')
@app.route('/keywords', methods=['POST'])
def keywords():
    words = request.form["keywords"]
    words = words.rstrip()
    return checkDataset(words)
@app.route('/wordsInfoReq', methods=['POST'])
def wordsInfoReq():
    words = request.json["lines"]
    words = words.rstrip()
    return wordsInfo(words)
@app.route('/lines', methods=['POST'])
def lines():
    lines = request.json['lines']
    print lines
    counter  = deeprap.markovcorpus(lines)
    statusUpdater(str(counter), lines)
    return statusChecker(lines)
@app.route('/markovify', methods=['POST'])
def markovify():
    lines = request.json['lines']
    thread = Thread(target=deeprap.makerap, args=(lines,))
    thread.start()
    time.sleep(7)
    return statusChecker(lines) 
@app.route('/makerap', methods=['POST'])
def makerap():
    lines = request.json['lines']
    exists = os.path.isfile("userData/neural_rap" + lines)
    if exists:
        time.sleep(5)
        with open("userData/neural_rap" + lines, 'r') as f:
            content = f.read().replace('\n', '<br>')
            return content         
    else:
        return "no"
@app.route('/lastStatus', methods=['POST'])
def lastStatus():
    lines = request.json['lines']
    return progressChecker(lines)
@app.route('/funfacts', methods=['POST'])
def funfacts():
    words = request.json['words']
    return getFunFacts(words)
@app.route('/meaning', methods=['POST'])
def meaning():
    words = request.json['words']
    return getMeaning(words)
@app.route('/commenting', methods=['POST'])
def commenting():
    comment = request.json['comment']
    return submitComment(comment)
@app.route('/showcomments', methods=['POST'])
def showcomments():
    return showComment()
@app.route('/review', methods=['POST'])
def review():
    review = request.json['review']
    thisfile = request.json['thisfile']
    yes = request.json['yes']
    incontext = request.json['incontext']
    rhyming = request.json['rhyming']
    return submitReviewFile(review, yes, incontext, rhyming)
@app.route('/usability', methods=['POST'])
def usability():
    return usability2()
@app.route('/questionnaier', methods=['POST'])
def questionnaier():
    totalPoints = request.json['review']
    thisfile = request.json['thisfile']
    visibility = request.json['visibility']
    matching = request.json['matching']
    userControl = request.json['userControl']
    consistency = request.json['consistency']
    errorPrevention = request.json['errorPrevention']
    recognition = request.json['recognition']
    flexibility = request.json['flexibility']
    aesthetic = request.json['aesthetic']
    helpUsers = request.json['helpUsers']
    helpDoc = request.json['helpDoc']
    satisfied = request.json['yes']
    return submitQuestionnaier(totalPoints,visibility,matching,userControl,consistency,errorPrevention,recognition,flexibility,aesthetic,helpUsers,helpDoc,satisfied)
@app.route('/usabilityQuestionnaier', methods=['POST'])
def usabilityQuestionnaier():
    return showQuestionnaierResults()
@app.route('/originalLines', methods=['POST'])
def originalLines():
    thisfile = request.json['thisfile']
    with open("userData/" + thisfile, 'r') as f:
            content = f.read().replace('\n', '<br>')
            return content
if __name__ == "__main__":
    app.run()
