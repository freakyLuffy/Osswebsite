import { get_organization_contributors } from "./controller/contributors.js";
import { get_organization_repos } from "./controller/repos.js";
import { getRepoIssues } from "./controller/issues.js";

const pathName=window.location.pathname;
// console.log(pathName);

if (pathName==="/issues.html") {
    getRepoIssues();
} else if (pathName==="/") {
    get_organization_repos();
    get_organization_contributors();
} 

Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});

const app = new Vue({
  el: '#app'
});

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true;
const intervalTime = 3000;
let slideInterval;

const nextSlide =() => {
  // Get current class
  const current = document.querySelector('.current');
  current.classList.remove('current');
  if(current.nextElementSibling){
    current.nextElementSibling.classList.add('current');
  }else{
    slides[0].classList.add('current');
  }
  setTimeout(()=>{
    current.classList.remove('current');
  })
}

const prevSlide =() => {
  // Get current class
  const current = document.querySelector('.current');
  current.classList.remove('current');
  if(current.previousElementSibling){
    current.previousElementSibling.classList.add('current');
  }else{
    slides[slides.length-1].classList.add('current');
  }
  setTimeout(()=>{
    current.classList.remove('current');
  })
}

// button event
next.addEventListener('click', e =>{
  nextSlide();
  if(auto){
    clearInterval(slideInterval)
    slideInterval = setInterval(nextSlide, intervalTime)
  }
})

prev.addEventListener('click', e=>{
  prevSlide();
  if(auto){
    clearInterval(slideInterval)
    slideInterval = setInterval(nextSlide, intervalTime)
  }
})

// auto slide
if(auto){
  slideInterval = setInterval(nextSlide, intervalTime)
}

