const emailButton = document.getElementById("email");
emailButton.addEventListener('click', showEmailWindow);

function showEmailWindow() {
	emailButton.removeEventListener('click', showEmailWindow);
	var modalWindow = document.createElement("DIV");
	modalWindow.innerHTML = '<div id="close-button" class="closeButton">X</div><span class="email">itgbo1321@gmail.com</span><div class="button copy-email" data-clipboard-text="itgbo1321@gmail.com">Copy to clipboard</div><a href="mailto:itgbo1321@gmail.com"><div class="button write-email">Use your default email app</div></a>'
	modalWindow.classList = "email-window";
	document.body.insertBefore(modalWindow, document.body.firstChild);
	var closeButton = document.getElementById("close-button");
	var clipboard = new Clipboard('.copy-email');
	clipboard.on('success', function(e) {
	    document.getElementsByClassName("copy-email")[0].innerHTML = "Copied!";
	    e.clearSelection();
	});
	closeButton.addEventListener('click', closeEmailWindow);
}

function closeEmailWindow() {
	document.body.removeChild(document.body.firstChild);
	emailButton.addEventListener('click', showEmailWindow);
}