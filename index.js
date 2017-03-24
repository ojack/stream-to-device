module.exports = streamToDevice;


function streamToDevice(opt){
	opt = opt || {}

	const mediaEl = document.createElement("audio");
	mediaEl.autoplay = true;
	
	if(opt.stream) setStream(opt.stream);
	if(opt.sinkId) setDevice(opt.sinkId);

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

	function setStream(stream){
		// to do: check source
		mediaEl.srcObject = stream;
	}

	return {
		setDevice: setDevice,
		setStream: setStream
	}
}
