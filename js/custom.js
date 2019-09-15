(function(){

    var OnePageNav=function(){
        var navToggler=$('.navbar-toggler');
        $(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']").on('click',function(e){
            e.preventDefault();
            var hash=this.hash;
            $('html, body').animate({scrollTop:$(hash).offset().top},1000,'easeInOutExpo',function(){
                window.location.hash=hash;
            });
        });
        $("#pb-navbar ul li a[href^='#']").on('click',function(e){
            if(navToggler.is(':visible')){
                navToggler.click();
            }
        });
        $('body').on('activate.bs.scrollspy',function(){
            console.log('nice');
        }
    )};

    var offCanvasNav=function(){};
    var contentWayPoint=function(){
        var i=0;
        $('.site-animate').waypoint(function(direction){
            if(direction==='down'&&!$(this.element).hasClass('site-animated')){
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function(){
                    $('body .site-animate.item-animate').each(function(k){
                        var el=$(this);
                        setTimeout(function(){
                            var effect=el.data('animate-effect');
                            if(effect==='fadeIn'){
                                el.addClass('fadeIn site-animated');
                            }else if(effect==='fadeInLeft'){
                                el.addClass('fadeInLeft site-animated');
                            }else if(effect==='fadeInRight'){
                                el.addClass('fadeInRight site-animated');
                            }else{
                                el.addClass('fadeInUp site-animated');
                            }
                            el.removeClass('item-animate');
                        },k*100,'easeInOutExpo');
                    });
                },100);
            }
        },{offset:'95%'});
    };

    var navbarState=function(){
        var lastScrollTop=0;
        $(window).scroll(function(){
            var $this=$(this),st=$this.scrollTop(),navbar=$('.site-navbar');
            if(st>200){
                navbar.addClass('scrolled');
            }else{
                navbar.removeClass('scrolled awake');
            }
            if(navbar.hasClass('scrolled')&&st>300){
                if(st>lastScrollTop){
                    navbar.removeClass('awake');
                    navbar.addClass('sleep');
                }else{
                    navbar.addClass('awake');
                    navbar.removeClass('sleep');
                }
                lastScrollTop=st;
            }
        });
        $('.site-navbar').mouseenter(function(){
            var $this=$(this);
            $this.addClass('awake');
            $this.removeClass('sleep');
        }).mouseleave(function(){
            var $this=$(this);
            $this.addClass('sleep');
            $this.removeClass('awake');
        });
    };

    var clickMenu=function(){
        $('.navbar-nav a:not([class="external"])').click(function(event){
            var section=$(this).data('nav-section'),navbar=$('.navbar-nav');
            if(isMobile.any()){
                $('.navbar-toggle').click();
            }
            if($('[data-section="'+section+'"]').length){
                $('html, body').animate({scrollTop:$('[data-section="'+section+'"]').offset().top},500,'easeInOutExpo');
            }
            event.preventDefault();
            return false;
        });
    };

    var smoothScroll=function(){
        var $root=$('html, body');
        $('.smoothscroll').click(function(){
            $root.animate({scrollTop:$($.attr(this,'href')).offset().top},500);
            return false;
        });
    };

    var portfolioMasonry=function(){
        $('.filters ul li').click(function(){
            $('.filters ul li').removeClass('active');
            $(this).addClass('active');
            var data=$(this).attr('data-filter');
            $grid.isotope({filter:data})
        });
        if(document.getElementById("section-portfolio")){
            var $grid=$(".grid").isotope({itemSelector:".all",percentPosition:true,masonry:{columnWidth:".all"}})
        };
    };

    $(function(){
        OnePageNav();
        offCanvasNav();
        contentWayPoint();
        navbarState();
        clickMenu();
        smoothScroll();
        portfolioMasonry();
    });
    
})();