module.exports = function(app){

	app.get('/', function(req,res){
		res.send([1,2,3,4,5]);
	});

};