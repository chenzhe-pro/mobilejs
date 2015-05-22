/**
 * Created by chenzhe on 2015/3/20.
 * 自用。欢迎指正不足。
 **/
(function(doc,win){
    var indexOfSlide=0,initflg=false;
    function mobile(){
        //sds
        this.dom=function(selector){//初级选择器,只兼容webkit浏览器
            return doc.querySelector(selector);
        };
        this.one=function(selector){
            var one,arr;
            if(selector instanceof Node)
                one=selector;
            else
                one=doc.querySelector(selector);
            arr=new Array(one);
            // if (!initflg) {initflg=InitAPIFunction(arr,true);};
            InitAPIFunction(arr);
            return arr;
        };
        this.all=function(selector){
            var arr=doc.querySelectorAll(selector),newarr=new Array();
            // if (!initflg) {initflg=InitAPIFunction(arr);};
            InitAPIFunction(arr);
            for(var i=0;i<arr.length;i++)
            {
                newarr.push(arr[i]);
            }
            return  newarr;
        };
        this.autoChange=function(maxWidth,originSize){
            var width=document.documentElement.clientWidth;
            var Standard=originSize/(maxWidth*1.0/width);
            document.querySelector("html").style.fontSize=Standard+"px";
            return;
        };
        this.slide=function(elem,number,urlarray,obj,timestr,auto,autotime){//样式自己添加
            var div=doc.createElement("div"),index=doc.createElement("div"),imgstr="",oldX;
            elem.style.overflow="hidden";
            elem.style.position="relative";
            // elem.style.cssText="overflow:hidden;position:relative";
            div.style.display="-webkit-box";
            div.style.webkitTransition="-webkit-transform "+timestr;
            this.one(index).css1("width:"+obj.width+"px;text-align:right;position:absolute;bottom:0;color:white;padding-bottom:5px");
            index.innerHTML="<span style='padding-right: 15px;'><span class='index'></span>/"+number+"</span>";
        	for (var i = 0; i < number; i++) {
                imgstr+="<img src=\""+urlarray[i]+"\" alt=\"\" style=\"display: block;width:"+obj.width+"px;height:"+obj.height+"px;\" />"
	        };
            div.innerHTML=imgstr;
            elem.appendChild(div);
            elem.appendChild(index);
            index=doc.querySelector(".index");
            index.innerHTML=indexOfSlide+1;
            elem.addEventListener("touchstart",function(e){
                e.preventDefault();
                var touch= e.changedTouches[0];
                oldX=touch.pageX;
                clearInterval(tt);
            });
            elem.addEventListener("touchend",function(e){
                e.preventDefault();
                var touch= e.changedTouches[0];
                if(oldX-touch.pageX>10)//right
                {
                    fnext();
                }
                else if(touch.pageX-oldX>10)
                {
                    fprev();
                }
                tt=auto&&setInterval(autoSlide,autotime);
            });
            function fprev(bool)
            {
                if(!bool)
                {
                    if (indexOfSlide !== 0)
                    {
                        index.innerHTML=indexOfSlide;
                        indexOfSlide--;
                        div.style.webkitTransform = "translate(-" + obj.width * indexOfSlide + "px,0px)";
                    }
                }
                else
                {
                    indexOfSlide=0;
                    div.style.webkitTransform="translate(-"+obj.width*indexOfSlide+"px,0px)";
                    index.innerHTML="1";
                }
            }
            function fnext()
            {
                if(indexOfSlide!==number-1)
                {
                    indexOfSlide++;
                    div.style.webkitTransform="translate(-"+obj.width*indexOfSlide+"px,0px)";
                    index.innerHTML=indexOfSlide+1;
                }
            }
            function autoSlide(){
                if(indexOfSlide!==number-1)
                    fnext();
                else
                    fprev(true);
            }
            var tt=auto&&setInterval(autoSlide,autotime);
        };
        this.lazyLoad=function(elemarray,lazytype,lazyurl){
            function pagefun()
            {
                var arr=[];
                for(var i=0;i<elemarray.length;i++)
                {
                    if(elemarray[i].tagName.indexOf("IMG")>-1)
                    {
                        arr.push(elemarray[i].src);
                        elemarray[i].src=lazyurl;
                    }
                    else
                    {
                        arr.push(elemarray[i].style.backgroundImage);
                        elemarray[i].style.backgroundImage="url("+lazyurl+")";
                        elemarray[i].style.backgroundPosition="center";
                    }
                }
                win.addEventListener("load",function(){
                    for(var j=0;j<elemarray.length;j++)
                    {
                        if(elemarray[j].tagName.indexOf("IMG")>-1)
                            elemarray[j].src=arr[j];
                        else
                            elemarray[j].style.backgroundImage=arr[j];
                    }

                });
                return;
            }
            lazytype==="page"&&pagefun();
            lazytype==="slide"&&slidefun();
        };
        this.countDown=function(enddate,showobj){//样式自己添加
            var obj=this;
            function timeout(){
                // this;
                var nowdate=new Date();
                var lasttime=enddate.valueOf()-nowdate.valueOf();
                var lastd=parseInt(lasttime/(1000*60*60*24));
                var lasth=parseInt(lasttime/(1000*60*60)-lastd*24);
                var lastm=parseInt(lasttime/(1000*60)-lastd*24*60-lasth*60);
                var lasts=parseInt(lasttime/(1000)-lastd*24*60*60-lasth*60*60-lastm*60);
                if(Math.floor(lastd/10)===0)
                {
                    lastd="0"+lastd;
                }
                if(Math.floor(lasth/10)===0)
                {
                    lasth="0"+lasth;
                }
                if(Math.floor(lastm/10)===0)
                {
                    lastm="0"+lastm;
                }if(Math.floor(lasts/10)===0)
                {
                    lasts="0"+lasts;
                }
                if(!showobj)
                {
                    obj.dom(".day").innerHTML=lastd;
                    obj.dom(".hour").innerHTML=lasth;
                    obj.dom(".minute").innerHTML=lastm;
                    obj.dom(".second").innerHTML=lasts;
                }
                else
                {
                    if(showobj.day)
                        obj.dom(".day").innerHTML=lastd;
                    if(showobj.hour)
                        obj.dom(".hour").innerHTML=lasth;
                    if(showobj.minute)
                        obj.dom(".minute").innerHTML=lastm;
                    if(showobj.second)
                        obj.dom(".second").innerHTML=lasts;
                }
            };
            setInterval(timeout,1000);
        };
        this.loadMore=function(configobj){
            
        };
    };
    function InitAPIFunction(obj)
    {
        Array.prototype.css=function(cssobj){
            var cssstr="";
            for(var i=0;i<obj.length;i++)
            {
                for(var name in cssobj)
                {
                    cssstr+=(name+":"+cssobj[name]+";");
                }
                obj[i].style.cssText=obj[i].getAttribute("style")?obj[i].getAttribute("style")+cssstr:cssstr;
            }
            return obj;
        };
        Array.prototype.css1=function(cssstr){
            for(var i=0;i<obj.length;i++)
            {
                obj[i].style.cssText=obj[i].getAttribute("style")?obj[i].getAttribute("style")+cssstr:cssstr;
            }
            return obj;
        };
        Array.prototype.addClass=function(classstr){
            for(var i=0;i<obj.length;i++)
            {
                obj[i].className=obj[i].className.indexOf(classstr)>-1?obj[i].className:obj[i].className+" "+classstr;
                obj[i].className=obj[i].className.trim();
            }
            return obj;
        };
        Array.prototype.removeClass=function(classstr){
            for(var i=0;i<obj.length;i++)
            {
                obj[i].className=obj[i].className?obj[i].className.indexOf(classstr)>-1?obj[i].className.replace(classstr,"").trim():obj[i].className:"";
            }
        };
        return;
    }
    function BasicInfo(doc,win)
    {
        this.UA=win.navigator.userAgent;
        this.PhoneWidth=win.screen.width;
        this.PhoneHeight=win.screen.height;
        //this.Scroll={"top":doc.body.scrollTop,"left":doc.body.scrollLeft};
    }
    function mobileCommon(meta)
    {
        this.metaelem=doc.querySelectorAll("meta");
        this.mobilemeta="<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" \/>"+
        "<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\" \/>"+
        "<meta content=\"telephone=no\" name=\"format-detection\" \/>"+
        "<meta name=\"viewport\" content=\"initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui\" \/>"
        this.f=function(){
            for(var i=0;i<this.metaelem.length;i++)
            {
                if(this.metaelem[i].getAttribute("mobile")==="true")
                {
                    doc.querySelector("head").innerHTML=this.mobilemeta+doc.querySelector("head").innerHTML;
                    break;
                }
            }
            return;
        };
        this.f();
    }
    mobile.prototype.mobilecommon=new mobileCommon();
    mobile.prototype.basicinfo=new BasicInfo(doc,win);
    var mobile=new mobile();
    mobile.readOnly=true;
    win.mobile=mobile;
    // MobileObj.prototype=mobile;
})(document,window);

