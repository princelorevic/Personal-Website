const menuToggle=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");
const navItems=document.querySelectorAll(".nav-links a");
const currentYear=document.querySelector("#current-year");

if(currentYear) currentYear.textContent=new Date().getFullYear();

menuToggle?.addEventListener("click",()=>{
    const open=navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded",String(open));
    menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
});
navItems.forEach(link=>link.addEventListener("click",()=>navLinks.classList.remove("active")));

const sections=document.querySelectorAll("main section[id]");
const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        navItems.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${entry.target.id}`));
    });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section=>observer.observe(section));

const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const galleries={
    lms:[
        {src:"assets/images/project-1-admin.png",title:"Admin Dashboard"},
        {src:"assets/images/project-1-supervisor.png",title:"Supervisor Dashboard"},
        {src:"assets/images/project-1-employee.png",title:"Employee Dashboard"}
    ],
    inventory:[
        {src:"assets/images/project-2-login.png",title:"Login Screen"},
        {src:"assets/images/project-2-admin.png",title:"Admin Dashboard"},
        {src:"assets/images/project-2-cashier.png",title:"Cashier POS"}
    ]
};

const lightbox=document.querySelector("#lightbox");
const lightboxImage=document.querySelector("#lightbox-image");
const lightboxTitle=document.querySelector("#lightbox-title");
const lightboxCounter=document.querySelector("#lightbox-counter");
const prev=document.querySelector("#lightbox-prev");
const next=document.querySelector("#lightbox-next");
let currentGallery=null;
let currentIndex=0;

function updateLightbox(){
    const item=galleries[currentGallery][currentIndex];
    lightboxImage.src=item.src;
    lightboxImage.alt=item.title;
    lightboxTitle.textContent=item.title;
    lightboxCounter.textContent=`${currentIndex+1} / ${galleries[currentGallery].length}`;
    document.querySelectorAll(`.gallery-thumb[data-gallery="${currentGallery}"]`).forEach((btn,i)=>{
        btn.classList.toggle("active",i===currentIndex);
    });
}
function openLightbox(gallery,index){
    currentGallery=gallery;
    currentIndex=index;
    updateLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
}
function closeLightbox(){
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
}
function move(step){
    currentIndex=(currentIndex+step+galleries[currentGallery].length)%galleries[currentGallery].length;
    updateLightbox();
}

document.querySelectorAll("[data-gallery]").forEach(button=>{
    button.addEventListener("click",()=>openLightbox(button.dataset.gallery,Number(button.dataset.index)));
});
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeLightbox));
prev.addEventListener("click",()=>move(-1));
next.addEventListener("click",()=>move(1));
document.addEventListener("keydown",e=>{
    if(!lightbox.classList.contains("open"))return;
    if(e.key==="Escape")closeLightbox();
    if(e.key==="ArrowLeft")move(-1);
    if(e.key==="ArrowRight")move(1);
});
