var superagent = require('superagent-charset');
var cheerio = require('cheerio');
var fs = require('fs');
var express = require('express');
var ejs = require('ejs');
var url = 'http://daily.zhihu.com/';
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/index', function(req, response){
	//res.send('hello world!');
	superagent.get(url).end(function(err, res){
	if(err){
		console.log(err);
	} else{
		console.log(res);

		var $ = cheerio.load(res.text);

		var data = [];

		$('.wrap .box a').each(function(id, element){
			var title = $(element).find('span').text();
			var src = $(element).find('img').attr('src');	
			var link = $(element).attr('href');

			data.push({
				'title': title,
				'src': src,
				'link': link
			})

			

			//write_to_file('title.txt', title + '\n');
		})
		console.log(data);

		response.render('index.ejs', {'data':data})
	}
})

})

app.listen(3000, function() {
	console.log('the app is listening at the port 3000');
})



function write_to_file (file_name, data) {
	fs.open(file_name, 'a', function(err, fd){
			if(err){
				console.log('open failed');
			} else{

				fs.write(fd, data, function(err, write_res){
					if(err){
						console.log('write failed');
					} else{
						console.log(write_res);
					}

					fs.close(fd);
				});
			}
			
		})
}