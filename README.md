# stream-to-device

Output a media stream (audio or video) to a [specific hardware device](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices)

## Install

```sh
npm install stream-to-device --save
```

## API

#### `var stream = streamToDevice(media, deviceId)`

`media` is a [Media Stream Object](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API). `deviceId` is an identifier for each hardware device returned by [`enumerateDevices`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices). If no device is specified, outputs to default hardware device.

#### `stream.setDevice(deviceId)`
Change output hardware device

#### `stream.setMedia(media)`
Change MediaStream

## Example

Route microphone input to hardware device chosen from dropdown

```js
const getMedia = require('getusermedia')
const enumerateDevices = require('enumerate-devices')
const streamToDevice = require('stream-to-device')

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
```




