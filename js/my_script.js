var vm = new Vue({
	el: "#app",
	data: function(){
		allUrls = localStorage.aixuexiUrls || '[]'
		allUrls = JSON.parse(allUrls)
		return {
			url: null,
			allUrls: allUrls
		}
	},
	methods: {
		add: function () {
			let url = this.url
			if (url.search('http://') === 0 ) {
				url = url.substr(7)
			}
			if (url.search('https://') === 0 ) {
				url = url.substr(8)
			}

			let tmp = url.search('/')
			if (tmp !== -1) {
				url = url.substr(0, tmp)
			}

			this.url = null
			if (this.allUrls.indexOf(url) !== -1) {
				return ;
			} else {
				this.allUrls.unshift(url)
				localStorage.aixuexiUrls = JSON.stringify(this.allUrls)
			}
		},
		remove: function (index) {
			this.allUrls.splice(index, 1)
			localStorage.aixuexiUrls = JSON.stringify(this.allUrls)
		},
		init: function() {
			this.sendMessageBack('list', {}, function(response){
			 	if(response.status == 404){
			 		return false
			 	}
			 	this.allUrls = response.data;
			})
		},
		sendMessageBack: function(strAction, dicData, callback){
			chrome.extension.sendMessage({'action': strAction, 'data': dicData}, callback);
		}
	},
	components: {
		"url-item": {
			template: '<li>\
				{{url}}\
				<button @click="$emit(\'remove\')">X</button>\
			</li>',
			props: ['url']
		}
	}
})
