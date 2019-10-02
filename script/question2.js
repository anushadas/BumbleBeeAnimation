function checkNameInputs()
{
		if(document.getElementById("lastname").value== "")
		{
			throw "Please enter the Last name field for the group member";
		}
		if(document.getElementById("firstname").value== "")
		{
			throw "Please enter the First name field for the group member";
		}
}
function checkGroupSizeInput()
{
	if(document.getElementById("GroupSize").value == "")
	{
		throw "Group Size must cannot be empty";
	}
	else if(isNaN(document.getElementById("GroupSize").value))
	{
		throw "Group Size must be a a valid number";
	}
	else if(document.getElementById("GroupSize").value== 0)
	{
		throw "Group Size must be a greater than 0";
	}
}

(function self() {
  alert("HELLO FROM THE OTHER SIDE");
}());

function calcGroupDiscount()
{
	var amt = 50;
	var dis = 0;
	var rate = 0;
	try
	{
		checkGroupSizeInput();
		var grSize = document.getElementById("GroupSize");
		var numP = grSize.value;
		var amt = amt * numP;
		if( numP >= 5 && numP <= 10 )
		{
			dis = 0.10 * numP;
		}
		else if(numP >=11 && numP <= 24)
		{
			dis = 0.20 * numP;
		}
		else if(numP >= 25)
		{
			dis = 0.25 * numP;
		}
		
		rate = amt - (amt*dis);
		document.getElementById("discRate").value = rate;
	}
	catch(err)
	{
		alert(err);
	}
}
function addGroupMember()
{
	try
	{
		checkNameInputs();
		var select = document.getElementById("members");
		var opt = document.createElement("option");
		var lname = document.getElementById("lastname");
		var fname = document.getElementById("firstname");
		opt.innerHTML = lname.value+","+fname.value;
		select.appendChild(opt);
		document.getElementById("lastname").value = "";
		document.getElementById("firstname").value = "";
		document.getElementById("lastname").focus();	
	}
	catch(err)
	{
		alert(err);
	}
}
function removeGroupMember()
{
	try
	{
		var select = document.getElementById("members");
		if(select.selectedIndex >= 0)
		{
			select.remove(select.selectedIndex);
		}
		else
		{
			throw "There are no group members to delete!"
		}
	}
	catch(err)
	{
		alert(err);
	}
}
function sortGroupMembers()
{
	var select = document.getElementById("members");
	//define sorting variables
	var temp,doSort,switchItems;
	
	//set doSort to true
	doSort = true;
	
	//loop to do switiching  of items
	while(doSort)
	{
		doSort = false;
		
		//get list item
		temp = select.getElementsByTagName("option");
		
		//loop through all the list items
		for(var i = 0;i < temp.length-1;i++)
		{
			//set iniitial value for switch items to false
			switchItems = false;
			
			//check if temp[i+1] should switch positions with temp[i];
			if(temp[i].innerHTML.toLowerCase()>temp[i+1].innerHTML.toLowerCase())
			{
				//switch
				switchItems = true;
				break;
			}
		}
			if(switchItems)
			{
				temp[i].parentNode.insertBefore(temp[i+1], temp[i]);
				doSort = true;
			}
		}
}

var leftPos = -150;
var topPos = 0;
//use set Interval to animate butterfly and assign it to an ID
var intID = setInterval(FlyingBee,100);
function FlyingBee()
{
	//reference butterfly Image
	var bee = document.getElementById("bee");
	
	//reference position of bfly
	bee.style.left = leftPos+'px';
	bee.style.top = topPos+'px';
	
	//change visibility
	bee.style.visibility = "visible";
	
	//increase x by 10 and reduce y by 2
	leftPos += 10;
	topPos += 2;
	
	//referenece coordinates of the flower
	//if the bfly is there, clear Interval
	if(leftPos == Math.round(screen.availWidth/5.5) || topPos == Math.round(screen.availHeight/4) )
	{
		clearInterval(intID);
		alert(document.getElementById("advice").textContent);
	}

	else {
		if(leftPos > screen.availWidth || topPos > screen.availHeight)
		{
			
			leftPos = -150;
			topPos = 0;
		}
	}
}
//call function
document.getElementById("GroupSize").onchange = function(){ calcGroupDiscount();};

var buttons = document.getElementsByClassName("buttons");
//add
buttons[0].addEventListener("click",addGroupMember);
//delete members
buttons[1].addEventListener("click",removeGroupMember);
//sort
buttons[2].addEventListener("click",sortGroupMembers);