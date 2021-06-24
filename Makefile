
run: 
	npm i;
	npm start;

buildimage:
	docker build . -t kwikkoder/chatwebsocket

runimage: buildimage
	docker run -p 3000:3000 kwikkoder/chatwebsocket
