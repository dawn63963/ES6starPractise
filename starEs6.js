;
(() => {
	let index = -1;
	let hoverClass = "star-a-hover";

	class Stars {
		constructor(elm, n = 5, score = 0) {
			this.elm = document.getElementById(elm);
			this.n = n;
			this.score = score;

			this.init();
		}

		// initial
		init() {
			let a = this.createA(this.n, this.score);
			this.elm.innerHTML = a;
			this.addEvent(this.elm);
			return;
		}

		// mouseover
		isOver() {
			let id = this.dataset.id;
			renderStar(this, id);
		}

		// mouseout
		isOut() {
			let parent = this.parentNode;
			let children = parent.childNodes;
			if(index < 0) {
				children.forEach(function(elem) {
					elem.classList.contains(hoverClass) ? elem.classList.remove(hoverClass) : elem;
				})
			}else {
				renderStar(this, index);
			};
		}

		// click
		isClick() {
			let parent = this.parentNode;
			let dataID = this.dataset.id;
			index = dataID;
			destroy(parent);
		}

		// 添加事件
		addEvent(obj) {
			let children = obj.childNodes;
			let len = children.length;
			for(var i=0; i<len; i++) {
				children[i].addEventListener("mouseover", this.isOver)
				children[i].addEventListener("mouseout", this.isOut)
				children[i].addEventListener("click", this.isClick)
			};
			return obj;
		}

		// 创建 a 标签
		createA(n, s) {
			let html = "";
			for(let i=0; i<n; i++) {
				html += "<a class='star-a " + ( i < s ? hoverClass : '') + "' data-id='"+ i +"'></a>"
			}
			return html;
		}

	};

	// 控制 star 样式
	function renderStar(obj, id) {
		let parent = obj.parentNode;
		let children = parent.childNodes;
		let len = children.length;
		for(var i=0; i<len; i++) {
			switch( i <= id ) {
				case true:
					children[i].classList.contains(hoverClass) ? children[i] : children[i].classList.add(hoverClass);
					break;
				case false:
					children[i].classList.contains(hoverClass) ? children[i].classList.remove(hoverClass) : children[i];
					break;
			};
		};
	}

	//摧毁事件
	function destroy(obj) {
		let children = obj.childNodes;
		let len = children.length;
		for(var i=0; i<len; i++) {
			children[i].removeEventListener("mouseover", this.isOver)
			children[i].removeEventListener("mouseout", this.isOut)
			children[i].removeEventListener("click", this.isClick)
		};
		return obj;
	};

	window.Stars = Stars
})();