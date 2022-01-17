<template>
  <div>
    <div class="header">
      <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"/>
          </g>
        </svg>
      </div>


    </div>


    <div style="height: 100px;display: flex;line-height: 100px;justify-content: center">
      <div style="width: 20px;height: 20px;margin-top: 5px">
        <img style="width: 100%;height: 100%" src="http://r5ef12yid.hn-bkt.clouddn.com/logo.png">
      </div>
      <div style="margin-left: 10px">滁州永荣职业培训学校培训服务平台</div>
      <div style="margin-left: 10px">京ICP备12020869号-2</div>
      <div style="margin-left: 10px">滁州永荣职业培训学校培训服务平台</div>
    </div>
  </div>
</template>

<script>
/*主页版权信息底部标签*/
export default {
  name: "HomeViewEnd"
}
</script>

<style scoped>
body {
  margin: 0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 48px;
}

p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size: 14px;
  color: #333333;
}

.header {
  position: relative;
  text-align: center;
  background: linear-gradient(60deg, honeydew 0%, seashell 100%);
  color: white;
}

.inner-header {
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }

  .content {
    height: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}


* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "microsoft yahei";
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #000;
}

img {
  border: none;
}

ul {
  list-style: none;
}

.w1280 {
  width: 1280px;
  margin: 0 auto;
  height: auto;
  overflow: hidden;
}

.footer {
  width: 100%;
  height: auto;
  overflow: hidden;
  font-size: 16px;
  color: #1a1a1a;
}

.footer .line {
  width: 100%;
  height: 1px;
  background: #e9e9e9;
}

.footer .youshi {
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #e9e9e9;
}

.footer .youshi ul li {
  float: left;
  text-align: center;
  width: 25%;
  position: relative;
}

.footer .youshi ul li:after {
  content: "";
  position: absolute;
  display: block;
  height: 20px;
  width: 1px;
  background: #e9e9e9;
  right: 0;
  top: 25px;
}

.footer .youshi ul li:last-child:after {
  display: none;
}

.footer .youshi ul li i {
  font-size: 20px;
  padding-right: 5px;
}

.footer .middle {
  width: 100%;
  height: auto;
  padding: 40px 0;
  border-bottom: 1px solid #e9e9e9;
  overflow: hidden;
}

.footer .middle .about {
  float: left;
  position: relative;
  height: auto;
}

.footer .middle .about:after {
  content: "";
  position: absolute;
  display: block;
  height: 140px;
  width: 1px;
  background: #e9e9e9;
  right: 0;
  top: 0px;
}

.footer .middle .about ul li {
  float: left;
  width: 192px;
}

.footer .middle .about ul li h4 {
  font-weight: normal;
  margin-bottom: 15px;
}

.footer .middle .about ul li p {
  line-height: 35px;
  color: #aaa;
}

.footer .middle .erweima {
  float: left;
  width: 256px;
  text-align: center;
  position: relative;
}

.footer .middle .erweima::after {
  content: "";
  position: absolute;
  display: block;
  height: 140px;
  width: 1px;
  background: #e9e9e9;
  right: 0;
  top: 0px;
}

.footer .middle .erweima h4 {
  font-weight: normal;
  margin-bottom: 15px;
}

.footer .middle .contact {
  float: left;
  width: 256px;
  text-align: center;
  font-size: 14px;
}

.footer .middle .contact i {
  font-size: 50px;
  color: #38b4ec;
}

.footer .middle .contact p {
  line-height: 20px;
}

.footer .middle .contact p span {
  color: #aaa;
}

.footer .copyright {
  padding: 22px 0;
  font-size: 12px;
  color: #aaa;
}

.footer .copyright i {
  color: red;
  font-style: normal;
}

.footer .copyright span {
  float: right;
}
</style>
