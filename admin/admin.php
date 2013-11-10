#!/usr/local/bin/php
<?php
/*
	admin.php
	part of FreeNAS GUI Plugin (http://www.mukhortov.com)
*/

//admin/admin.php?service=service_name&action=action_name
if ($_REQUEST['service'] && $_REQUEST['action']) {

	require('/usr/local/www/guiconfig.inc');
	
	$service = $_REQUEST['service'];
	$action = $_REQUEST['action'];
	$msg = '';
	switch ($service) {
		case 'shutdown':
			if ($action == 'shutdown') {
				$msg = 'The system is halting now. This may take one minute.';
				system_halt();
			} else if ($action == 'restart') {
				$msg = 'The system is rebooting now. This may take one minute.';
				system_reboot();
			}
			break;
		case 'bonjour':
			if ($action == 'restart') {
				$msg = 'Bonjour Service has been restarted.';
				config_lock();
				rc_update_service("mdnsresponder");
				config_unlock();
			}
			break;
		case 'cron':
			if ($action == 'stop') {
				$msg = 'Cron Service has been stopped.';
				exec('killall cron');
			} else if ($action == 'start') {
				$msg = 'Cron Service has been started.';
				exec('killall cron');
				config_lock();
				rc_update_service('cron');
				config_unlock();
			}
			break;
		case 'transmission':
			if ($_REQUEST['restart'] == 'Yes') {
				$msg = 'Transmission has been restarted.';
				exec('/etc/rc.d/transmission restart');
			} else if ($_REQUEST['restart'] == 'stop') {
				$msg = 'Transmission Service has been stopped.';
				exec('/etc/rc.d/transmission stop');
			}
			break;
		case 'daapd':
			if ($action == 'restart') {
				config_lock();
				exec('killall mt-daapd');
				exec('mt-daapd');
				$retval |= rc_update_service("mdnsresponder");
				config_unlock();
				$msg = 'The DAAP service is restarting now.';
			} elseif ($action == 'stop') {
				exec('killall mt-daapd');
				$msg = 'The DAAP service has been stopped.';
			}
			break;
		case 'minidlna':
			if ($action == 'restart') {
				exec('killall minidlna');
				exec('/usr/local/sbin/minidlna -f /mnt/sys/system/apps/minidlna/minidlna.conf');
				$msg = 'The MiniDLNA service is restarting now.';
			} elseif ($action == 'stop') {
				exec('killall minidlna');
				$msg = 'The MiniDLNA service has been stopped.';
			}
			break;
		case 'ushare':
			if ($action == 'restart') {
				exec('killall ushare');
				exec('/usr/local/bin/ushare -x -D');
				$msg = 'The UPnP service is restarting now in Xbox mode.';
			} elseif ($action == 'restart2') {
				exec('killall ushare');
				exec('/usr/local/bin/ushare -d -D');
				$msg = 'The UPnP service is restarting now in DLNA mode.';
			} elseif ($action == 'stop') {
				exec('killall ushare');
				$msg = 'The UPnP service has been stopped.';
			}
			break;
	}
	echo $msg;
}
?>