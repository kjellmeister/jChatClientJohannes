
<div id="users">
	<p>Users online:</p>
</div>

<div id='chats'>
	<div id='wrapper' class='wrapper'>
		<h1>jChat</h1>
		<p id="nickname" class="nickname"><?php echo "logged in as ".$_GET["n"];?></p>
		<p class="blue">Choose chat room:</p>
		<div id='20' class='box small'>
			<div class="closed">
				<h1 class="openBox">#20-something</h1>
			</div>
			<div class="open hidden">
				<div id="20 -1 -1" class='minimize' title='Disconnect from this chat'><h1>x</h1></div>
				
				<div id="chatbox">
					<h1 class='example'>#20-something</h1>
					<p>
					    </br><div id='output20' class='output'></div>
					</p>
					<p>
					    <label>Send message: </label></br><input id='messageBox20'/>
					    <input id='box20send' type='button' value='Send message'/>
					</p>
				</div>

			</div>
		</div>
		
		<div id='30' class='box small'>
			<div class='minimize hidden' title='Miminize this box'><h1>x</h1></div>
			<div class="closed">
				<h1 class="openBox">#30-something</h1>
			</div>
			<div class="open hidden">
				<div id="-1 30 -1"  class='minimize' title='Disconnect from this chat'><h1>x</h1></div>
				<div id="chatbox">
					<h1 class='example'>#30-something</h1>
					<p>
					    </br><div id='output30' class='output'></div>
					</p>
					<p>
					    <label>Send message: </label></br><input id='messageBox30'/>
					    <input id='box30send' type='button' value='Send message'/>
					</p>
				</div>

			</div>
		</div>
		
		<div id='40' class='box small'>
			
			<div class="closed">
				<h1 class="openBox">#40-something</h1>
			</div>
			<div class="open hidden">
				<div id='-1 -1 40'  class='minimize' title='Disconnect from this chat'><h1>x</h1></div>
				<div id="chatbox">
					<h1 class='example'>#40-something</h1>
					<p>
					    </br><div id='output40' class='output'></div>
					</p>
					<p>
					    <label>Send message: </label></br><input id='messageBox40'/>
					    <input id='box40send' type='button' value='Send message'/>
					</p>
				</div>
			</div>
		
		</div>
		
		
	</div>
</div>

<div id="privatechats">
<div id="chatWrapper" class="wrapper">
</div>
</div>
