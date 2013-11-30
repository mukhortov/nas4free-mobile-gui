var jQT = new $.jQTouch({
	icon4: 'img/gui-icon.png',
	addGlossToIcon: false,
	startupScreen: 'img/load5.png',
	statusBar: 'black',
		preloadImages: [
			'img/bg_noise.png',
			'img/border_button_back.png',
			'img/loading.gif',
			'img/chevron_circle.svg',
			'img/chevron_dark.svg',
			'img/chevron.svg',
			'img/mask_button_back.svg'
			]
});

var baseUrl = '';
//var baseUrl = location.protocol+'//'+location.hostname; //http://yourhostname.com;
//var baseUrl = 'http://yourhostname.com';

$(function(){
	function sendRequest(o) {
		if (o.sel) {
			$(o.sel).click(function(){
				var e = this;
				confirm (o.msg, function(){
					$(e).css('opacity','0.3');
					$.ajax({
						url: baseUrl+o.url,
						success: function (response) {
							if (response) {
								alert(response);
							}
							$(e).css('opacity','1');
						},
						error: function (request, status) {}
					});
				});
			});
		} else {
			console.log('sendRequest: no options defined');
		}
	}

	sendRequest({
		sel : '#shutdown .shutdown',
		msg : 'Are you sure you want to shutdown the server?',
		url : 'admin/admin.php?service=shutdown&action=shutdown'
	});

	sendRequest({
		sel : '#shutdown .reboot',
		msg : 'Are you sure you want to reboot the server?',
		url : 'admin/admin.php?service=shutdown&action=restart'
	});

	sendRequest({
		sel : '#transmission .transmission',
		msg : 'Are you sure you want to restart the Transmission Service?',
		url : 'admin/admin.php?service=transmission&action=restart'
	});

	sendRequest({
		sel : '#transmission .stoptransmission',
		msg : 'Are you sure you want to stop the Transmission Service?',
		url : 'admin/admin.php?service=transmission&action=stop'
	});

	sendRequest({
		sel : '#minidlna .restart',
		msg : 'Are you sure you want to restart the MiniDLNA Service?',
		url : 'admin/admin.php?service=minidlna&action=restart'
	});

	sendRequest({
		sel : '#minidlna .stop',
		msg : 'Are you sure you want to stop the MiniDLNA Service?',
		url : 'admin/admin.php?service=minidlna&action=stop'
	});

	sendRequest({
		sel : '#dlna .restart',
		msg : 'Are you sure you want to restart the MediaTomb Service?',
		url : 'admin/admin.php?service=mediatomb&action=restart'
	});

	sendRequest({
		sel : '#dlna .stop',
		msg : 'Are you sure you want to stop MediaTomb Service?',
		url : 'admin/admin.php?service=mediatomb&action=stop'
	});

	sendRequest({
		sel : '#dlna .restart-ui',
		msg : 'Are you sure you want to restart MediaTomb Service with web UI?',
		url : 'admin/admin.php?service=mediatomb&action=restart-ui'
	});

	sendRequest({
		sel : '#cron .stop',
		msg : 'Are you sure you want to stop Cron service?',
		url : 'admin/admin.php?service=cron&action=stop'
	});

	sendRequest({
		sel : '#cron .start',
		msg : 'Are you sure you want to start Cron service?',
		url : 'admin/admin.php?service=cron&action=start'
	});

	sendRequest({
		sel : '#home .bonjour',
		msg : 'Are you sure you want to restart Bonjour service?',
		url : 'admin/admin.php?service=bonjour&action=restart'
	});

	sendRequest({
		sel : '#daap .restart',
		msg : 'Are you sure you want to restart DAAP service?',
		url : 'admin/admin.php?service=daap&action=restart'
	});

	sendRequest({
		sel : '#daap .stop',
		msg : 'Are you sure you want to stop DAAP service?',
		url : 'admin/admin.php?service=daap&action=stop'
	});
});