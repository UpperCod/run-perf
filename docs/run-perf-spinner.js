import{M as r,_ as e}from"./chunks/a1b1a69b.js";function n({width:r,speed:n}){return e("host",{shadowDom:!0,style:{"--run-perf-spinner-width":r,"--run-perf-spinner-speed":n}},e("style",null,":host{width:var(--run-perf-spinner-width);height:calc(var(--run-perf-spinner-width)/2);display:block;position:relative}.dot{position:absolute;top:0;width:50%;height:100%;border-radius:50%;box-sizing:border-box}.dot.-z2{left:0;background:currentColor;animation:move-1 var(--run-perf-spinner-speed) cubic-bezier(0,.34,1,.64) infinite}.dot.-z1{right:0;background:#fff;border:calc(var(--run-perf-spinner-width)*0.1) solid;animation:move-2 var(--run-perf-spinner-speed) cubic-bezier(0,.34,1,.64) infinite}@keyframes move-1{0%{transform:translateX(0);z-index:1}49.9%{z-index:1}50%{transform:translateX(100%);z-index:2}to{transform:translateX(0);z-index:2}}@keyframes move-2{0%{transform:translateX(0);z-index:2}49.9%{z-index:2}50%{transform:translateX(-100%);z-index:1}to{transform:translateX(0);z-index:1}}"),e("div",{class:"dot -z1"}),e("div",{class:"dot -z2"}))}n.props={width:{type:String,value:"30px"},speed:{type:String,value:"2s"}},r("run-perf-spinner",n);
//# sourceMappingURL=run-perf-spinner.js.map
