/******************************************************************************************************
This file contains all of the javascript code which needs to be customised between different units.
Each function will require some changes

All other code should remain the same providing I haven't unwittingly included any 'features' which shouldn't be there.
******************************************************************************************************/

/******************************************
get_alarm_database_name
so that the special case code will work
******************************************/
function get_alarm_database_name()
{
	return "DB_L2174_ALARMS";
}

/******************************************
check_settings_before_status
The number of settings (e.g. clear alarms)
displayed before the statuses
******************************************/
function check_settings_before_status()
{
	return 0;
}


/******************************
Create the settings - sname, units, etc
******************************/
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

		if  (param_str == "DB_L2174_ALARMS")
		{
			for (stat=0;stat<curParam.getElementsByTagName("display").length;stat++)
			{
				if (document.getElementById("stat_cont" + (stat+3)) != null)
				{
					document.getElementById("stat_cont" + (stat+3)).innerHTML = curParam.getElementsByTagName("display")[stat].childNodes[0].nodeValue;
				}					
			}
		}
		else if  (param_str == "DB_DEMOD_SELFTEST_RESULTS")
		{
			for (stat=0;stat<curParam.getElementsByTagName("display").length;stat++)
			{
				if (document.getElementById("demod_selftest" + (stat)) != null)
				{
					document.getElementById("demod_selftest" + (stat)).innerHTML = curParam.getElementsByTagName("display")[stat].childNodes[0].nodeValue;
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
					(db_control_info_type == "Information" && x[i].parentNode.className == "Action halted"))
			{
				x[i].parentNode.style.display = "block";					
			}
			else if ((db_control_info_type == "Yes/No/Abort") && (x[i].parentNode.className == ""))
			{
				// handled by custom.js
			}
			else
			{
				x[i].parentNode.style.display = "none";			
			}
		}
	}

	
	
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
Find required data from xml file
******************************/
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
	try {	var allitems = xmlDoc.responseXML.getElementsByTagName("name");		} catch(e) { window.setTimeout( "loadXML()", 1000 ); return }
	try { var allvalitems = xmlDoc.responseXML.getElementsByTagName("value");	} catch(e) { window.setTimeout( "loadXML()", 1000 ); return }
	
	var temp_str;
	var temp_index;
	var j;
	var i;
	var exp;
	var name;
	var div_name;
	var container_name;
	var demod_name;
	var decod_name;
	var page_refresh = false;
	var l, b;
	var alarmDBstr, demodLicDBstr, decodDBstr, demodSelfTestDBstr;
	
	// all statuses inside tabs
	if (num_params > 0)
	{
		for (j=0;j<num_params;j++) 
		{
			div_name = "divtable"+j;
			container_name = "stat_cont"+j;
			demod_name = "demod_cont"+j;
			decod_name = "decod_cont"+j;
			demod_selftest = "demod_selftest"+j;
			
			alarmDBstr = "DB_L2174_ALARMS";
			demodSelfTestDBstr = "DB_DEMOD_SELFTEST_RESULTS";
	
			for (i=0;i<allitems.length;i++) 
			{
				// special case for DB_L2174_ALARMS.
				// parameter name has the index tagged on to the end.
				if (disp_value[j].indexOf(alarmDBstr) == 0)
				{
					exp = new RegExp(alarmDBstr,"i");
					temp_index = parseInt(disp_value[j].substring(alarmDBstr.length));
				}
				else if (disp_value[j].indexOf(demodSelfTestDBstr) == 0)
				{
					exp = new RegExp(demodSelfTestDBstr,"i");
					temp_index = parseInt(disp_value[j].substring(demodSelfTestDBstr.length));
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
				
					if (name == "DB_L2174_ALARMS") 
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
					else if (name == "DB_DEMOD_SELFTEST_RESULTS") 
					{
						if (allvalitems[i].firstChild.nodeValue.charAt(temp_index) == '1')
						{
							document.getElementById(demod_selftest).style.display = "block";
						}
						else
						{
							document.getElementById(demod_selftest).style.display = "none";
						}
					}
					else
					{
						// If the innerHTML value is different from the XML data then the XML has been changed.
						// on page load, the innerHTML is initialised to "".  This occurs when the page is first loaded or when the submit button is pressed
						// if the data has been changed by external edit (unit front panel or another browser) then innerHTML will contain the old value
						if (document.getElementById(div_name).innerHTML != allvalitems[i].firstChild.nodeValue)
/*								&&	(document.getElementById(div_name).innerHTML != ""))*/
						{
							page_refresh = true;
						}				

						document.getElementById(div_name).innerHTML = allvalitems[i].firstChild.nodeValue;
					}
				
					break;
				}
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


/******************************************
check_for_redirect
allows page to be redirected from target 
depending on values of other settings
******************************************/
function check_for_redirect(target)
{
	switch (target)
	{
		case "decodlicences.html":
			self.location =  "decodlicence.php"; 
			return false;
			break;
//		case "routing.html":
//			top.location =  "routing.php";
//			return false;
//			break;
		default:
			break;
	}

	return true;
}


/******************************************
check_for_page_refresh
Calling re_read_settings_xml() will trigger combo 
boxes, min/max values and visible settings to update 

If you add logic here, you can reduce bandwidth 
requirments by only re-loading when needed
******************************************/
function check_for_page_refresh()
{
	// re-load settings.xml
	re_read_settings_xml();
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
/******************************************
control how the status boxes in the top panel work
name - parameter name (as in unit database)
div_name - name div used to display value
value - current value of parameter
index - added on to class names etc if required
******************************************/

function standard_display_status_panel(name, div_name, value, index)
{
//alert(div_name);
	if (document.getElementById(div_name) != null)
	{
//alert(name);
		switch (name)
		{
			// These need to be the same as those listed in initialisation of $func_call in generate_menu.php
			// $func_call = "startDataLoad(.....
			case "DB_DEMOD_RX_MODE":
			case "DB_L2174_VIDEO_INPUT_MODE":
			case "DB_DECOD_LINE_STD":
			case "DB_L2174_WEB_TEXT":
				document.getElementById(div_name).innerHTML = value;
			break;

			case "DB_DEMOD_ASI_1_LOCK":
			case "DB_DECOD_ASI_LOCK":
			case "DB_DECOD_IP1_LOCK":
			case "DB_DECOD_VIDEO_LOCKED":
			case "DB_DECOD_AUDIO_A_LOCKED":
			case "DB_DECOD_AUDIO_B_LOCKED":
			case "DB_DEMOD_COARSE_LOCK_1":
			case "DB_DEMOD_COARSE_LOCK_2":
			case "DB_DEMOD_COARSE_LOCK_3":
			case "DB_DEMOD_COARSE_LOCK_4":
				if (value == "Locked")
					document.getElementById(div_name).className = "top_data_cont_gr" + index;
				else
					document.getElementById(div_name).className = "top_data_cont" + index;

				document.getElementById(div_name).innerHTML = value;
			break;
				
			case "DB_L2174_ALARMS":
				if (value.indexOf("1") >= 0)
				{
					document.getElementById(div_name).innerHTML = "ALARM";
        	     	if (getFaultFlashState() == 1)
						document.getElementById(div_name).style.color = "red";
					else
						document.getElementById(div_name).style.color = "white";
				}
				else
				{
					document.getElementById(div_name).style.color = "white";
					document.getElementById(div_name).innerHTML = "OK";
				}
 			break;

 			case "DB_ETRAX_LICENCE_OPTIONS":
				var str = window.location.href;
				if (str.indexOf("routing.php") != -1)
				{
	 				updateEtraxLicenceOptions_from_xml(value);
	 			}
				if (str.indexOf("etraxlicence.php") != -1)
				{
					/* DVBS2 QPSK  */		document.getElementById("divtable0").innerHTML = (value.charAt(2) == '1')  ? "Enabled" : "Disabled";
					/* DVBS2 16APSK  */	document.getElementById("divtable1").innerHTML = (value.charAt(3) == '1')  ? "Enabled" : "Disabled";
					/* UHF Input   */		document.getElementById("divtable2").innerHTML = (value.charAt(4) == '1')  ? "Enabled" : "Disabled";
				}
			break;
 			
 			case "DB_DECOD_LICENCE_OPTIONS":
				var str = window.location.href;
//alert("str "+str);
				if (str.indexOf("routing.php") != -1)
				{
					updateDecodLicenceOptions_from_xml(value);
				}
				if (str.indexOf("decodlicence.php") != -1)
				{
					/* SD LD 	 	*/		document.getElementById("divtable0").innerHTML = (value.charAt(0) == '1')  ? "Enabled" : "Disabled";
					/* HD LD			*/	document.getElementById("divtable1").innerHTML = (value.charAt(1) == '1')  ? "Enabled" : "Disabled";
					/* MPEG2 422   */		document.getElementById("divtable2").innerHTML = (value.charAt(2) == '1')  ? "Enabled" : "Disabled";
					/* SD GEN  		*/		document.getElementById("divtable3").innerHTML = (value.charAt(3) == '1')  ? "Enabled" : "Disabled";
					/* HD GEN  		*/		document.getElementById("divtable4").innerHTML = (value.charAt(4) == '1')  ? "Enabled" : "Disabled";
					
					/* SD H264  	*/		document.getElementById("divtable5").innerHTML = (value.charAt(6) == '1')  ? "Enabled" : "Disabled";
					/* HD H264   	*/		document.getElementById("divtable6").innerHTML = (value.charAt(7) == '1')  ? "Enabled" : "Disabled";
					/* H264 High Pro */		document.getElementById("divtable7").innerHTML = (value.charAt(8) == '1')  ? "Enabled" : "Disabled";
					/* H264 422 	*/		document.getElementById("divtable8").innerHTML = (value.charAt(9) == '1')  ? "Enabled" : "Disabled";
					/* H264 10-bit */		document.getElementById("divtable9").innerHTML = (value.charAt(10) == '1') ? "Enabled" : "Disabled";

					/* SD SDI   	*/		document.getElementById("divtable10").innerHTML = (value.charAt(12) == '1') ? "Enabled" : "Disabled";
					/* Digital   	*/		document.getElementById("divtable11").innerHTML = (value.charAt(14) == '1') ? "Enabled" : "Disabled";
					/* Ch C & D   	*/		document.getElementById("divtable12").innerHTML = (value.charAt(15) == '1') ? "Enabled" : "Disabled";

					/* EBS   */				document.getElementById("divtable13").innerHTML = (value.charAt(18) == '1') ? "Enabled" : "Disabled";
					/* BISS   */			document.getElementById("divtable14").innerHTML = (value.charAt(19) == '1') ? "Enabled" : "Disabled";
					/* AES 128 */			document.getElementById("divtable15").innerHTML = (value.charAt(20) == '1') ? "Enabled" : "Disabled";
					/* AES 256 */			document.getElementById("divtable16").innerHTML = (value.charAt(21) == '1') ? "Enabled" : "Disabled";
					/* AES 128+ */			document.getElementById("divtable17").innerHTML = (value.charAt(22) == '1') ? "Enabled" : "Disabled";
					/* AES 256+ */			document.getElementById("divtable18").innerHTML = (value.charAt(23) == '1') ? "Enabled" : "Disabled";
 			
					/* IP In   */			document.getElementById("divtable19").innerHTML = (value.charAt(25) == '1') ? "Enabled" : "Disabled";
					/* IP Out   */			document.getElementById("divtable20").innerHTML = (value.charAt(26) == '1') ? "Enabled" : "Disabled";
					/* IP FEC   			document.getElementById("divtable21").innerHTML = (value.charAt(27) == '1') ? "Enabled" : "Disabled";*/
				}
	 		break;
 			
	 		case "DB_CCU_STATUS":
				var str = window.location.href;
//alert("str "+str);
				if (str.indexOf("ccu.html") != -1)
				{
					if (value == "Not Detected")
					{
						document.getElementById("set_info7").style.display = "none";
						document.getElementById("set_info8").style.display = "none";
					}
					else
					{
						document.getElementById("set_info7").style.display = "block";
						document.getElementById("set_info8").style.display = "block";
					}
				}
	 		break;
 			
			default:
			break;
		}
	}
}

function custom_display_status_panel(name, div_name, value, index)
{
// Handling of the Routing control parameters. Added to the status variables, and handled separately...
	switch (name)
	{
		case "DB_L2174_DIVERSITY_MUX":
			try {update_diversity_mode_from_xml(value);} catch(e) {}
		break;
		case "DB_DECOD_IP1_OUTPUT_MUX":
			try {updateDecodIP1switch_from_xml(value);} catch(e) {}
		break;
		case "DB_DEMOD_ASI1_OUTPUT_MUX":
			try {updateDemodASI1switch_from_xml(value);} catch(e) {}
		break;
		case "DB_DEMOD_ASI2_OUTPUT_MUX":
			try {updateDemodASI2switch_from_xml(value);} catch(e) {}
		break;
		case "DB_L2174_DEMOD_DIVERSITY":
			try {updateDemodDiversityswitch_from_xml(value);} catch(e) {}
		break;
		case "DB_L2174_ASI_DIVERSITY":
			try {updateASIDiversityswitch_from_xml(value);} catch(e) {}
		break;
		case "DB_L2174_IP_DIVERSITY":
			try {updateIPDiversityswitch_from_xml(value);} catch(e) {}
		break;
		default:
			standard_display_status_panel(name, div_name, value, index);
		break;
	}
	
}

/*********************************************************
Some settings can only be set if other settings have certain values.
In this case display a message box with a suitably worded warning
*********************************************************/
function check_for_invalid_setting_attempt(param)
{
	var i;

	switch(param)
	{
		// carrier must be OFF in order to change these settings		
		case "DB_DEMOD_FREQ1":
		case "DB_L2174_SIGNAL_MODE":
		case "DB_L2174_PRESET_RECALL":
		case "DB_L2174_VIDEO_INPUT_MODE":
		case "DB_DEMOD_OFDM_BANDWIDTH":
		case "DB_DEMOD_OFDM_GUARD_INTV":
			for (i=0;i < num_status_params;i++)
			{
				if (status_disp_value[i] == 'DB_DVE_CARRIER')
				{
					if (document.getElementById("top_divtable"+i).innerHTML == 'On')
					{					
						alert("This setting cannot be changed if the Carrier is set to On");
						return false;
					}
					else
					{
						break;
					}
				}
			}
			break;
		default:
			break;
	}
	return true;
}
/*********************************************************
Some settings require a yes/no confirmation
*********************************************************/
function check_for_confirmation(param, val)
{
	var i;

	switch(param)
	{
		case "DB_L2174_PRESET_STORE":
		case "DB_L2174_PRESET_RECALL":
		case "DB_L2174_REBOOT":
			if (val == 'Yes')
			{					
				return( confirm("Are you sure?"));
			}
			else
			{
				break;
			}
			break;
		default:
			break;
	}
	return true;
}
			
