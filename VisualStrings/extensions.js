var LabeledRect = fabric.util.createClass(fabric.Rect, {
  type: "labeledRect",
  
  initialize: function(options) {
    options || (options = {});
    
    this.callSuper('initialize', options);
    this.set("label", options.label || "");
  },
  
  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      label: this.get("label")
    });
  },
  
  _render: function (ctx) {
    this.callSuper("_render", ctx);
    
    ctx.font = "40px Helvetica";
    ctx.fillStyle = "#333";
    ctx.fillText(this.label, -this.width / 2 + 40, -this.height / 2 + 40);
  }
  
});

var LabeledCircle = fabric.util.createClass(fabric.Circle, {
  type: "labeledCircle",
  
  initialize: function(options) {
    options || (options = {});
    
    this.callSuper('initialize', options);
    this.set("label", options.label || "");
  },
  
  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      label: this.get("label")
    });
  },
  
  _render: function (ctx) {
    this.callSuper("_render", ctx);
    
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "#333";
    ctx.fillText(this.label, -this.radius / 2, -this.radius / 2 + 20);
  }
  
});