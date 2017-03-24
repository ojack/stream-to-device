#stream-to-device

Output a media stream (audio or video) to a [specific hardware device](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices)

##Install

```sh
npm install stream-to-device --save
```
## Usage

```js
const getMedia = require('getusermedia')
const enumerateDevices = require('enumerate-devices')
const streamToDevice = require('stream-to-device')

// get user media
getMedia({video: false, audio: true}, function (err, media) {
 	if (err) throw err

 	//route stream to specified device
 	var stream = streamToDevice({stream: media, sinkId: 'default'})
	
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
```
## API

#### `const streamToDevice = require('stream-to-device')`

send the output of a media stream to a specific hardware device.
streamToDevice({
	stream: stream, // stream is a 
	sinkId: id 		// deviceId of the desired hardware device, as specified in navigator.enumerateDevices. Outputs to default if not specified.
});


//dynamically change stream source

const s = streamToDevice();
s.setStream
