/*
WARNING
This file lives in a library - it is copied from the library each time the unit software is built
therefore if you edit the file in a project folder your changes will be lost when you re-build the code.
*/


var disp_value = new Array();			// used for all settings inside tabs
var status_disp_value = new Array();	// used for status panel at top of page
var num_params = 0;
var num_status_params = 0;

var xmlDoc = 0;
var xmlDocSet = 0;
var max = 0;
var min = 0;
var values_read = false;

// specials for ACU
var db_control_info_type = "";
var db_control_info_text = "";
var db_control_state_dropdown_list_index = "";
var db_command_reload_XML_settings_data = "";

var blockXMLsettingsReRead = false;
var blockReload = false;



function blockReReadXMLsettings()
{
	blockXMLsettingsReRead = true;
	blockReload = false;
}

function handler(event)  {
    var response  = event.response;
    var headers  = response.headers;

    // If Access-Control-Allow-Origin CORS header is missing, add it.
    // Since JavaScript doesn't allow for hyphens in variable names, we use the dict["key"] notation.
    if (!headers['access-control-allow-origin']) {
        headers['access-control-allow-origin'] = {value: "*"};
        console.log("Access-Control-Allow-Origin was missing, adding it now.");
    }

    return response;
}

function unBlockReReadXMLsettings()
{
	blockXMLsettingsReRead = false;
	blockReload = false;
}

function checkBlockStateReReadXMLsettings()
{
	if (db_command_reload_XML_settings_data == "Yes")
	{
		unBlockReReadXMLsettings();
		send_form_on_off(this, 'DB_COMMAND_RELOAD_XML_SETTINGS_DATA', 'No')		
	} else
	{
		if ((db_control_info_type == "Request Preset Satellite")||(db_control_info_type == "Request Preset Location"))
			blockReReadXMLsettings();
		else
			unBlockReReadXMLsettings();
	}
}

// end of specials for ACU

function re_read_settings_xml()
{
	req2 = false;

    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest && !(window.ActiveXObject)) {
    	try {
			xmlDocSet = new XMLHttpRequest();
        } catch(e) {
			xmlDocSet = false;
        }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) {
       	try {
        	xmlDocSet = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		xmlDocSet = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		xmlDocSet = false;
        	}
		}
    }
	if(xmlDocSet) {
		xmlDocSet.onreadystatechange = processReqChange2;
		xmlDocSet.open("GET", "http://10.0.101.110/settings                                                                       ", true);
		ifModifiedSince = new Date(0); //January 1, 1970
		xmlDocSet.setRequestHeader("If-Modified-Since", ifModifiedSince);
		xmlDocSet.send("");
	}
}


function processReqChange2() {
    // only if req shows "loaded"
    if (xmlDocSet.readyState == 4) {
        // only if "OK"
        if (xmlDocSet.status == 200) {
            // ...processing statements go here...
			if (values_read == true)
			{
				create_page();
			}
			else
			{
				window.setTimeout("processReqChange2()", 50);
			}
        } else {
            alert("There was a problem retrieving the XML data:\n" +
                xmlDocSet.statusText);
        }
    }
}


function get_firstchild(n)
{
	var x1=n.firstChild;
	while (x1.nodeType!=1)
	{
		x1=x1.nextSibling;
	}
	return x1;
}

function get_nextsibling(n)
{
	var x2=n.nextSibling;
	try
	{
		while ((x2!=null)&&(x2.nodeType!=1))
		{
			x2=x2.nextSibling;
		}
	}
	catch(err)
	{
		return null;
	}		

	return x2;
}

/*********************************************************************************************
Create the settings - name, units, etc

This is a generic function - if your unit requires special functionality, make a create_page() 
function in custom.js - this will take precedence over the function in this file. 
*********************************************************************************************/
function create_page()
{
	var z;
	var curParam;
	var i=0;
	var c=0;
	var display = "";
	var min = "";
	var max = "";
	var units = "";
	var param_str;
	var check_str;
	var x;
	var h;
	var k;
	var j;
	var dark;
	var stat;
	
	z=xmlDocSet.responseXML.documentElement;
	curParam=get_firstchild(z);

	c=0;
	while (c<xmlDocSet.responseXML.getElementsByTagName("name").length)
	{
		display = "";
		units = "";
		
		param_str = curParam.getElementsByTagName("name")[0].childNodes[0].nodeValue;

		try {	document.getElementById("stat_pad").style.height=31*check_settings_before_status()+"px";	}catch(err){}

		if  (param_str == get_alarm_database_name())
		{
			for (stat=0;stat<curParam.getElementsByTagName("display").length;stat++)
			{
				if (document.getElementById("stat_cont" + (stat + check_settings_before_status())) != null)
				{
					document.getElementById("stat_cont" + (stat + check_settings_before_status())).innerHTML = curParam.getElementsByTagName("display")[stat].childNodes[0].nodeValue;
				}					
			}
		}
		else if (document.getElementById("id_" + param_str) != null)
		{
			check_str = document.getElementById("id_" + param_str).id;
		
			// display name
			display = curParam.getElementsByTagName("display")[0].childNodes[0].nodeValue;
			document.getElementById(check_str).innerHTML = display;
		
			// read min/max
			if(curParam.getElementsByTagName("min").length>0)
			{
				min = curParam.getElementsByTagName("min")[0].childNodes[0].nodeValue;
				max = curParam.getElementsByTagName("max")[0].childNodes[0].nodeValue;
			}
			else
			{
				min = "";
				max = "";
			}
			
			// display or hide based on settings.xml
			if (curParam.attributes[0].nodeValue == "yes")
			{
				document.getElementById(check_str).parentNode.parentNode.style.display = "block";
			}
			else
			{
				document.getElementById(check_str).parentNode.parentNode.style.display = "none";			
			}

			// units
			if(curParam.getElementsByTagName("units").length>0)
			{
				if (curParam.getElementsByTagName("units")[0].childNodes.length>0)
				{
					if (document.getElementById("unit_" + param_str) != null)
					{
						check_str = document.getElementById("unit_" + param_str).id;
				
						units = curParam.getElementsByTagName("units")[0].childNodes[0].nodeValue;
						
						switch (units)
						{
							case "degC":
							case "DegC":
								document.getElementById(check_str).innerHTML = "&deg;C";
								break;
							case "deg":
							case "Deg":
								document.getElementById(check_str).innerHTML = "&deg;";
								break;
							default:
								document.getElementById(check_str).innerHTML = units;
								break;
						}							
					}
				}
			}

			// setting type
			x = document.getElementsByName("field");
			for (j=0;j<x.length;j++)
			{
				if (x[j].id == param_str)
				{
					switch(x[j].type)
					{
						case 'select-one':
							// remove existing select entries
							while (x[j].length>1)
							{
								x[j].remove(x[j].length-1);
							}
									
							for (h=0;h<curParam.getElementsByTagName("option").length;h++) 
							{
								if (curParam.getElementsByTagName("option")[h].attributes[0].nodeValue == "yes")
								{
									k=document.createElement('option');
									k.text=curParam.getElementsByTagName("option")[h].childNodes[0].nodeValue;
									try
									{
										x[j].add(k,h+1);
									}
									catch(err)
									{
										x[j].add(k,null);
									}
								}
							}
							break;
						case 'text':
							x[j].title = "Range: " + min + " to " + max + " " + units;
							break;
						default:
							break;
					}		
				}
			}
		}
		c++;
		// step through the parameter elements
		curParam = get_nextsibling(curParam);
		if (curParam == null)
		{
			break;
		}
	}
	
	// display or hide based on class defined in menus.xml
	x=document.getElementsByTagName("form");
	j=0;

	var temp_str = "blah";
	
	for (i=0;i<x.length;i++)
	{
		// remove any previous additions to the class (set_cont_*)
		if (x[i].parentNode.className.indexOf(" set_cont") >= 0)
		{
			temp_str = x[i].parentNode.className;
			x[i].parentNode.className = temp_str.substring(0, x[i].parentNode.className.indexOf(" set_cont"));
		}
	  	if (x[i].parentNode.className.indexOf("set_cont") >= 0)
		{
			temp_str = x[i].parentNode.className;
			x[i].parentNode.className = temp_str.substring(0, x[i].parentNode.className.indexOf("set_cont"));
		}

		if (x[i].parentNode.style.display != "none")
		{
			if (db_control_info_type == x[i].parentNode.className)
			{
				x[i].parentNode.style.display = "block";					
			}
			else if (x[i].parentNode.className == "all")
			{
				x[i].parentNode.style.display = "block";					
			}
 			else if ((db_control_info_type == "Information" && x[i].parentNode.className == "") ||
 						(db_control_info_type == "" && x[i].parentNode.className == "Information") ||
						(db_control_info_type == "Information" && x[i].parentNode.className == "Action halted"))
			{
				x[i].parentNode.style.display = "block";					
			}
			else if ((db_control_info_type == "Yes/No/Abort")	&& (x[i].parentNode.className == ""))			
			{
				// handled by custom.js
			}
			else
			{
				x[i].parentNode.style.display = "none";			
			}
		}
	}

	checkBlockStateReReadXMLsettings();
	
	// colouring of setting boxes:
	x=document.getElementsByTagName("form");
	dark = false;
	j=0;
	set_count = 0;
	cur_top = 0;
	for (i=0;i<x.length;i++)
	{	
		if (x[i].parentNode.id.indexOf("set_info") >= 0)
		{
			x[i].parentNode.className = x[i].parentNode.className + " set_cont_light";
			set_count ++;
			if (set_count > 1)
			{
				set_count = 0; 
				cur_top -= x[i].parentNode.offsetHeight;
			}

			if (j == 0)
			{
				cur_top += 2;
			}

			x[i].parentNode.style.top = cur_top + "px";
			cur_top += x[i].parentNode.offsetHeight;
			j++;
		}
		else if (x[i].parentNode.id.indexOf("help_info") >= 0)
		{
				set_count = 0;
				j = 0;
				x[i].parentNode.className = x[i].parentNode.className + " set_cont_light";

				// gap between the setting boxes
//				cur_top += 5;
				x[i].parentNode.style.top = cur_top + "px";
				cur_top += x[i].parentNode.offsetHeight;
			
				dark = !dark;
		}
		else if (x[i].parentNode.id == "yna_box")			
		{
		}		
		else if (x[i].parentNode.id != "button_bar")			
		{
			if (x[i].parentNode.style.display != "none")			
			{
				set_count = 0;
				j = 0;
				x[i].parentNode.className = x[i].parentNode.className + " set_cont_light";

				// gap between the setting boxes
				cur_top += 5;
				x[i].parentNode.style.top = cur_top + "px";
				cur_top += x[i].parentNode.offsetHeight;
			
				dark = !dark;
			}
		}
	}
	return false;
}



/******************************
validate and format the number from text box
 - positive numbers only
******************************/
function validate_number(theForm, parameter,/* num_dp, */v_min, v_max)
{
	var error = "";
	var digits = "0123456789.-";
	var i;
	var new_value ;
		
//	No response for empty fields
	if (theForm.value == "" || theForm.value == null)
	{
		return false;
	}

	min = v_min*1;	// copy to globals for use by other functions
	max = v_max*1;	// copy to globals for use by other functions

	// check for invalid characters
	for (i = 0; i < theForm.value.length; i++)
	{
		temp = theForm.value.substring(i, i+1)
		if (digits.indexOf(temp) == -1 && theForm.value != "")
		{
			error += "Please enter a number.\n";
			break;
		}
	}

	// check ranges
	if (((+theForm.value < min) || (+theForm.value > max)) && (error== "" ))
	{
		error = "The value entered is outside the range for this setting.\n\n";
		error += "It must be in the range ";
		error += min;
		error += " to ";
		error += max;
	}

	// Format the data
	new_value = parseFloat(theForm.value);
	theForm.value = new_value;
	
	if (error=="")
	{
		return true;
	}
	else
	{
		alert (error);
		return false;
	}
}

function validate_combo(theForm)
{
	if (theForm.value == "" || theForm.value == null)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function validate_radio(theForm)
{
	if (theForm[0].checked == false && theForm[1].checked == false)
	{
		return false;
	}
	else
	{
		return true;
	}
}

/******************************
submit_form
******************************/
function send_form(thisform, page, param, nudge)
{
// Overwrite the submit function of the form
// data is sent from the server when the PHP is generated, so re-load the page but include the new value in the URI.

	var uri = "iframe.php?param=";

	if (!check_for_invalid_setting_attempt(param) || !check_for_confirmation(param, "") )
	{
		thisform.reset();
		return false;
	}	
	
	uri += param;
	uri += "&value="
	
	/* unit specific code */
	
	if (param.indexOf("UNIT_LICENCE") != -1)
	{
		var str = thisform.field.value;		
		uri += encodeURIComponent(str.toUpperCase());
	}
	else		
	{
		uri += encodeURIComponent(thisform.field.value);		
	}
	
//	switch (param)
//	{
//		case "DB_DVE_UNIT_LICENCE1":
//		case "DB_DVE_UNIT_LICENCE2":
//			/* must be upper case */
//			var str = thisform.field.value;		
//			uri += encodeURIComponent(str.toUpperCase());		
//			break;
//		default:
//			uri += encodeURIComponent(thisform.field.value);		
//			break;
//	}		
	
	frames['setting_frame'].location.href = uri;
	thisform.reset();
	return false;
}

function send_form2(value, param)
{
// Overwrite the submit function of the form
// data is sent from the server when the PHP is generated, so re-load the page but include the new value in the URI.

	var uri = "iframe.php?param=";

	if (!check_for_invalid_setting_attempt(param) || !check_for_confirmation(param, value) )
	{
		return false;
	}	
	
	uri += param;
	uri += "&value="
	
	if (param.indexOf("UNIT_LICENCE") != -1)
	{
		var str = value;		
		uri += encodeURIComponent(str.toUpperCase());
	}
	else		
	{
		uri += encodeURIComponent(value);		
	}
	
	/* unit specific code */
//	switch (param)
//	{
//		case "DB_DVE_UNIT_LICENCE1":
//		case "DB_DVE_UNIT_LICENCE2":
//			/* must be upper case */
//			var str = value;		
//			uri += encodeURIComponent(str.toUpperCase());		
//			break;
//		default:
//			uri += encodeURIComponent(value);		
//			break;
//	}		
	
	frames['setting_frame'].location.href = uri;

	return false;
}

function send_form_combo(thisform, page, param, nudge)
{
// Overwrite the submit function of the form
// data is sent from the server when the PHP is generated, so re-load the page but include the new value in the URI.

	var n = thisform.field.selectedIndex;    // Which menu item is selected
	var val = thisform.field[n].text;        // Return string value of menu item
	var uri;
	if (!check_for_invalid_setting_attempt(param) || !check_for_confirmation(param, val) )
		{
			thisform.reset();
			return false;
		}	
	
	uri = "iframe.php?param=";
	uri += param;
	uri += "&value="

	uri += encodeURIComponent(val);
	frames['setting_frame'].location.href = uri;
	thisform.reset();
	
	return false;
}


function send_form_nudge(thisform, page, param, value)
{
	if (!check_for_invalid_setting_attempt(param) || !check_for_confirmation(param, value) )
	{
		thisform.reset();
		return false;
	}
// Overwrite the submit function of the form
// data is sent from the server when the PHP is generated, so re-load the page but include the new value in the URI.
	var uri = "iframe.php?param=";
	uri += param;
	uri += "&value="
	uri += encodeURIComponent(value);
	frames['setting_frame'].location.href = uri;
	
	thisform.reset();
	return false;
}


function send_form_on_off(thisform, param, value)
{
	if (!check_for_invalid_setting_attempt(param) || !check_for_confirmation(param, value) )
	{
		thisform.reset();
		return false;
	}
// Overwrite the submit function of the form
// data is sent from the server when the PHP is generated, so re-load the page but include the new value in the URI.

	var uri = "iframe.php?param=";
	uri += param;
	uri += "&value="
	uri += encodeURIComponent(value);
	frames['setting_frame'].location.href = uri;
	
	return false;
}

/******************************
nudge current value up/down
******************************/
function nudge(theForm, setting_count,parameter, increment, /*num_dp, */v_min, v_max, page)
{
	var div_name = "divtable"+setting_count;
	var cur_value = 0;
	var new_value = 0;

	cur_value = document.getElementById(div_name).innerHTML;

	new_value = parseFloat(cur_value);
	new_value += increment;
	new_value = Math.round(new_value*10)/10;

	min = v_min*1;	// copy to globals for use by other functions
	max = v_max*1;	// copy to globals for use by other functions
	// check that the ranges are correct
	var range_array=(document.getElementById(parameter).title).split(" ");
	if (( new_value >= range_array[1]*1) && (new_value <= range_array[3]*1))
	{		
		theForm.form.field.value = new_value;
		send_form_nudge(theForm.form, page, parameter, new_value);
	}
}

/******************************
Sets displayed image for statuses 
******************************/
function check_colour()
{
	if (document.getElementById("divtable").innerHTML == 'OK')
	{
		document.state_img.src = '../img/ok.gif';
	}
	else
	{
		document.state_img.src = '../img/fault.gif';
	}
}

function submit_refresh()
{
	document.set_form.submit();
	document.set_form.reset();

}


/******************************
Start data load
******************************/

function startDataLoad()
{
	var i;
	num_status_params = startDataLoad.arguments[0];
	num_params = startDataLoad.arguments.length-num_status_params-1;

	// load in the normal parameters
	for (i = 0;i < num_params;i++)
	{
		disp_value[i] = startDataLoad.arguments[i+num_status_params+1];
	}
	
	// load in the status parameters
	for (i = 0;i < num_status_params;i++)
	{
		status_disp_value[i] = startDataLoad.arguments[i+1];
	}
		
	// create xmlDoc here otherwise you get a huge memory leak in FireFox
/*	if (window.ActiveXObject)	// code for IE
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDocSet=new ActiveXObject("Microsoft.XMLDOM");
	}
	else if (document.implementation && document.implementation.createDocument)	// code for Mozilla, Firefox, Opera, etc.
	{
		xmlDoc=document.implementation.createDocument("","",null);
		xmlDocSet=document.implementation.createDocument("","",null);
	}
	else
	{
		//alert('Your browser cannot handle this script');
	}*/
	
	loadXML();
	re_read_settings_xml();
}


/******************************
Load XML file
******************************/

function loadXML() {
	req = false;

    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest && !(window.ActiveXObject)) {
    	try {
			xmlDoc = new XMLHttpRequest();
        } catch(e) {
			xmlDoc = false;
        }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) {
       	try {
        	xmlDoc = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		xmlDoc = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		xmlDoc = false;
        	}
		}
    }
    
	if(xmlDoc) {
		xmlDoc.onreadystatechange = processReqChange;
		xmlDoc.open("GET", "http://10.0.101.110/data.xml", true);
		ifModifiedSince = new Date(0); //January 1, 1970
		xmlDoc.setRequestHeader("If-Modified-Since", ifModifiedSince);
		xmlDoc.send("");
	}
}


function processReqChange() {
    // only if req shows "loaded"
    if (xmlDoc.readyState == 4) {
        // only if "OK"
        if (xmlDoc.status == 200) {
            // ...processing statements go here...
			values_read = false;
			getValue();
			values_read = true;
        } else {
			loadXML();
//            alert("There was a problem retrieving the XML data:\n" + xmlDoc.statusText);
        }
    }
}

// ACU specific
var axis_flash_state = 0;
var fault_flash_state = 0;

function getAxisFlashState()
{
	return axis_flash_state;
}

function getFaultFlashState()
{
	return fault_flash_state;
}
/******************************
Find required data from xml file
******************************/
function getValue()
{
	// ACU specific
	if (axis_flash_state++ > 0)
	{
		axis_flash_state = 0;
	}
	if (fault_flash_state++ > 0)
	{
		fault_flash_state = 0;
	}
	
	// get the search term from a form field with id 'searchme'
	try { var allitems = xmlDoc.responseXML.getElementsByTagName("name");     } catch(e) {window.setTimeout("loadXML()", 1000);return}
	try { var allvalitems = xmlDoc.responseXML.getElementsByTagName("value"); } catch(e) {window.setTimeout("loadXML()", 1000);return}
	var temp_str;
	var j;
	var i;
	var exp;
	var name;
	var div_name;
	var container_name;
	var page_refresh = false;
	var l, b;
	
	// all statuses inside tabs
	for (j=0;j<num_params;j++) 
	{
		div_name = "divtable"+j;
		container_name = "stat_cont"+j;

		for (i=0;i<allitems.length;i++) 
		{
			// special case for DB_DVE_ALARMS.
			// parameter name has the index tagged on to the end.
			if (disp_value[j].indexOf(get_alarm_database_name()) == 0)
			{
				exp = new RegExp(get_alarm_database_name(),"i");
				temp_index = parseInt(disp_value[j].substring(get_alarm_database_name().length));
			}
			else
			{
				exp = new RegExp(disp_value[j]+"$","i");
			}

			name = allitems[i].firstChild.nodeValue;
			
			if ( name.match(exp) != null) 
			{
				// If the innerHTML value is different from the XML data then the XML has been changed.
				// on page load, the innerHTML is initialised to "".  This occurs when the page is first loaded or when the submit button is pressed
				// if the data has been changed by external edit (unit front panel or another browser) then innerHTML will contain the old value
				
				// special for ACU
				if (name == "DB_CONTROL_INFO_TYPE")
				{
					db_control_info_type = allvalitems[i].firstChild.nodeValue;
				}
				// special for ACU
				if (name == "DB_CONTROL_INFO_TEXT")
				{
					db_control_info_text = allvalitems[i].firstChild.nodeValue;
				}
				// special for ACU
				if (name == "DB_LOCATION_STATE_DROPDOWN_LIST")
				{
					db_control_state_dropdown_list_index = allvalitems[i].firstChild.nodeValue;
				}
				// special for ACU
				if (name == "DB_COMMAND_RELOAD_XML_SETTINGS_DATA")
				{
					db_command_reload_XML_settings_data = allvalitems[i].firstChild.nodeValue;
				}
				
				if (name == get_alarm_database_name()) 
				{
					if (allvalitems[i].firstChild.nodeValue.charAt(temp_index) == '1')
					{
						document.getElementById(container_name).style.display = "block";
					}
					else
					{
						document.getElementById(container_name).style.display = "none";
					}
				}
				else
				{
					// If the innerHTML value is different from the XML data then the XML has been changed.
					// on page load, the innerHTML is initialised to "".  This occurs when the page is first loaded or when the submit button is pressed
					// if the data has been changed by external edit (unit front panel or another browser) then innerHTML will contain the old value
					if ((document.getElementById(div_name).innerHTML != allvalitems[i].firstChild.nodeValue) &&
						(document.getElementById(div_name).innerHTML != ""))
					{
						page_refresh = true;
					}				

					document.getElementById(div_name).innerHTML = allvalitems[i].firstChild.nodeValue;
				}
				
				break;
			}
		}	
	}
	
	// status panel at top of page
	for (j=0;j<num_status_params;j++) 
	{
		div_name = "top_divtable"+j;
		container_name = "top_stat_cont"+j;

		for (i=0;i<allitems.length;i++) 
		{
			exp = new RegExp(status_disp_value[j],"i");
			
			name = allitems[i].firstChild.nodeValue;

			if ( name.match(exp) != null) 
			{
				if (name.indexOf("PRESET_PROGRESS") != -1)
//				if (name == "DB_DVE_PRESET_PROGRESS")
				{
					if ((allvalitems[i].firstChild.nodeValue > 0) && (allvalitems[i].firstChild.nodeValue < 99))
					{
					    try {	document.getElementById("progress").style.display = "block";    } catch(e) {}
					}
					else
					{
					    try {	document.getElementById("progress").style.display = "none";     } catch(e) {}
					}					
				}
				else
				{
					custom_display_status_panel(name, div_name, allvalitems[i].firstChild.nodeValue,j);
				}
				break;
			}
		}	
	}
	
	if (page_refresh == true)
	{
		check_for_page_refresh();
	}

	window.setTimeout("loadXML()", 1000);	
}

