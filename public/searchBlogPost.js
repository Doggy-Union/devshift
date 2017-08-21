/* turn me on */
var sb = document.querySelector("button.search");
sb.addEventListener("click", function(e) {
	if(!this.parentNode.classList.contains("asSearchfield")) {
		this.parentNode.classList.add("asSearchfield");
		var searchbox = this.parentNode.querySelector(".searchbox > input");
		searchbox.focus();
		searchbox.addEventListener("blur", onblur);
	}
	searchfunc();
});

function onblur(e) {
	var header = document.querySelector(".menuWrapper");
	header.classList.remove("asSearchfield");	
}

function searchfunc() { return 0; }