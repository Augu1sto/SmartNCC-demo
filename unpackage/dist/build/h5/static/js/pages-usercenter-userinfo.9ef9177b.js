(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-usercenter-userinfo"],{"40d9":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={data:function(){return{src:"../../static/avatar.jpg",uname:"GY",uschool:"武汉大学",unumber:"2020202210014",uphone:"15105257339"}},methods:{editAvatar:function(){uni.navigateTo({url:"./editAvatar"})},editPwd:function(){uni.navigateTo({url:"./editPwd"})}}};e.default=u},a69d:function(t,e,a){"use strict";a.r(e);var u=a("ce63"),n=a("d94d");for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);var r,l=a("f0c5"),c=Object(l["a"])(n["default"],u["b"],u["c"],!1,null,"9e84a7e2",null,!1,u["a"],r);e["default"]=c.exports},ce63:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return u}));var u={uCell:a("892d").default,uAvatar:a("199d").default,uButton:a("02f6").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"info-cell"},[a("u-cell",{attrs:{title:"头像",isLink:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.editAvatar.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"u-slot-value",attrs:{slot:"value"},slot:"value"},[a("u-avatar",{attrs:{src:t.src,shape:"square"}})],1)],1),a("u-cell",{attrs:{title:"姓名",value:t.uname}}),a("u-cell",{attrs:{title:"学校",value:t.uschool}}),a("u-cell",{attrs:{title:"学号",value:t.unumber}}),a("u-cell",{attrs:{title:"手机号",value:t.uphone,border:!1}})],1),a("v-uni-view",{staticClass:"btn-area"},[a("u-button",{attrs:{color:"#00adb5",plain:!0,shape:"circle",hairline:!0,text:"修改密码"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.editPwd.apply(void 0,arguments)}}})],1)],1)},i=[]},d94d:function(t,e,a){"use strict";a.r(e);var u=a("40d9"),n=a.n(u);for(var i in u)"default"!==i&&function(t){a.d(e,t,(function(){return u[t]}))}(i);e["default"]=n.a}}]);