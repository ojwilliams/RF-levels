/******************************************************************************************************
This file contains all of the javascript code which needs to be customised between different units.
Each function will require some changes

All other code should remain the same providing I haven't unwittingly included any 'features' which shouldn't be there.
******************************************************************************************************/
var show_info = false;


var timer = null;
var paramIndex;
var new_data;
var show_numbers=false;
var db_name = "";
/*
function load( param )
{
	x=document.getElementById("DB_DVE_FREQ");
	x.onmousedown=showKeypad;
	paramIndex = param;
}*/


function button_press(button)
{
	new_data.innerHTML = new_data.innerHTML + button;
}

function set_press()
{
//	send_value( paramIndex, new_data.innerHTML );
	if (document.getElementById("combo_form").style.display == "block")
	{
		send_form_combo(document.getElementById("combo_form"), '', db_name, '');
	}
	else
	{
		send_form2(document.getElementById("newVal").innerHTML, db_name);
	}
	
	new_data.innerHTML = "";
	document.getElementById("touchkeys").style.display = "none";
}

function cancel_press()
{
	new_data.innerHTML = "";
	document.getElementById("touchkeys").style.display = "none";
}

function back_press()
{
	new_data.innerHTML = new_data.innerHTML.substr(0,new_data.innerHTML.length-1);
}

function set_up_combo()
{
	document.getElementById("touchkeys").style.display = "block";
	document.getElementById("keypadbtn").style.display = "none";	
	document.getElementById("range").style.display = "none";
	document.getElementById("newValUnits").style.display = "none";
	document.getElementById("newVal").style.display = "none";
	document.getElementById("combo_form").style.display = "block";
	document.getElementById("combo").style.display = "block";
	document.getElementById("btnset").style.display = "block";
	document.getElementById("btncancel").style.display = "block";
	document.getElementById("keypadbtn_row1_col1").style.display = "none";
	document.getElementById("keypadbtn_row1_col2").style.display = "none";
	document.getElementById("keypadbtn_row1_col3").style.display = "none";
	document.getElementById("keypadbtn_row2_col1").style.display = "none";
	document.getElementById("keypadbtn_row2_col3").style.display = "none";
	document.getElementById("keypadbtn_row3_col1").style.display = "none";
	document.getElementById("keypadbtn_row3_col3").style.display = "none";
	document.getElementById("keypadbtn_row4_col1").style.display = "none";
	document.getElementById("keypadbtn_row4_col3").style.display = "none";
}

function set_up_keypad()
{
	document.getElementById("touchkeys").style.display = "block";
	document.getElementById("keypadbtn").style.display = "block";		
	document.getElementById("range").style.display = "block";
	document.getElementById("newValUnits").style.display = "block";
	document.getElementById("newVal").style.display = "block";
	document.getElementById("combo_form").style.display = "none";
	document.getElementById("combo").style.display = "none";
	document.getElementById("keypadbtn_row1_col1").style.display = "block";
	document.getElementById("keypadbtn_row1_col2").style.display = "block";
	document.getElementById("keypadbtn_row1_col3").style.display = "block";
	document.getElementById("keypadbtn_row2_col1").style.display = "block";
	document.getElementById("keypadbtn_row2_col3").style.display = "block";
	document.getElementById("keypadbtn_row3_col1").style.display = "block";
	document.getElementById("keypadbtn_row3_col3").style.display = "block";
	document.getElementById("keypadbtn_row4_col1").style.display = "block";
	document.getElementById("keypadbtn_row4_col3").style.display = "block";
}

function show_touchpad(x, type)
{
	var y = x.parentNode;
	var z = y.parentNode;
	var text = "";
	var range = "";
	var units = "";
	var cur_val = "";
	
	var temp1, temp2, temp3, tempHTML;
//alert(y.innerHTML);
//alert(z.innerHTML);
	
	new_data = document.getElementById("newVal");

	// Extract setting name
	temp1 = y.innerHTML.indexOf("id_")+3;
	temp2 = y.innerHTML.indexOf(" ",temp1);
	temp3 = y.innerHTML.indexOf("\"",temp1);	/* Fix for IE7/8 */
	if (temp3 < temp2)
	{
		temp2 = temp3;
	}
	
	db_name = y.innerHTML.substr(temp1, temp2-temp1);
		
	// Extract setting text
	temp2 = z.innerHTML.indexOf("id_");
	temp1 = z.innerHTML.indexOf(">",temp2) + 1;
	temp2 = z.innerHTML.indexOf("<",temp1);
	text = z.innerHTML.substr(temp1, temp2-temp1);
	document.getElementById("newName").innerHTML = text;

	// Extract units
	temp2 = z.innerHTML.indexOf("units");
	if (temp2 != -1)
	{
		temp1 = z.innerHTML.indexOf(">",temp2) + 1;
		temp2 = z.innerHTML.indexOf("<",temp1);
		units = z.innerHTML.substr(temp1, temp2-temp1);
		document.getElementById("newValUnits").innerHTML = units;
	}
	
	// extract current value
	temp2 = z.innerHTML.indexOf("divtable");
	temp1 = z.innerHTML.indexOf(">",temp2) + 1;
	temp2 = z.innerHTML.indexOf("<",temp1);
	cur_val = z.innerHTML.substr(temp1, temp2-temp1);
	document.getElementById("curVal").innerHTML = "Current value: "+cur_val+units;
	
	switch(type)
	{
		case 'combo':
			var combo=document.getElementById("touch_combo");

			set_up_combo();		
			
			// remove existing options
			while(combo.length > 0)
			{
				combo.remove(0);
			}
					
			// add new options
			tempHTML = y.innerHTML.toLowerCase();	/* IE 7 and 8 change the case so force to lower case so indexOf() works */

			temp1 = tempHTML.indexOf("</option>");	/* first one is empty */
			while(temp1 != -1)
			{
				temp2 = tempHTML.indexOf("</option>", temp1);
				text = y.innerHTML.substr(temp1+8, temp2-temp1-8);

				
				var option=document.createElement("option");
				option.text=text;

				try	// for IE earlier than version 8
				{			
					combo.add(option,combo.options[null]);
				}
				catch (e)
				{
					combo.add(option,null);
				}
							
				temp1 = tempHTML.indexOf("<option>", temp2);
			}
		break;
		case 'password':
		case 'text':
			tempHTML = y.innerHTML.toLowerCase();	/* IE 7 and 8 change the case so force to lower case so indexOf() works */
			// Extract range information
			temp1 = tempHTML.indexOf("range");
			if (temp1 != -1)
			{	
				temp2 = tempHTML.indexOf("\"",temp1);
				range = tempHTML.substr(temp1, temp2-temp1);
				document.getElementById("range").innerHTML = range;
			}
			
			set_up_keypad();
			set_text();	
			break;
		case 'nudge':
		case 'number':
			tempHTML = y.innerHTML.toLowerCase();	/* IE 7 and 8 change the case so force to lower case so indexOf() works */
			// Extract range information
			temp1 = tempHTML.indexOf("range");
			if (temp1 != -1)
			{	
				temp2 = tempHTML.indexOf("\"",temp1);
				range = tempHTML.substr(temp1, temp2-temp1);
				document.getElementById("range").innerHTML = range;
			}
			
			set_up_keypad();
			break;
		default:
			break			
	}
}

function doNothing()
{
//alert("Nothing");
}


function showKeypad()
{
	document.getElementById("touchkeys").style.display = "block";
}

/******************************
submit value
******************************/
function send_value( param, value )
{
// Overwrite the submit function of the form
// data is sent from the server when the PHP is generated, so re-load the page but include the new value in the URI.

	var uri = "iframe.php?param=";

//	if (!check_for_invalid_setting_attempt(param))
//	{
//		thisform.reset();
//		return false;
//	}
	
	uri += param;
	uri += "&value="
	uri += encodeURIComponent(value);		
	frames['setting_frame'].location.href = uri;
//	thisform.reset();
	return false;
}

