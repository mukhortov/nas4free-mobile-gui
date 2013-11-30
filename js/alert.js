/* Alert.js */
/* Overriding native alert() function */
/* https://github.com/mukhortov/Alert.js/ */
/* Petr Mukhortov */

(function() {
	function removeAlert() {
		var e = document.getElementById('_alert');
		e.parentNode.removeChild(e);
	}

	function showAlert (arguments,callback) {
		arguments = arguments.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		var div = document.createElement("div");
		div.id = "_alert";
		div.innerHTML = '<div id="alert-overlay"></div>'+
			'<div id="alert-container">'+
				'<div id="alert-message">'+arguments+'</div>'+
				'<input type="hidden" value="Cancel" id="alert-cancel"><input type="button" value="OK" id="alert-button">'+
			'</div>';
		document.body.appendChild(div);

		centerAlert();
		window.onresize = centerAlert;
		
		var button = document.getElementById("alert-button");
		button.focus();
		button.onclick = function() {
			removeAlert();
			if (callback) callback();
		}
	}

	function centerAlert() {
		var box = document.getElementById("alert-container");
		box.style.left = (window.innerWidth - box.offsetWidth) / 2 + "px";
		box.style.top = (window.innerHeight - box.offsetHeight) / 2 + "px";
	}

	window.alert = function(arguments,callback) {
		showAlert (arguments,callback);
	};

	window.confirm = function(arguments,callback) {
		showAlert (arguments,callback);
		var cancel = document.getElementById("alert-cancel");
		cancel.parentNode.className = 'alert-confirm';
		cancel.type = 'button';
		cancel.focus();
		cancel.onclick = removeAlert;
	}
})();
