(function(global) {
	var E = global.Elem = function(config) {
		this.name = name;
		this.appended = false;
	};

	E.prototype.construct = function(target) {
		var s = "<div class='fake-widget-div'>" + this.name + "</div>";
		this.node = jQuery(s);
		target.appendChild(this.node.get(0));
		return this;
	};
})(this);

(function(global) {
	var F = global.FakeWidget = function(target) {
		this.elements = [];
		this.target = target;
		this.init();
	};

	F.prototype.init = function() {
		this.appendInterval = setInterval(function() {
			this.target.append(this.constructElements());
			this.markElements();
		}.bind(this), 50);
		this.clearNodesInterval = setInterval(function() {
			var els = this.elements;
			//this.elements.forEach(function(el) {
			for(var i = 0; i < els.length; i++) {
				els[i].node.remove();
			}
			//});
			//this.elements = [];
		}.bind(this), 100);
	};

	F.prototype.constructElements = function() {
		var doc = document.createDocumentFragment();
		var elems = this.elements;
		for (var i = 0; i < 1000; i++) {
			elems.push(
				new Elem({
					"name": "name_" + i
				}).construct(doc)
			);
		}
		return doc;
	};

	F.prototype.markElements = function() {
		//this.elements.forEach(function(element) {
		var els = this.elements;
		for(var i = 0; i < els.length; i++) {
			els[i].appended = true;
		}
		//});
	};

	F.prototype.stop = function() {
		clearInterval(this.appendInterval);
		clearInterval(this.clearNodesInterval);
	};
})(this);
