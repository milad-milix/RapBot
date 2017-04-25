var thisfile = "";
var thisInput = "";
var hasmeaning = 0;
var hasfunfact = 0;
var messages = ['<br><br><b><i class="arrow right"></i></b>There a number of rhyming words to be checked!!', '<br><br><b><i class="arrow right"></i></b>I am thinking and creating...', '<br><br><b><i class="arrow right"></i></b>I am digging into frozen ground...', '<br><br><b><i class="arrow right"></i></b>I found a treasure of words....','<br><br><b><i class="arrow right"></i></b>I know it is taking too long,<br> but I\'ve written a few lines, plese wait....'];
var messageCounter = 0;

$(document).ready(function() {
    $("#keyword").on('keyup', function() {
        var words = this.value.match(/\S+/g).length;
        if (words < 5) {
           
        }
        else {
           		$('#generatebutton').removeAttr('disabled');

        }
    });

 }); 

$('#generatebutton').attr('disabled','disabled');

$(function() {
	$('#closefunFactsContainer').click(function() {
		$('.funFactsContainer').hide();
		$('.entertainment').show();


	});
});

$(function() {
	$('#closemeaningContainer').click(function() {
		$('.meaningContainer').hide();
		$('.entertainment').show();

	});
});

$(function() {
	$('#showFunFactsContainer').click(function() {
		$('.entertainment').hide();
		$('.funFactsContainer').css({
      "width" : "100%"
    , "height" : "100%"
    , "background" : "#ffffff"
    , "top" : "0"
    , "left" : "0"
    , "zIndex" : "50"
    , "MsFilter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    , "filter" : "alpha(opacity=60)"
    , "MozOpacity" : 1.6
    , "KhtmlOpacity" : 1.6
    , "opacity" : 1.6
	, "color" : "black"
	});
		$('.funFactsContainer').show();

	});
});

$(function() {
	$('#showMeaningContainer').click(function() {
		$('.entertainment').hide();
		$('.meaningContainer').css({
      "width" : "100%"
    , "height" : "100%"
    , "background" : "#ffffff"
    , "top" : "0"
    , "left" : "0"
    , "zIndex" : "50"
    , "MsFilter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    , "filter" : "alpha(opacity=60)"
    , "MozOpacity" : 1.6
    , "KhtmlOpacity" : 1.6
    , "opacity" : 1.6
	, "color" : "black"
	});
		$('.meaningContainer').show();

	});
});

$(function() {
	$('#closeEntertainment').click(function() {
		$('.row.marketing').show();
		$('.entertainment').hide();
	});
});

$(function() {
	$('#Entertainme').click(function() {
	$('.row.marketing').hide();

		$('.entertainment').css({
      "width" : "100%"
    , "height" : "100%"
    , "background" : "#fff"
    , "top" : "0"
    , "left" : "0"
    , "zIndex" : "50"
    , "MsFilter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    , "filter" : "alpha(opacity=60)"
    , "MozOpacity" : 1.6
    , "KhtmlOpacity" : 1.6
    , "opacity" : 1.6
	});
	
	$(".entertainment").show();
    });
});

$(function() {
	$('#closeOriginalRAp').click(function() {
		$('.originalLyricContainer').hide();
		$('.editiontextbox').show();

	});
});

$(function() {
	$('#originalRapLines').click(function() {
		
		$.ajax({
		url: '/originalLines',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify({
			'thisfile': thisfile
			}),
		type: 'POST',
		success: function(response){
			var value = '<div id="scrollable"><font face="verdana" color="white">' +response+ '</font></div>';
			$('.editiontextbox').hide();
			$('.originalLyricContainer').css({
      "width" : "100%"
    , "height" : "100%"
    , "background" : "#000"
    , "position" : "fixed"
    , "top" : "0"
    , "left" : "0"
    , "zIndex" : "50"
    , "MsFilter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    , "filter" : "alpha(opacity=60)"
    , "MozOpacity" : 1.6
    , "KhtmlOpacity" : 1.6
    , "opacity" : 1.6
	});
			$('.originalLyricContainer').append(value);
			$('.originalLyricContainer').show();
		},
		error: function(error) {
			console.log(error);
		},
		timeout: 600000 // sets timeout to 10 min
		});
		
		
		
	});
});

$(function() {
	$('#finishEdition').click(function() {
		$('.editiontextbox').hide();
		var value = $("#textareaediting").val(); 
		value = value.replace(/--/g, '<br>');
		document.getElementById("placeholder").innerHTML=value;
		$('#chartContainer').hide();
		$('#chartContainer2').hide();
		$('#chartContainer3').hide();
		$('#chartContainer4').hide();
	});
});

$(function() {
	$('#editLyric').click(function() {
		$('.editiontextbox').css({
      "width" : "100%"
    , "height" : "100%"
    , "background" : "#000"
    , "position" : "fixed"
    , "top" : "0"
    , "left" : "0"
    , "zIndex" : "50"
    , "MsFilter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    , "filter" : "alpha(opacity=60)"
    , "MozOpacity" : 1.6
    , "KhtmlOpacity" : 1.6
    , "opacity" : 1.6
	});
	
	$(".editiontextbox").show();
	
    });
});

$(function() {
	$('#restart').click(function() {
	$(".userEntry").show();
    });
});

$(function() {
	$('#showStatisctics').click(function() {
	$.ajax({
				url: '/usability',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					'statistics': ""
				}),
				type: 'POST',
				success: function(response){
					var array = response.split(" ").map(Number);
					DrawGraphs(array[0], array[1], array[2], array[3], array[4]);
					$(".col-lg-6.review").hide();
					$('#chartContainer').show();
					$('#chartContainer2').show();
					document.getElementById("placeholder").innerHTML="";

					},
				error: function(error) {
					console.log(error);
				},
				timeout: 600000 // sets timeout to 10 min
				});
    });
});


$(function() {
    $('#Showcomments').click(function() {
		$('#commentSubmitted').hide();

		 $.ajax({
            url: '/showcomments',
			contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
					'comment': 'show comments'
				}),
            type: 'POST',
            success: function(response) {
			document.getElementById("CommentsContainer").innerHTML=response;
			$('#Showcomments').hide();
            },
            error: function(error) {
                console.log(error);
            },
			timeout: 600000 // sets timeout to 10 min
        });
	});
});

$(function() {
    $('#Submitcomment').click(function() {
		var thisComment = $('#comment').val()
		if(0 === thisComment.length){
			alert("please enter your comment!!")
			return false;
		}
		var userText = thisComment.replace(/^\s+/, '').replace(/\s+$/, '');
		if (userText === '') {
			alert("please enter your comment!!")
			return false;
			}
		if(!thisComment)
			{
			alert("please enter your comment!!")
			return false;
		}
		thisComment = thisComment.replace(/\n/g, "<br />");;
		$('#Showcomments').show();
		 $.ajax({
            url: '/commenting',
			contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
					'comment': thisComment
				}),
            type: 'POST',
            success: function(response) {
			$('#commentSubmitted').show();
			$('#comment').hide();
			$('#Submitcomment').hide();
            },
            error: function(error) {
                console.log(error);
            },
			timeout: 600000 // sets timeout to 10 min
        });
	});
});

$(function() {
	$('#showQuestionnaireResults').click(function() {
	$.ajax({
				url: '/usabilityQuestionnaier',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					'statistics': ""
				}),
				type: 'POST',
				success: function(response){
					var array = response.split(" ").map(Number);
					DrawGraphs2(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12]);
					$('#questionnaireSubmitted').hide();
					$(".col-lg-6.questionnaire").hide();
					$('#chartContainer3').show();
					$('#chartContainer4').show();

					document.getElementById("placeholder").innerHTML="";

					},
				error: function(error) {
					console.log(error);
				},
				timeout: 600000 // sets timeout to 10 min
				});
    });
});


$(function() {
    $('#showQuestionnaire').click(function() {
			$(".col-lg-6.review").hide();
			$(".col-lg-6.questionnaire").show();
    });
});


$(function() {
    $('#submitQuestionnaire').click(function() {
        var visibility = Number($('#visibility').val());
		var match = Number($('#match').val());
		var userControl = Number($('#userControl').val());
		var consistency = Number($('#consistency').val());
		var errorPrevention = Number($('#errorPrevention').val());
		var recognition = Number($('#recognition').val());
		var flexibility = Number($('#flexibility').val());
		var aesthetic = Number($('#aesthetic').val());
		var helpUsers = Number($('#helpUsers').val());
		var helpDoc = Number($('#helpDoc').val());
		var satisfied = $('#satisfied').val();
		var review = visibility + match + userControl + consistency + errorPrevention + recognition + flexibility + aesthetic + helpUsers + helpDoc;
		var bonus = 0;
		var yes = 0;
		if(satisfied == "yes") {
			yes = 1;
			bonus = 5;
			review = review + bonus;
		}
		$('#showQuestionnaireResults').show();
        $.ajax({
            url: '/questionnaier',
			contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
					'review': review.toString(),'thisfile': thisfile, 'yes': yes,'visibility':visibility, 'matching':match
					, 'userControl':userControl, 'consistency':consistency, 'errorPrevention':errorPrevention, 'recognition':recognition
					, 'flexibility':flexibility, 'aesthetic':aesthetic, 'helpUsers':helpUsers, 'helpDoc':helpDoc
				}),
            type: 'POST',
            success: function(response) {
				$('#questionnaireSubmitted').show();
            },
            error: function(error) {
                console.log(error);
            },
			timeout: 600000 // sets timeout to 10 min
        });

    });
});


$(function() {
    $('#submitreview').click(function() {
        var incontext = Number($('#InContext').val());
		var rhyming = Number($('#Rhyming').val());
		if(incontext > 10 || incontext < 0) {
			alert("please enter valid input between 1 to 10")
			return false;
		}
		if(rhyming > 10 || rhyming < 0){
			alert("please enter valid input between 1 to 10")
			return false;
		}
		if(isNaN(rhyming) || isNaN(incontext)){
			alert("please enter valid input between 1 to 10")
			return false;
		}
		if(0 === rhyming.length || 0 === incontext.length){
			alert("please enter valid input between 1 to 10")
			return false;
		}
		if(!rhyming || !incontext)
			{
			alert("please enter valid input between 1 to 10")
			return false;
		}
		var useagain = $('#UseAgain').val();
		var review = incontext + rhyming;
		var bonus = 0;
		var yes = 0;
		if(useagain == "yes") {
			yes = 1;
			bonus = 5;
			review = review + bonus;
		}
		$('#showStatisctics').show();
        $.ajax({
            url: '/review',
			contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
					'review': review.toString(),'thisfile': thisfile, 'yes': yes,'incontext':incontext, 'rhyming':rhyming
				}),
            type: 'POST',
            success: function(response) {
            },
            error: function(error) {
                console.log(error);
            },
			timeout: 600000 // sets timeout to 10 min
        });

    });
});


$(function() {
	$('#EditWords').click(function() {
			$('.editiontextbox').hide();
	$('.funFactsContainer').hide();
	$('.meaningContainer').hide();
	$('.entertainment').hide();
	$('.originalLyricContainer').hide();
	$('.row.marketing').hide();
	$('#Entertainme').hide();
	$('#ContinueGeneration').hide();
	$('#EditWords').hide();
	$(".userEntry").show();


	});
});


$("#wordsInputForm").submit(function (e) {
    e.preventDefault();
	thisInput = $('#keyword').val();
		var words = $('#keyword').val().split(' ');
		if(words.length < 5) {
			alert("Could you please enter at least 5 words?");
			document.getElementById("messageFromBot").innerHTML="Could you please enter at least 5 words?";
			document.getElementById("keyword").innerHTML=thisInput;
			return false;
		}
		$('.funFactsContainer').hide();
		$('.meaningContainer').hide();
		$('.entertainment').hide();
		$('.originalLyricContainer').hide();
		$(".editiontextbox").hide();
		$(".col-lg-6.review").hide();
		$('#editLyric').hide();
		$('#progress').hide();
		$(".userEntry").hide();
		$('#loaderajax').addClass('showAjaxLoader');
		$('.row.marketing').show();
		$('#ContinueGeneration').show();
		$('#EditWords').show();

		
		
        $.ajax({
            url: '/keywords',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
				thisfile = response+".txt"
				wordsInfo();
            },
            error: function(error) {
                console.log(error);
            },
			timeout: 600000 // sets timeout to 10 min
        });	
   
});

$(function() {
	$('#ContinueGeneration').click(function() {
	$('.editiontextbox').hide();
	$('.funFactsContainer').hide();
	$('.meaningContainer').hide();
	$('.entertainment').hide();
	$('.originalLyricContainer').hide();
	$('.row.marketing').show();
	$('#progress').show();
	$('#Entertainme').show();
	$('#ContinueGeneration').hide();
	$('#EditWords').hide();
	$(".userEntry").hide();
	sendlines(thisfile);
	document.getElementById("placeholder").innerHTML="<b><i class='arrow right'></i></b>I'm working on your request.";
	document.getElementById("lyric-title").innerHTML="You Entered: <font size='3' color='blue'> "+thisInput+"</font><br><br>Rap Bot:";
	$('#loaderajax').removeClass('ajax-loader ');
	$('#loaderajax').addClass('showAjaxLoader');



	});
});


$(function() {
    $('#generatebutton').click(function() {
		thisInput = $('#keyword').val();
		var words = $('#keyword').val().split(' ');
		if(words.length < 5) {
			document.getElementById("messageFromBot").innerHTML="Could you please enter at least 5 words?";
			document.getElementById("keyword").innerHTML=thisInput;
			return false;
		}
		$('.funFactsContainer').hide();
		$('.meaningContainer').hide();
		$('.entertainment').hide();
		$('.originalLyricContainer').hide();
		$(".editiontextbox").hide();
		$(".col-lg-6.review").hide();
		$('#editLyric').hide();
		$('#progress').hide();
		$(".userEntry").hide();
		$('#loaderajax').addClass('showAjaxLoader');
		$('.row.marketing').show();
		$('#ContinueGeneration').show();
		$('#EditWords').show();

		
		
        $.ajax({
            url: '/keywords',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
				thisfile = response+".txt"
				wordsInfo();
            },
            error: function(error) {
                console.log(error);
            },
			timeout: 600000 // sets timeout to 10 min
        });	
		
    });
});


function wordsInfo(){
		$.ajax({
            url: '/wordsInfoReq',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					'lines': thisInput
				}),
				type: 'POST',
				success: function(response){
					$('#placeholder').hide();
					document.getElementById("placeholder").innerHTML=response+"<h4>You wanna change your words, or continue?</h4>";
					$('#placeholder').show( "slow" );
					document.getElementById("lyric-title").innerHTML="Rap Bot: This is the result of my analysis of your words. I have:";					
					$('#loaderajax').removeClass('showAjaxLoader');
					$('#loaderajax').addClass('ajax-loader ');
					},
            error: function(error) {
                console.log(error);
            },
			timeout: 600000 // sets timeout to 10 min
        });
			trimmedInput = thisInput.replace(/\s*$/,"");		

		if(hasmeaning != 1)
	$.ajax({
		url: '/meaning',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify({
			'words': trimmedInput
		}),
		type: 'POST',
		success: function(response){
		document.getElementById("meanings").innerHTML="<div id='scrollable'>"+response+"</div>";
		hasmeaning = 1;
		},
	error: function(error) {
	console.log(error);
		},
		eout: 600000 // sets timeout to 10 min
	});
	if(hasfunfact != 1)
		$.ajax({
		url: '/funfacts',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify({
			'words': trimmedInput
		}),
		type: 'POST',
		success: function(response){
		document.getElementById("funfacts").innerHTML="<div id='scrollable'>"+response+"</div>";
		hasfunfact = 1;
		},
	error: function(error) {
	console.log(error);
		},
		eout: 600000 // sets timeout to 10 min
	});
		
		}
		
		function lastStatus(lines){
			$.ajax({
				url: '/lastStatus',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					'lines': lines
				}),
				type: 'POST',
				success: function(response){
					document.getElementById("progressBar").innerHTML=response;
					setTimeout(function(){ makerap(lines); }, 4000);
					},
				error: function(error) {
					console.log(error);
				},
				timeout: 600000 // sets timeout to 10 min
				});
		}
		
		
		function sendlines(lines){
			$.ajax({
				url: '/lines',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					'lines': lines
				}),
				type: 'POST',
				success: function(response){
					markovify(thisfile);
					//document.getElementById("lyric-title").innerHTML="Rap Bot:";
					$('#placeholder').append("<b><br><br><i class='arrow right'></i></b>I'm gaining knowledge about the context, so far I have found "+response+" related lines of Rap...");
					document.getElementById("progressBar").innerHTML="||||||||||||||| 20%";

					},
				error: function(error) {
					console.log(error);
				},
				timeout: 600000 // sets timeout to 10 min
				});
		}
		function markovify(lines){
			$.ajax({
				url: '/markovify',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					'lines': lines
				}),
				type: 'POST',
				success: function(response){
					//document.getElementById("lyric-title").innerHTML="Rap Bot:";
					$('#placeholder').append("<br><br><b><i class='arrow right'></i></b>I applied some techniques to make good results. I 'm working on "+response+" lines of Rap");
					document.getElementById("progressBar").innerHTML="||||||||||||||||||||||| 30%";
					setTimeout(function(){ lastStatus(lines); }, 3000);		

					},
				error: function(error) {
					console.log(error);
				},
				timeout: 600000 // sets timeout to 10 min
				});
		}
		function makerap(lines){
			$.ajax({
				url: '/makerap',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					'lines': lines
				}),
				type: 'POST',
				success: function(response){
					if(response == "no") {
						$('#placeholder').append(messages[messageCounter]);
						messageCounter++;
						lastStatus(lines);
					}
					else {
						$('#loaderajax').removeClass('showAjaxLoader');
						$('#loaderajax').addClass('ajax-loader ');
						document.getElementById("placeholder").innerHTML=response;
						var value = response;
						value = value.replace(/<br>/g, '&#10; --');
						document.getElementById("textareaediting").innerHTML=value;
						$("#textareaediting").height( $("#textareaediting")[0].scrollHeight );
						$('#showStatisctics').hide();
						$('#showQuestionnaireResults').hide();
						$('#commentSubmitted').hide();
						$('#questionnaireSubmitted').hide();
						$('#Showcomments').hide();
						$(".col-lg-6.review").show();
						$('.entertainment').hide();
						$('#progress').hide();
						$('#editLyric').show();
					}
					},
				error: function(error) {
					console.log(error);
				},
				timeout: 600000 // sets timeout to 10 min
				});
		}
		
		function DrawGraphs(numberOfReviews, totalPoints, numberOfyes, inContext, rhymingWords) {
			var average = totalPoints / numberOfReviews;
			var goodpercentage = average * 100 / 25;
			goodpercentage = Math.round(goodpercentage);
			var badpercentage = 100 - goodpercentage;
	var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "total number of reviews: "+numberOfReviews             
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "Satisfaction(Yes)", y: numberOfyes  },
				{ label: "Relevance>5", y: inContext  },
				{ label: "Rhyming>5", y: rhymingWords  }
			]
		}
		]
	});
	chart.render();
	
	
	chart = new CanvasJS.Chart("chartContainer2",
	{
		title:{
			text: "Satisfaction Rate",
			fontFamily: "Impact",
			fontWeight: "normal"
		},

		legend:{
			verticalAlign: "bottom",
			horizontalAlign: "center"
		},
		data: [
		{
			//startAngle: 45,
			indexLabelFontSize: 20,
			indexLabelFontFamily: "Garamond",
			indexLabelFontColor: "darkgrey",
			indexLabelLineColor: "darkgrey",
			indexLabelPlacement: "outside",
			type: "doughnut",
			showInLegend: true,
			dataPoints: [
				{  y: goodpercentage, legendText:"Satisfied "+goodpercentage+"%", indexLabel: "Satisfied "+goodpercentage+"%" },
				{  y: badpercentage, legendText:"Not Satisfied "+badpercentage+"%", indexLabel: "Not Satisfied "+badpercentage+"%" }
			]
		}
		]
	});

	chart.render();
}


function DrawGraphs2(numberOfReviews, totalPoints,satisfiedCounter, visibilityCounter,matchingCounter,userControlCounter,consistencyCounter,errorPreventionCounter,recognitionCounter,flexibilityCounter,aestheticCounter,helpUsersCounter,helpDocCounter) {
			var average = totalPoints / numberOfReviews;
			var goodpercentage = average * 100 / 55;
			goodpercentage = Math.round(goodpercentage);
			var badpercentage = 100 - goodpercentage;
	
	var chart = new CanvasJS.Chart("chartContainer3", {
		title:{
			text: "total number of reviews: "+numberOfReviews             
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "Satisfaction(Yes)", y: satisfiedCounter  },
				{ label: "Visibility>3", y: visibilityCounter  },
				{ label: "User Control>3", y: userControlCounter  },
				{ label: "Consistency>3", y: consistencyCounter  },
				{ label: "Flexibility>3", y: flexibilityCounter  }
			]
		}
		]
	});
	chart.render();
	chart = new CanvasJS.Chart("chartContainer4",
	{
		title:{
			text: "Satisfaction Rate",
			fontFamily: "Impact",
			fontWeight: "normal"
		},

		legend:{
			verticalAlign: "bottom",
			horizontalAlign: "center"
		},
		data: [
		{
			//startAngle: 45,
			indexLabelFontSize: 20,
			indexLabelFontFamily: "Garamond",
			indexLabelFontColor: "darkgrey",
			indexLabelLineColor: "darkgrey",
			indexLabelPlacement: "outside",
			type: "doughnut",
			showInLegend: true,
			dataPoints: [
				{  y: goodpercentage, legendText:"Satisfied "+goodpercentage+"%", indexLabel: "Satisfied "+goodpercentage+"%" },
				{  y: badpercentage, legendText:"Not Satisfied "+badpercentage+"%", indexLabel: "Not Satisfied "+badpercentage+"%" }
			]
		}
		]
	});

	chart.render();
}




function FirstPrompt() {
	$('.editiontextbox').hide();
	$('.funFactsContainer').hide();
	$('.meaningContainer').hide();
	$('.entertainment').hide();
	$('.originalLyricContainer').hide();
	$('.row.marketing').hide();
	$('#Entertainme').hide();
	$('#ContinueGeneration').hide();
	$('#EditWords').hide();
	$(".col-lg-6.review").hide();
	$(".col-lg-6.questionnaire").hide();
	$('#editLyric').hide();
	$('#progress').hide();
	$('#chartContainer').hide();
	$('#chartContainer2').hide();
	$('#chartContainer3').hide();
	$('#chartContainer4').hide();

	
	
}
window.onload = FirstPrompt;