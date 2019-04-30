function openTab(evt, tabName) {
	// hide all 'tabcontent' divs
	var tabContent = document.getElementsByClassName("tabcontent");
	for(var i = 0; i < tabContent.length; i++)
	{
		tabContent[i].style.display = "none";
	}

	// remove active css class on links
	var tabLinks = document.getElementsByClassName("tablinks");
	for(var i = 0; i < tabLinks.length; i++)
	{
		tabLinks[i].className = tabLinks[i].className.replace(" active", "");
	}

	// show the current tab and re-add active class
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

document.getElementById("settingsTab").click();