gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#scroller"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("#scroller", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#scroller", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#scroller").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



var tl = gsap.timeline();

tl.from('#NotesLogo',{
  opacity:0,
  stagger:0.3,
  scrub:3
},1);

tl.from('#navLinks',{
  y:-100,
  opacity:0,
  stagger:0.9,
  scrub:3,
},1);
tl.from('#btn-1',{
  opacity:0,
  stagger:0.9,
  scrub:3,
},1);
tl.from('#middleText #first',{
  duration:0.2,
  delay:0.4,
  opacity:0 ,
  stagger:0.4,
  scale:3,  
  scrub:4
},2);
tl.from('#middleText #second,#third',{
  duration:0.2,
  delay:0.4,
  opacity:0 ,
  scrub:4,
  scale:2,
  stagger:0.3
})
tl.from('.left img',{
  duration:0.3,
  opacity:0,
  delay:0.5,
  scale:0,
  left:'-1rem',
  ease: "power1.out"
},3);
tl.from('.right img',{
  duration:0.3,
  // scale:2,
  right:'0',
  opacity:0,
  scale:0,
  delay:0.5,
  ease: "power1.out"
},3);
tl.from('#middleText .third',{
  duration:0.9,
  delay:0.2,
  // scale:0,
  y:'-20',
  scrub:5,
  repeat:-1,
  yoyo:true,
  ease: "power1.out"
  // top:'-100'
})