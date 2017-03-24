const streamDevice = require('./')
const mediaStream = require('get-test-media')
const enumerateDevices = require('enumerate-devices')


/* Generate audio stream for testing purposes */
const stream = mediaStream({
  	audio: true,
  	video: false
})


/* Create media device object for routing audio stream to hardware device.
If no device is specified, sets to default device */
const streamDevice = streamDevice({stream: stream.stream});


/* Set hardware device from value chosen in dropdown. Accepts the deviceId from enumerate devices 
 */
function setMediaDevice(e) {
	console.log(e.target.value)
	streamDevice.setDevice(""+e.target.value)
}


/* Create dropdown of available media devices */
enumerateDevices().then(function(devices) {
	var select = document.createElement('select');

	devices.forEach(function(d){
		if(d.kind==='audiooutput' || d.kind==='videooutput') {
			var option = document.createElement('option');
  		    option.value = d.deviceId;
  		    option.text = d.label;
  		    select.appendChild(option);
		}
	})
	select.onchange = setMediaDevice;
	document.body.appendChild(select);
}).catch(function(err) {
	console.log(err);
});


