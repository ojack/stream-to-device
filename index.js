module.exports = streamToDevice;


function streamToDevice(media, deviceId){

	const mediaEl = document.createElement("audio");
	mediaEl.autoplay = true;
	
	if(media) setMedia(media);
	if(deviceId) setDevice(deviceId);

	function setDevice(sinkId){
		return new Promise(function(resolve, reject){
			//if(typeof sinkId !== 'string') reject(Error("must specify sinkId string"))
			mediaEl.setSinkId(sinkId).then(function(){
				resolve();
			}).catch(function(err){
				reject(err);
			});
		});
	}

	function setMedia(m){
		// to do: check source
		mediaEl.srcObject = m;
	}

	return {
		setDevice: setDevice,
		setMedia: setMedia
	}
}
