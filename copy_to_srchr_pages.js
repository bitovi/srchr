var fs = require('fs')


var copyDir = function(from, to, filter){
	fs.readdir(from, function(err, files){
		files.forEach(function(fileName){
			if(!filter.test(fileName)){
				fs.stat(from+"/"+fileName, function(err, stat){
					if(stat.isDirectory()){
						fs.mkdir(to+"/"+fileName,function(){
							copyDir(from+"/"+fileName, to+"/"+fileName, filter)
						})
					} else {
						console.log(from+"/"+fileName,"->", to+"/"+fileName)
						fs.createReadStream(from+"/"+fileName).pipe(fs.createWriteStream(to+"/"+fileName));
					}
				})
			}
			
		})
	})
}

copyDir(".","../srchr-pages",/\.git/)
