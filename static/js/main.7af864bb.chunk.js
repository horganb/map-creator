(this["webpackJsonpmap-creator"]=this["webpackJsonpmap-creator"]||[]).push([[0],{122:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(10),o=n.n(r),i=(n(92),n(93),n(33)),s=n(11),j=n(53),l=n(52),u=n(24),b=n(16),O=n(13),d=n(26),p=n.n(d),h=n(152),f=n(3),m="https://map-creator-backend.herokuapp.com",v={name:"Untitled Map",image:{url:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"},pins:{}},x=function(){var e=Object(c.useState)([]),t=Object(O.a)(e,2),n=t[0],a=t[1],r=Object(s.g)();Object(c.useEffect)((function(){p.a.get("".concat(m,"/maps")).then((function(e){var t=e.data;a(t)})).catch((function(e){console.error(e)}))}),[]);var o=function(e){r.push("/maps/".concat(e))},i=n.map((function(e){var t=e.name,n=e._id;return Object(f.jsx)(h.a,{className:"map-button",variant:"contained",onClick:function(){return o(n)},children:t},n)}));return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsx)(h.a,{className:"map-button",variant:"contained",color:"primary",onClick:function(){p.a.post("".concat(m,"/maps"),v).then((function(e){var t=e.data;o(t)})).catch((function(e){console.error(e)}))},children:"Create New"}),i]})})},g=n(162),N=n(156),C=n(157),w=n(158),y=n(159),k=n(164),S=n(160),E=n(161),I=n(49),A=n.n(I),P=n(50),T=n.n(P),F=n(163),M=function(e,t){var n=Object(c.useState)(e),a=Object(O.a)(n,2),r=a[0],o=a[1],i=Object(s.h)().mapId,j=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:B.SET,n=Object(u.a)({},t,e);p.a.put("".concat(m,"/maps/").concat(i),n).then((function(){})).catch((function(e){console.error(e)}))};return[r,function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];o(e),n&&j(Object(u.a)({},t,e))}]},B={SET:"$set",UNSET:"$unset"},D=function(){var e=Object(s.h)().mapId,t=Object(s.g)(),n=M("","image.url"),r=Object(O.a)(n,2),o=r[0],i=r[1],d=M("","name"),v=Object(O.a)(d,2),x=v[0],C=v[1],w=M({},"pins"),y=Object(O.a)(w,2),k=y[0],S=y[1],E=Object(c.useState)(),I=Object(O.a)(E,2),P=I[0],T=I[1],B=Object(c.useState)(!0),D=Object(O.a)(B,2),L=D[0],U=D[1],_=Object(c.useState)(!1),q=Object(O.a)(_,2),J=q[0],X=q[1],Y=Object(c.useState)(),$=Object(O.a)(Y,2),H=$[0],z=$[1],G=Object(c.useRef)({});Object(c.useEffect)((function(){e&&(U(!0),p.a.get("".concat(m,"/maps/").concat(e)).then((function(e){var t=e.data;X(!1);var n=t.name,c=t.image,a=t.pins;i(c.url,!1),C(n,!1),S(a,!1)})).catch((function(e){console.error(e),X(!0)})).then((function(){U(!1)})))}),[e]);var K=!L&&!J;return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsxs)("div",{className:"metadata-section",children:[Object(f.jsx)(h.a,{className:"return-home",variant:"contained",color:"secondary",onClick:function(){t.push("/")},children:"Back to Home"}),K&&Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("br",{}),Object(f.jsx)(g.a,{className:"map-name",label:"Map Name",value:x,onChange:function(e){return C(e.target.value)},variant:"outlined"}),Object(f.jsx)("br",{}),Object(f.jsx)(g.a,{className:"image-url",label:"Image URL",value:o,onChange:function(e){return i(e.target.value)},variant:"filled"})]})]}),K&&Object(f.jsxs)("div",{className:"image-container",children:[H&&Object.keys(k).map((function(e){var t,n=k[e];if(n){var c=n.x,r=n.y,o=P===e;return Object(f.jsxs)(a.a.Fragment,{children:[Object(f.jsx)(A.a,{className:"pin",style:{left:"".concat(100*c,"%"),top:"".concat(100*r,"%"),color:o?"yellow":"red"},onClick:function(){return function(e){T(e===P?null:e)}(e)},onContextMenu:function(t){return function(e,t){t.preventDefault(),k[e];var n=Object(j.a)(k,[e].map(l.a));S(n),T()}(e,t)},ref:function(t){(null===G||void 0===G?void 0:G.current)&&(G.current[e]=t)}}),Object(f.jsx)(R,{pin:n,onClose:function(){return T()},show:o,setPin:function(t){S(Object(b.a)(Object(b.a)({},k),{},Object(u.a)({},e,t)))},anchorEl:null===G||void 0===G||null===(t=G.current)||void 0===t?void 0:t[e]})]},e)}})),Object(f.jsx)("img",{src:o,onClick:function(e){var t=function(e){var t=e.getBoundingClientRect();return{left:t.left+window.scrollX,top:t.top+window.scrollY}}(H),n=t.left,c=t.top,a=e.pageX-n,r=e.pageY-c;!function(e,t){var n=Object(F.a)();S(Object(b.a)(Object(b.a)({},k),{},Object(u.a)({},n,{x:e,y:t})))}(a/H.width,r/H.height)},className:"App-logo",alt:"logo",ref:function(e){e&&e!==H&&z(e)}})]}),L&&Object(f.jsx)(N.a,{}),J&&Object(f.jsx)("p",{children:"Could not load the requested map!"})]})})},R=function(e){e.x,e.y;var t=e.pin,n=e.setPin,c=e.onClose,a=e.show,r=e.anchorEl,o=t.title,i=t.description;t.color;return Object(f.jsx)(C.a,{open:a,anchorEl:r,transition:!0,children:function(e){var a=e.TransitionProps;return Object(f.jsx)(w.a,Object(b.a)(Object(b.a)({},a),{},{timeout:150,children:Object(f.jsxs)(y.a,{className:"description-card",children:[Object(f.jsx)(k.a,{title:Object(f.jsx)(g.a,{className:"title-field",label:"Item Title",value:o,onChange:function(e){return n(Object(b.a)(Object(b.a)({},t),{},{title:e.target.value}))}}),action:Object(f.jsx)(S.a,{onClick:c,children:Object(f.jsx)(T.a,{})})}),Object(f.jsx)(E.a,{children:Object(f.jsx)(g.a,{className:"body-field",label:"Item Description",value:i,onChange:function(e){return n(Object(b.a)(Object(b.a)({},t),{},{description:e.target.value}))},variant:"outlined",multiline:!0,rows:3})})]})}))}})},L=function(){var e=Object(s.h)().mapId,t=M("","image.url"),n=Object(O.a)(t,2),r=n[0],o=n[1],i=M("","name"),d=Object(O.a)(i,2),h=d[0],v=d[1],x=M({},"pins"),g=Object(O.a)(x,2),C=g[0],w=g[1],y=Object(c.useState)(),k=Object(O.a)(y,2),S=k[0],E=k[1],I=Object(c.useState)(!0),P=Object(O.a)(I,2),T=P[0],F=P[1],B=Object(c.useState)(!1),D=Object(O.a)(B,2),R=D[0],L=D[1],_=Object(c.useState)(),q=Object(O.a)(_,2),J=q[0],X=q[1],Y=Object(c.useRef)({});Object(c.useEffect)((function(){e&&(F(!0),p.a.get("".concat(m,"/maps/").concat(e)).then((function(e){var t=e.data;L(!1);var n=t.name,c=t.image,a=t.pins;o(c.url,!1),v(n,!1),w(a,!1)})).catch((function(e){console.error(e),L(!0)})).then((function(){F(!1)})))}),[e]);var $=!T&&!R;return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsx)("div",{className:"metadata-section",children:$&&h}),$&&Object(f.jsxs)("div",{className:"image-container",children:[J&&Object.keys(C).map((function(e){var t,n=C[e];if(n){var c=n.x,r=n.y,o=S===e;return Object(f.jsxs)(a.a.Fragment,{children:[Object(f.jsx)(A.a,{className:"pin",style:{left:"".concat(100*c,"%"),top:"".concat(100*r,"%"),color:o?"yellow":"red"},onClick:function(){return function(e){E(e===S?null:e)}(e)},onContextMenu:function(t){return function(e,t){t.preventDefault(),C[e];var n=Object(j.a)(C,[e].map(l.a));w(n),E()}(e,t)},ref:function(t){(null===Y||void 0===Y?void 0:Y.current)&&(Y.current[e]=t)}}),Object(f.jsx)(U,{pin:n,onClose:function(){return E()},show:o,setPin:function(t){w(Object(b.a)(Object(b.a)({},C),{},Object(u.a)({},e,t)))},anchorEl:null===Y||void 0===Y||null===(t=Y.current)||void 0===t?void 0:t[e]})]},e)}})),Object(f.jsx)("img",{src:r,className:"App-logo",alt:"logo",ref:function(e){e&&e!==J&&X(e)}})]}),T&&Object(f.jsx)(N.a,{}),R&&Object(f.jsx)("p",{children:"Could not load the requested map!"})]})})},U=function(e){e.x,e.y;var t=e.pin,n=(e.setPin,e.onClose),c=e.show,a=e.anchorEl,r=t.title,o=t.description;t.color;return Object(f.jsx)(C.a,{open:c,anchorEl:a,transition:!0,children:function(e){var t=e.TransitionProps;return Object(f.jsx)(w.a,Object(b.a)(Object(b.a)({},t),{},{timeout:150,children:Object(f.jsxs)(y.a,{className:"description-card",children:[Object(f.jsx)(k.a,{title:r,action:Object(f.jsx)(S.a,{onClick:n,children:Object(f.jsx)(T.a,{})})}),Object(f.jsx)(E.a,{children:o})]})}))}})},_=function(){return Object(f.jsx)(i.a,{basename:"/",children:Object(f.jsxs)(s.d,{children:[Object(f.jsx)(s.b,{exact:!0,path:"/",children:Object(f.jsx)(x,{})}),Object(f.jsx)(s.b,{path:"/maps/:mapId/view",children:Object(f.jsx)(L,{})}),Object(f.jsx)(s.b,{path:"/maps/:mapId",children:Object(f.jsx)(D,{})}),Object(f.jsx)(s.a,{to:"/"})]})})},q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,165)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};o.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(_,{})}),document.getElementById("root")),q()},92:function(e,t,n){},93:function(e,t,n){}},[[122,1,2]]]);
//# sourceMappingURL=main.7af864bb.chunk.js.map