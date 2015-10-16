/**
 * Created by ZheChen on 2015/3/20.
 * 自用。欢迎指正不足。
 * 不依赖任何第三方类库，兼容主流浏览器，不支持IE8及以下版本
 **/
(function(doc,win){
    var indexOfSlide=0,initflg=false;
    function GetMobileObj(one)
    {
        //Init mobile core API,mobile核心库（实例化MobileObj对象并加载核心库）
        function MobileObj()
        {
            this.css=function(cssobj){
                var cssstr="",obj=this;
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
            this.css1=function(cssstr){
                var obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    obj[i].style.cssText=obj[i].getAttribute("style")?obj[i].getAttribute("style")+cssstr:cssstr;
                }
                return obj;
            };
            this.addClass=function(classstr){
                var obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    obj[i].className=obj[i].className.indexOf(classstr)>-1?obj[i].className:obj[i].className+" "+classstr;
                    obj[i].className=obj[i].className.trim();
                }
                return obj;
            };
            this.removeClass=function(classstr){
                var obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    obj[i].className=obj[i].className?obj[i].className.indexOf(classstr)>-1?obj[i].className.replace(classstr,"").trim():obj[i].className:"";
                }
                return obj;
            };
            this.hasClass=function(classstr){
                var obj=this[0];
                if(obj.className.indexOf(classstr)>-1)
                    return true;
                else return false;
            };
            this.parents=function(selector){
                var e=this[0],parent,mobj=this;
                mobj.length=0;
                if(!selector) 
                {
                    mobj.push(e.parentNode)
                    return mobj;
                }
                parent=doc.querySelector(selector);
                if(e==parent) return mobj;
                while(e!==parent)
                {
                    e= e.parentNode;
                    if(!e)
                        return mobj;
                }
                mobj.push(e);
                return mobj;
            };
            this.children=function(){
                var e=this[0],children=e.children,mobj=this;
                mobj.length=0;
                for(var i=0;i<children.length;i++)
                {
                    mobj.push(children[i]);
                }
                return mobj;
            };
            this.find=function(selector){
                var e=this[0],mobj=this;
                mobj.length=0;
                var children=e.querySelectorAll(selector);
                for(var i=0;i<children.length;i++)
                {
                    mobj.push(children[i]);
                }
                return mobj;
            };
            this.html=function(htmlstr){
                var elem=this;
                if(htmlstr!==undefined) 
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].innerHTML=htmlstr;
                    }
                }
                else return elem[0].innerHTML;
                return ;
            };
            this.append=function(htmlstr){
                var elem=this;
                if(htmlstr instanceof Node)
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].appendChild(htmlstr);
                    }
                }
                else
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].insertAdjacentHTML("beforeend",htmlstr);
                    }
                }
            };
            this.prepend=function(htmlstr){
                var elem=this;
                if(htmlstr instanceof Node)
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].prependChild(htmlstr);
                    }
                }
                else
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].insertAdjacentHTML("afterbegin",htmlstr);
                    }
                }
            };
            this.after=function(htmlstr){
                var elem=this;
                if(htmlstr instanceof Node)
                {
                    // for(var i=0;i<elem.length;i++)
                    // {
                    //     elem.parentNode.appendChild(htmlstr);
                    // }
                }
                else
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].insertAdjacentHTML("afterend",htmlstr);
                    }
                }
            };
            this.before=function(htmlstr){
                var elem=this;
                if(htmlstr instanceof Node)
                {
                    
                    // elem.parentNode.appendChild(htmlstr);
                    
                }
                else
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].insertAdjacentHTML("beforebegin",htmlstr);
                    }
                }
            };
            this.contains=function(elem){
                var obj=this[0];
                if(obj.contains(elem)) return true;
                return false;
            };
            this.hide=function(){
                var obj=this;
                
                return obj;
            };
            this.attr=function(attribute,value){
                var obj=this;
                if(value)
                {
                    for(var i=0;i<obj.length;i++)
                    {
                        obj[i].setAttribute(attribute,value);
                    }
                    return obj;
                }
                else
                {
                    return obj[0].getAttribute(attribute);
                }
            };
            this.val=function(value){
                var obj=this;
                if(value)
                {
                    for(var i=0;i<obj.length;i++)
                    {
                        obj[i].value=value;
                    }
                    return obj;
                }
                else return obj[0].value;
            };
            this.remove=function(){
                var obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    obj[i].parentNode.removeChild(obj[i]);
                }
                return obj;
            };
        }
        MobileObj.prototype=one?new Array(one):new Array();
        return new MobileObj();
    }
    
    function mobile(flg)
    {
        //Init mobile selector API,mobile选择器
        this.dom=function(selector){
            if(selector)
                return doc.querySelector(selector);
            else
                return undefined;
        };
        this.one=function(selector){
            var one,mobileobj;
            if (!selector) return undefined;
            if(selector instanceof Node)
                one=selector;
            else
                one=doc.querySelector(selector);
            mobileobj=new GetMobileObj(one);//返回mobileObj对象
            return mobileobj;
        };
        this.all=function(selector){
            var all,mobileobj;
            if (!selector) return undefined;
            if(selector instanceof Node)
            {
                mobileobj=new GetMobileObj(selector);
            }
            else
            {
                mobileobj=new GetMobileObj();
                all=doc.querySelectorAll(selector);
                for(var i=0;i<all.length;i++)
                {
                    mobileobj.push(all[i]);
                }
            }
            return  mobileobj;
        };
        if(!flg) 
            mobileFunctions.call(this);
    }
    //Init mobile function API,mobile功能库
    function mobileFunctions()
    {
        this.preventPenetration=function(configobj){
            var obj=this;
            var elem=obj.dom(configobj.targetStr);
            elem.addEventListener("touchmove",function(e){
                var touch= e.changedTouches[0];
                var target=touch.target;
                if(obj.one(target).parents(configobj.targetStr).length>0)
                {
                    if(!configobj.specialStr||(obj.one(target).parents(configobj.specialStr).length==0&&target!=obj.dom(configobj.specialStr)))
                        e.preventDefault();
                }
                else if(target==elem)
                    e.preventDefault();
            });
        };
        this.autoChange=function(maxWidth,originSize){
            var width=document.documentElement.clientWidth;
            var Standard=originSize/(maxWidth*1.0/width);
            Standard=Standard>100?100:Standard;
            documenStandard=this.dom("html").style.fontSize=Standard+"px";
            return;
        };
        this.slide=function(slidetype,elem,number,urlarray,linkarray,obj,timestr,auto,autotime){//样式自己添加
            var div=doc.createElement("div"),index=doc.createElement("div"),imgstr="",oldX,mobile=this;
            elem.style.cssText="overflow:hidden;position:relative";
            div.style.display="-webkit-box";
            div.style.webkitTransition="-webkit-transform "+timestr;
            if(slidetype==1)
            {
                this.one(index).css1("width:"+obj.width+"px;text-align:right;position:absolute;bottom:0;color:white;padding-bottom:5px");
                index.innerHTML="<span style='padding-right: 15px;'><span class='index'></span>/"+number+"</span>";
            }
            else
            {
                this.one(index).css1("width:"+obj.width+"px;text-align:center;position:absolute;bottom:0;color:white;");
                for(var i=0;i<number;i++)
                {
                    index.innerHTML+="<span style='display: inline-block;width: 13px;height: 13px;background-color: #5c5c5c;border-radius: 50% 50%;margin-right: 6px;' class='index'></span>";
                }
            }
            for (var i = 0; i < number; i++) {
                var link=linkarray[i]?linkarray[i]:"";
                imgstr+="<img src='"+urlarray[i]+"' alt='' style='display: block;width:"+obj.width+"px;height:"+obj.height+"px;' link='"+link+"' />"
            }
            div.innerHTML=imgstr;
            elem.appendChild(div);
            elem.appendChild(index);
            if(slidetype==1)
            {
                index=doc.querySelector(".index");
                index.innerHTML=indexOfSlide+1;
            }
            else
            {
                index=doc.querySelectorAll(".index");
                index[indexOfSlide].style.backgroundColor="#fff";
            }
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
                        indexOfSlide--;
                        if(slidetype==1)
                            index.innerHTML=indexOfSlide+1;
                        else
                        {
                            mobile.all('.index').css1("background-color:#5c5c5c;");
                            index[indexOfSlide].style.backgroundColor="#fff";
                        }
                        div.style.webkitTransform = "translate(-" + obj.width * indexOfSlide + "px,0px)";
                    }
                }
                else
                {
                    indexOfSlide=0;
                    div.style.webkitTransform="translate(-"+obj.width*indexOfSlide+"px,0px)";
                    if(slidetype==1)
                        index.innerHTML="1";
                    else
                    {
                        mobile.all('.index').css1("background-color:#5c5c5c;");
                        index[indexOfSlide].style.backgroundColor="#fff";
                    }
                }
            }
            function fnext()
            {
                if(indexOfSlide!==number-1)
                {
                    indexOfSlide++;
                    div.style.webkitTransform="translate(-"+obj.width*indexOfSlide+"px,0px)";
                    if(slidetype==1)
                        index.innerHTML=indexOfSlide+1;
                    else
                    {
                        mobile.all('.index').css1("background-color:#5c5c5c;");
                        index[indexOfSlide].style.backgroundColor="#fff";
                    }
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
        this.countDown=function(enddate,showobj){//样式可自己修改
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
        this.pop=function(configObj){
            var obj=this;
            var bodywidth=document.documentElement.clientWidth,elem=obj.dom(configObj.elementStr),closeelem;
            if(!document.querySelector(".pop_bg"))
            {
                var div=document.createElement('div');
                div.className="pop_bg";
                var stylestr=configObj.opacity?configObj.opacity/100 :.5;
                div.setAttribute("style","width: 100%;height: 100%;position: fixed;top:0;left: 0;z-index:60;margin:0;background-color: rgba(168,173,176,"+stylestr+");");
                document.querySelector("body").appendChild(div);
            }
            //if(!multi)
            //    $('.pop').addClass("none");
            elem.style.display=configObj.elementDisplay;
            var havepoplist=document.querySelectorAll(".havePop");
            if(havepoplist.length>0)
                obj.one(elem).css1("position: fixed;z-index:"+(parseInt(havepoplist[havepoplist.length-1].style.zIndex)+1)+";left:"+(bodywidth-elem.offsetWidth)/2+"px;top:"+configObj.top+"px");
            else
                obj.one(elem).css1("position: fixed;z-index:65;left:"+(bodywidth-elem.offsetWidth)/2+"px;top:"+configObj.top+"px");
            obj.one(elem).addClass("havePop");
            if(configObj.closeElementStr&&obj.dom(configObj.closeElementStr))
            {
                closeelem=obj.dom(configObj.closeElementStr);
                closeelem.onclick=function(e){
                    if(configObj.closeModel==="one")
                    {
                        elem.style.display="none";
                        obj.one(elem).removeClass("havePop");
                    }
                    else
                    {
                        obj.all(".havePop").css1("display:none");
                        obj.all(".havePop").removeClass("havePop");
                    }
                    if(obj.all(".havePop").length==0) obj.one(".pop_bg").remove();
                }
            }
            //obj.preventPenetration({"targetStr":configObj.elementStr,"specialStr":''});
            obj.preventPenetration({"targetStr":'.pop_bg',"specialStr":''});
            return configObj;
        }
        this.removePop=function(configObj){
            var mobile=this;
            mobile.one(configObj.elementStr).css1("display:none").removeClass("havePop");
            if(mobile.all(".havePop").length==0) mobile.one(".pop_bg").remove();
        };
        this.alert=function(alertStr,type,fun) {
            var obj=this,mobile_alert_bg=doc.createElement("div"),pageWidth=doc.documentElement.clientWidth,
                pageHeight=doc.documentElement.clientHeight;
            if(obj.dom(".mobile_alert")) {
                return;
            }
            if(type==1)
            {
                var innerhtmlstr = "<p>"+alertStr+"</p><div style='margin-top: 10px;'><span class='alert_sure' style='font-size: 15px;background-color: ;letter-spacing: 2px;padding: 5px 7px;'>确定</span></div>";
                var div=doc.createElement("div");
                div.style.cssText="width:55%;padding:10px;position: fixed;z-index:1000;top:40%;border-radius: 6px 6px;text-align: center;background-color: rgba(25,24,24,.9);color:#fff;font-size:14px;display:block;word-break:break-all;word-wrap:break-word;";
                div.className="mobile_alert";
                div.innerHTML=innerhtmlstr;
                doc.querySelector("body").appendChild(div);
                var width=obj.dom(".mobile_alert").offsetWidth;
                obj.dom(".mobile_alert").style.left=(pageWidth-width)/2+"px";
                obj.dom(".alert_sure").addEventListener("touchend",function(e){
                    e.preventDefault();
                    if(fun)
                        fun();
                    else
                    {
                        obj.dom("body").removeChild(obj.dom(".mobile_alert"));
                        obj.dom("body").removeChild(mobile_alert_bg);
                    }
                })
            }
            else if(type==2)
            {
                var innerhtmlstr = "<p>"+alertStr+"</p><div style='margin-top: 10px;'><span class='alert_cancel' style='font-size: 15px;background-color: ;letter-spacing: 2px;margin-right: 15px;padding: 5px 7px;'>取消</span><span class='alert_sure' style='font-size: 15px;background-color: ;letter-spacing: 2px;padding: 4px 6px;'>确定</span></div>";
                var div=doc.createElement("div");
                div.style.cssText="width:55%;padding:10px;position: fixed;z-index:1000;top:40%;border-radius: 6px 6px;text-align: center;background-color: rgba(25,24,24,.9);color:#fff;font-size:14px;display:block;word-break:break-all;word-wrap:break-word;";
                div.className="mobile_alert";
                div.innerHTML=innerhtmlstr;
                doc.querySelector("body").appendChild(div);
                var width=obj.dom(".mobile_alert").offsetWidth;
                obj.dom(".mobile_alert").style.left=(pageWidth-width)/2+"px";
                obj.dom(".alert_sure").addEventListener("touchend",function(e){
                    e.preventDefault();
                    if(fun)
                        fun();
                    else
                    {
                        obj.dom("body").removeChild(obj.dom(".mobile_alert"));
                        obj.dom("body").removeChild(mobile_alert_bg);
                    }
                });
                obj.dom(".alert_cancel").addEventListener("touchend",function(e){
                    e.preventDefault();
                    obj.dom("body").removeChild(obj.dom(".mobile_alert"));
                    obj.dom("body").removeChild(mobile_alert_bg);
                });
            }
            mobile_alert_bg.style.cssText="position:fixed;top:0;left:0;z-index:999;background-color: rgba(25,24,24,0.1);height:"+pageHeight+"px;width:"+pageWidth+"px";
            mobile_alert_bg.className="mobile_alert_bg";
            obj.dom("body").appendChild(mobile_alert_bg);
            obj.preventPenetration({"targetStr":'.mobile_alert_bg',"specialStr":''});
        };
        this.calendar=function(element){//样式可自己修改
            var mobile=this,
            today=new Date(),
            year=today.getFullYear(),
            month=today.getMonth(),
            date=today.getDate(),
            day=today.getDay();
            var mobile_calendar=mobile.one(".mobile_calendar");
            var popconfigobj={
                "elementStr":'.mobile_calendar',//必传
                "top":100,//必传
                "elementDisplay":"block",//必传
                "opacity":20//非必传，默认50
            };
            if(mobile_calendar.length>0)
            {
                loadCalendarHead(year,month);
                loadMonth(year,month,date);
                mobile.pop(popconfigobj);
                return;
            } 
            else loadBasicHtml();
            
            loadCalendarHead(year,month);
            loadMonth(year,month,date);
            loadCalendarEvent();

            mobile.dom(".mobile_calendar .prev_month").onclick=function(e){
                var target=e.target,
                year=mobile.one(".mobile_calendar .mon").attr("year"),
                month=mobile.one(".mobile_calendar .mon").attr("month");
                if(month==1)
                {
                    year--;
                    month=12;
                }
                else month--;
                loadCalendarHead(year,month-1);
                if(today.getMonth()+1==month) loadMonth(year,month-1,today.getDate());
                else loadMonth(year,month-1,null)
            };
            mobile.dom(".mobile_calendar .next_month").onclick=function(e){
                var target=e.target,
                year=mobile.one(".mobile_calendar .mon").attr("year"),
                month=mobile.one(".mobile_calendar .mon").attr("month");
                if(month==12)
                {
                    year++;
                    month=1;
                }
                else month++;
                loadCalendarHead(year,month-1);
                if(today.getMonth()+1==month) loadMonth(year,month-1,today.getDate());
                else loadMonth(year,month-1,null)
            };
            
            mobile.pop(popconfigobj);

            function loadMonth(year,month,date)
            {
                
                var month_dates_arr=[31,28,31,30,31,30,31,31,30,31,30,31],
                    firstdate=new Date(year,month,1),
                    li_str='',
                    d=firstdate.getDay(),
                    dd=firstdate.getDate(),
                    day_li=mobile.all(".calendar_day li"),
                    dates;
                if((year%4==0&&year%100!=0)||(year%400==0))
                    month_dates_arr[1]=29;
                dates=month_dates_arr[month];
                for(var i=0;i<7;i++)//确定起始点
                {
                    if(day_li[i].getAttribute("i")==d)
                    {
                        li_str+=("<li date='1' class='canclick'>1</li>");
                        dd++;
                        break;
                    }
                    else li_str+=("<li date='' class=''></li>");
                }
                for(var i=1;i<dates;i++)
                {
                    li_str+=("<li date='"+dd+"' class='canclick'>"+dd+"</li>");
                    dd++;
                }
                mobile.one(".dates_table").html("");
                mobile.one(".dates_table").append(li_str);
                if(date) mobile.all("li[date='"+date+"']").addClass("today");
            }
            function loadCalendarHead(year,month)
            {
                mobile.one(".mon").attr("year",year);
                mobile.one(".mon").attr("month",month+1);
                mobile.one(".calendar_year").html(year);
                mobile.one(".calendar_month").html(month+1);
            }
            function loadCalendarEvent()
            {
                mobile.dom(".dates_table").addEventListener("click",function(e){
                    var target=e.target;
                    var year=mobile.one(".mobile_calendar .mon").attr("year"),
                    month=mobile.one(".mobile_calendar .mon").attr("month");
                    if(mobile.one(target).hasClass("canclick"))
                    {
                        var date_val=year+"-"+month+"-"+target.getAttribute("date");
                        element.value=date_val;
                        mobile.removePop(popconfigobj);
                    }
                });
            }
            function loadBasicHtml()
            {
                var htmlstr="<div class='mobile_calendar'><div class='mon' year='' month=''><span class='month_ctrl prev_month'><span></span></span><span class='calendar_year'></span><span>年</span><span class='calendar_month'></span><span>月</span><span class='month_ctrl next_month'><span></span></span></div><ul class='calendar_day'><li i='1'>一</li><li i='2'>二</li><li i='3'>三</li><li i='4'>四</li><li i='5'>五</li><li i='6'>六</li><li i='0'>日</li></ul><ul class='dates_table'></ul></div>";
                mobile.one("body").append(htmlstr);
            }
        };
    }
    function DeviceInfo(doc,win)
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
    // mobile.prototype=new mobileFunctions();
    mobile.prototype.mobilecommon=new mobileCommon();
    mobile.prototype.deviceinfo=new DeviceInfo(doc,win);
    var mobile=new mobile();
    mobile.autoChange(640,100);
    mobile.readOnly=true;
    win.mobile=mobile;
    // MobileObj.prototype=mobile;
})(document,window);

