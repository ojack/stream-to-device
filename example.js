const getMedia = require('getusermedia')
const enumerateDevices = require('enumerate-devices')
const streamToDevice = require('./')

// get user media
getMedia({video: false, audio: true}, function (err, media) {
 	if (err) throw err

 	//route stream to specified device
 	var stream = streamToDevice(media, 'default')
	
	// create dropdown of available hardware devices
	enumerateDevices().then(function(devices) {
		var select = document.createElement('select');

		devices.forEach(function(d){
			if(d.kind==='audiooutput' || d.kind==='videooutput') {
				var option = document.createElement('option')
	  		    option.value = d.deviceId
	  		    option.text = d.label;
	  		    select.appendChild(option)
			}
		})

		document.body.appendChild(select)

		//set device on selection
		select.onchange = function(e){
			stream.setDevice(e.target.value)
		}
		
	}).catch(function(err) {
		throw(err)
	})

})

