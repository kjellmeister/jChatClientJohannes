/**
 * Place your JS-code here.
 */
$(document).ready(
	function()
	{
		  'use strict';
		  
		  var url = 'ws://127.0.0.1:1337/', protocol = 'johannes-protocol', websocket;

		  
		  function validInput(name, age, location)
		  {
		  	  var valid=true;
		  	  
		  	  $('#name').css('background','#AFA');
		  	  
		  	  if( !(name.length>0 && name.length<12))
		  	  {
		  	  	  valid=false;
		  	  	  $('#name').css('background','#FAA');
		  	  }
		  	  return valid;
		  }
					  
		  // Event handler to create the websockt connection
		  $('#connect').on('click', function(event)
		  	  {
		  	  	  if( (validInput( $('#name').val().split(" ")[0], $('#age').val(), $('#location').val() ) ) )
		  	  	  {
		  	  	  	  document.location.href = "index.php?p=connected&n="+$('#name').val().split(" ")[0]+"&a="+$('#age').val()+"&s="+$('#sex').val()+"&l="+$('#location').val();
		  	  	  }
		  	  });
		  
		  function getUrlVars()
		  {
		  	  var vars = {};
		  	  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		  	  		  vars[key] = value;
		  	  });
		  	  return vars;
		  }

		  if(getUrlVars()["p"]=="connected")
		  {
		  	  console.log("logged in");
		  	  
		  	  var uppgifter = "/adduser "+getUrlVars()["n"]+" "+getUrlVars()["a"]+" "+getUrlVars()["s"]+" "+getUrlVars()["l"];
		  	  
		  	  console.log('Connecting to: ' + url);
			  websocket = new WebSocket(url, 'johannes');
			
			  websocket.onopen = function()
			  {
			  	  console.log('The websocket is now open.');
			  	  console.log(websocket);
			  	  console.log();
			  	  websocket.send(uppgifter);
			  	  outputLog('The websocket is now open.');
			  }
			
			  websocket.onmessage = function(event)
			  {
			  	  console.log('Receiving message: ' + event.data);
			  	  console.log(event);
			  	  console.log(websocket);
			  	  commands(event.data);
			  }
			
			  websocket.onclose = function()
			  {
			  	  console.log('The websocket is now closed.');
			  	  console.log(websocket);
			  	  outputLog('Websocket closed.');
			  	  document.location.href = "index.php?p=connect";
			  }
		  }
		
		  // Add the message to the log
		  function outputLog(message)
		  {
		    //var now = new Date();
		    //$(output).append(now.toLocaleTimeString() + ' ' + message + '<br/>').scrollTop(output[0].scrollHeight);
		  }
		
		  
		  // Send a message to the server
		  $('#box20send').on('click', function(event)
		  {
		  	  console.log("Send msg to 20");
		  	  var msg = $('#messageBox20').val();
		  	  sendMessage(" 20 "+msg);
		  	  $('#messageBox20').val("");
		  });
		  $('#box30send').on('click', function(event)
		  {
		  	  console.log("Send msg to 30");
		  	  var msg = $('#messageBox30').val();
		  	  sendMessage(" 30 "+msg);
		  	  $('#messageBox30').val("");
		  });
		  $('#box40send').on('click', function(event)
		  {
		  	  console.log("Send msg to 40");
		  	  var msg = $('#messageBox40').val();
		  	  sendMessage(" 40 "+msg);
		  	  $('#messageBox40').val("");
		  });
		  
		  function sendMessage(msg)
		  {
		    if(!websocket || websocket.readyState === 3) {
		      console.log('The websocket is not connected to a server.');
		    }
		    else
		    {
		    	    console.log("Sending msg: /say"+msg+" to server");
		    	    websocket.send("/say"+msg);          
		    }
		  }
	
		/*
		  // Close the connection to the server
		  $('#close').on('click', function() {
		    console.log('Closing websocket.');
		    websocket.send('Client closing connection by intention.');
		    websocket.close();
		    console.log(websocket);
		  });
		  */
		  
		  
		  function commands(msg)
			{
			  var message = msg.split(" "),
			  command = message[0],
			  commandFound=false,
			  show="<p class='black'>";
			  
			  if(command=="/20")
			  {
			  	  for(var i=1 ; i<message.length ; i++)
			  	  	  show+=message[i]+" ";
			  	  message+="</p>";
			  	  console.log("Somebody sent: "+show);
			  	  
			  	  var now = new Date();
			  	  $('#output20').append(show).scrollTop($('#output20')[0].scrollHeight);
			  }
			  else if(command=="/30")
			  {
			  	  for(var i=1 ; i<message.length ; i++)
			  	  	  show+=message[i]+" ";
			  	  show+="</p>";
			  	  console.log("Somebody sent: "+show);
			  	  
			  	  var now = new Date();
			  	  $('#output30').append(show).scrollTop($('#output30')[0].scrollHeight);
			  	  
			  }
			  else if(command=="/40")
			  {
			  	  for(var i=1 ; i<message.length ; i++)
			  	  	  show+=message[i]+" ";
			  	  show+="</p>";
			  	  console.log("Somebody sent: "+show);

			  	  $('#output40').append(show).scrollTop($('#output30')[0].scrollHeight);
			  	  
			  }
			  else if(command=="/pm")
			  {
			  	  for(var i=3 ; i<message.length ; i++)
			  	  	  show+=message[i]+" ";
			  	  show+="</p>";
			  	  console.log("Somebody sent: "+show);
			  	  
			  	  createPrivChat(message[1], message[2], show);			  	  
			  }
			  else if(command=="/addUsersToList")
			  {
			  	  $('#users').empty();
			  	  $('#users').append("<p>Users online:</p>");
				  console.log("Command detected: "+command);
				  for(var i=1 ; i<message.length ; i++)
				  {
				  	  var info = message[i].split("-");
				  	  $('#users').append("<div class='startChat' id="+info[1]+"><p>"+info[0]+"</p></div><br/>");
				  	  
				  	  $("#users .startChat").on('click', function(event)
						  {
						  	  var name=$("#"+$(this).attr("id")+" p").text();
							  console.log("Start chat!")
							  createPrivChat($(this).attr("id"), name);
						  });
				  }
				  
				  console.log(message[1]);
				  commandFound=true;
			  }
			  else if(command=="/nick")
			  {
			  	  console.log("Change nick to "+message[1]);
			  	document.getElementById('nickname').innerHTML="logged in as " + message[1];
			  }
			  
			  return commandFound;
			}
		  
		
		
		 
		function createPrivChat(id, name, msg)
		{
			console.log("check for id: "+id);
			var found=false;
			$('#chatWrapper').children('div').each(function ()
				{
					if($(this).attr("id") == id)
					{
						console.log("Window already open.")
						found=true;
						if(msg)
						{
							console.log("#chatWrapper #"+ $(this).attr("id") + " #chatbox .output");
							$("#chatWrapper #"+ $(this).attr("id") + " #chatbox .output").append(msg).scrollTop($("#chatWrapper #"+ $(this).attr("id") + " #chatbox .output")[0].scrollHeight);
						}
					}
			    	});
			if(!found)
			{
				var message="";
				if(msg)
					message=msg;
				console.log("added");
				var privChatCode= "<div id='"+id+"' class='chatBox small'><div id='box"+id+"close'  class='chatclose' title='Close chat window'><p>x</p></div><div id='chatbox'><p>"+name+"</p><br/><div id='output' class='output'>"+message+"</div><p><input id='privMessageBox"+id+"'/><input id='box"+id+"send' type='button' value='Send message'/></p></div></div></div>";
				
	
				$('#privatechats .wrapper').append(privChatCode);
				$("#box"+id+"send").click(function(event)
				  {
					  event.stopPropagation();
					  console.log("Make chat bigger");
					  var msg=$("#privMessageBox"+id).val();
					  $("#privMessageBox"+id).val("");
					  sendMessage(" priv-"+id+" "+msg);
				  });
				$("#box"+id+"close").click(function(event)
				  {
				  	  console.log("#"+$("#box"+id+"close").parent().attr("id"));
					  event.stopPropagation();
					  $('div').remove("#chatWrapper #"+$("#chatWrapper #box"+id+"close").parent().attr("id"));
				  });
		  	}
		}
		  
		  
		  
		  
		  
		  
		  
		  
		  //BOXCODE----------------------------------------------------------------------------------
		 $('.openBox').click(function(event)
		  	  {
		  	  	  event.stopPropagation();
		  	  	  console.log($(this).attr('id'));
		  	  	  
		  	  	  console.log($(this).parent().parent());
		  	  	  
		  	  	  $(this).removeClass("small");
		  	  	  
		  	  	  $(this).parent().parent().css('width', 650);
		  	  	  $(this).parent().parent().css('height', 500);
		  	  	  
		  	  	  $('#'+$(this).parent().parent().attr('id')+' .open').removeClass("hidden");
		  	  	  $('#'+$(this).parent().parent().attr('id')+' .closed').addClass("hidden");
		  	  	  
		  	  	  if(!websocket || websocket.readyState === 3)
		  	  	  {
				      console.log('The websocket is not connected to a server.');
				  }
				  else
				  {
				  	  console.log("Sending to server: "+"/join "+$(this).parent().parent().attr('id'))
				  	  websocket.send("/join "+$(this).parent().parent().attr('id'));
				  }
		  	  	  
		  	  });
		  $('.minimize').click(function(event)
		  	  {
		  	  	  event.stopPropagation();
		  	  	  
		  	  	  $($(this).parent().parent()).css('width', 650);
		  	  	  $($(this).parent().parent()).css('height', 100);
		  	  	  $($(this).parent().parent()).addClass("small");

		  	  	  $('#'+$(this).parent().parent().attr('id')+' .closed').removeClass("hidden");
		  	  	  $('#'+$(this).parent().parent().attr('id')+' .open').addClass("hidden");
		  	  	  
		  	  	  if(!websocket || websocket.readyState === 3)
		  	  	  {
				      console.log('The websocket is not connected to a server.');
				  }
				  else
				  {
				  	  console.log("Sending to server: "+"/dcFrom "+$(this).attr('id'))
				  	  websocket.send("/dcFrom "+$(this).attr('id'));
				  	  
				  	  //clear output
				  	  var id=$(this).attr('id').split(" ");
				  	  for(var i=0 ; i<id.length ; i++)
				  	  {
				  	  	  if(id[i]!=-1)
				  	  	  {
				  	  	  	  $("#output"+id[i]).empty();
				  	  	  	  $("#messageBox"+id[i]).val("");
				  	  	  }
				  	  }
				  	  
				  }
		  	  	  
		  	  	  
		  	  	  
		  	  }); 
		  //PRIVCHATCODE----------------------------------------------------------------------
		  
		  
	}
	
	
);
