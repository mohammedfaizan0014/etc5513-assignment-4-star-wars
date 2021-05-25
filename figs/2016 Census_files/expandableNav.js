
window.onload = clearCurrentLink;

function toggle(objID, bListings) 
{
	if (!document.getElementById) return;
	var obj = document.getElementById(objID);
	if (obj == null || obj == undefined) return;
	var ob = obj.style;
	
	if (objID.substring(0, 2) == "ul") {
		
		if (ob.display == '' && bListings) {
			ob.display = 'inline';	
			toggleIcon = 'm' + objID.substring(2);
		} else {
			toggleIcon = 'p' + objID.substring(2);
		}
		ob.display = (ob.display == 'inline')?'none': 'inline';
		toggle(toggleIcon);
		return;
		
	}

	if (ob.display == "inline" || ob.display == "")
	{
		if (objID.substring(0, 1) == "p") {
			hideElement('p'+ objID.substring(1));
			showElement('m'+ objID.substring(1));		
		} else if (objID.substring(0, 1) == "m") {
			hideElement('m'+ objID.substring(1));
			showElement('p'+ objID.substring(1));		
		}
	} else {
		if (objID.substring(0, 1) == "p") {
			showElement('p'+ objID.substring(1));
			hideElement('m'+ objID.substring(1));		
		} else if (objID.substring(0, 1) == "m") {
			showElement('m'+ objID.substring(1));
			hideElement('p'+ objID.substring(1));		
		}
	}

}

function hideElement(objID) 
{
	if (!document.getElementById) return;
	var ob = document.getElementById(objID).style;
	ob.display = 'none';
}

function showElement(objID) 
{
	if (!document.getElementById) return;
	var ob = document.getElementById(objID).style;
	ob.display = 'inline';
}

function clearCurrentLink(){

	//have to just get the pos number .. or not really required cos the agent will be putting it always 
	//at the end .. hatif the clients are clever and construct it themselvs for a differnt one.. 
	//why put navpos in really .. why not just compare the href values with any parameters removed, 
	//ie get everything to the left of '?' if it is there or just the base if it isint...... 

    var a = document.getElementsByTagName("A");
    for(var i=0;i<a.length;i++){
	//get parent node of a until id of mininav is found and if so break and do checking below... 
	//this way only a mininav's are processed so as not to disrupt the structure of other stuff
	
	var parent = a[i].parentNode;
	while (parent != undefined) {
		if (parent.id == 'mininavexp') {
			var navPosA = a[i].href;
			var navPosWin = window.location.href;
			var winHasNavPos = false;

			if (navPosWin .indexOf("&navpos") != -1) {
				winHasNavPos = true;
				navPosWin = strRight(navPosWin, "&navpos");
				if (navPosWin .indexOf("&") != -1) 
					navPosWin = strLeft(navPosWin , "&");
			} else {
				if (navPosWin.indexOf("?") != -1)
					navPosWin = strLeft(navPosWin, "?");
			}
			
			if (winHasNavPos) { //get navPos from navPosA, otherwise the thing won't expand
				if (navPosA.indexOf("&navpos") != -1) {
					navPosA = strRight(navPosA, "&navpos");	
					if (navPosA.indexOf("&") != -1) 
						navPosA = strLeft(navPosA, "&");
				} else {
					if (navPosA.indexOf("?") != -1)
						navPosA = strLeft(navPosA, "?");
				}
			} else {
				if (navPosA.indexOf("?") != -1)
						navPosA = strLeft(navPosA, "?");
			}
			navPosA = navPosA.replace("%20", "+");
			navPosWin = navPosWin.replace("%20", "+");
			if(navPosA.toLowerCase() == navPosWin.toLowerCase()){
		    				removeNode(a[i]);       
			}
		}
		parent = parent.parentNode;
	}
    }
    
}

function removeNode(n){
	//clickable
	var liNode = n.parentNode;
	
	var nodeText;
	var parentn;
	
		if (liNode.tagName.toLowerCase() == "li") {
		  n.className = "selectedNav";	
	    parentn = liNode.parentNode;
  		if (parentn.id != "") 
  			toggle(parentn.id);
  	}
  	if (liNode.id != "") {
  		var idToUse = "ul"+strRight(liNode.id, liNode.id.substr(0,1));
  		toggle(idToUse, true);
  	}
}

//@Left equivalent
function strLeft(sourceStr, keyStr){
return (sourceStr.indexOf(keyStr) == -1 | keyStr=='') ? '' : sourceStr.split(keyStr)[0];
}

//@LeftBack equivalent
function leftBack(sourceStr, keyStr){
arr = sourceStr.split(keyStr)
arr.pop();
return (keyStr==null | keyStr=='') ? '' : arr.join(keyStr)
}

//@RightBack equivalent
function rightBack(sourceStr, keyStr){
arr = sourceStr.split(keyStr);
return (sourceStr.indexOf(keyStr) == -1 | keyStr=='') ? '' : arr.pop()
}

//@Right equivalent
function strRight(sourceStr, keyStr){
idx = sourceStr.indexOf(keyStr);
return (idx == -1 | keyStr=='') ? '' : sourceStr.substr(idx+ keyStr.length);
}