
(()=>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");
    console.log("hola");
    console.log(hamburgerBtn);
    console.log(navMenu);
    console.log(closeNavBtn);
    hamburgerBtn.addEventListener("click", showNavMenu);

    function showNavMenu(){
        navMenu.classList.toggle("open");
    }
});


(()=> {
    const aboutSection = document.querySelector('.about-section');
    const tabsContainer = document.querySelector('.about-tabs');

    tabsContainer.addEventListener('click', (event) => {

        if(event.target.classList.contains("tab-item") &&
        !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");

            event.target.classList.add("active", "outer-shadow");

            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();


function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}

/* Portfolio Filtro y Pop-up */

(()=> {
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetaisContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item")&& !event.target.classList.contains("active")){
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item)=>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click",(event)=>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            console.log(screenshots);

            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupSlideshow();
            popupToggle();
            popupDetails();
        }
    })

    function popupDetails(){
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title =  portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");

    }

    closeBtn.addEventListener("click",()=> {
        popupToggle();
        if(projectDetaisContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    nextBtn.addEventListener("click", () => {
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        popupSlideshow();
    })
    
    prevBtn.addEventListener("click", ()=>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }else{
            slideIndex--;
        }
        popupSlideshow();
    })

    projectDetailsBtn.addEventListener("click",()=>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetaisContainer.classList.contains("active")){
            projectDetaisContainer.classList.remove("active");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetaisContainer.style.maxHeight = 0 + "px";
        }else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetaisContainer.classList.add("active");
            projectDetaisContainer.style.maxHeight = projectDetaisContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetaisContainer.offsetTop);
        }
    }

})();


(()=>{
    const sections = document.querySelectorAll(".section");
    console.log("hola");
    sections.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.toggle("open");
        bodyScrollingToggle();
    }

    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    document.addEventListener("click", (event)=>{
        if(event.target.classList.contains("link-item")){

            if(event.target.hash !== ""){
                event.preventDefault();
                const hash = event.target.hash;
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                if(navMenu.classList.contains("open")){
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
    
                    hideNavMenu();
                }else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        event.target.classList.add("active","inner-shadow");
                        event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    })
                    fadeOutEffect();
                }
                window.location.hash = hash;
            }
        }
    })

})();