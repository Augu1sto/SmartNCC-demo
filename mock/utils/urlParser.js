module.exports = {
	error:'',
	parse2JSON : function (url){
		params = url.split("?")[1].split("&");
		data = {};
		params.forEach((item) => {
			let key = item.split('=')[0];
			let value = item.split('=')[1];
			data[key] = value;
		});
        return data;
	}
}