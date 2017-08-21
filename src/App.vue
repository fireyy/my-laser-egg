<template>
  <div id="app">
    <header class="layout-header">
      <h1 class="logo">
        <router-link to="/" exact><img src="~public/logo-48.png" alt="logo"> My Laser Egg</router-link>
      </h1>
      <nav>
        <ul>
          <li>
            <router-link to="/now">Now</router-link>
          </li>
          <li>
            <router-link to="/today">Today</router-link>
          </li>
          <li>
            <router-link to="/recent">Recent</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="layout-content"></router-view>
    </transition>
    <spinner :show="loading"></spinner>
    <div id="tip" style="display: none;"></div>
    <footer class="layout-footer">
      Laser Egg Dashboard 2017
    </footer>
  </div>
</template>
<script>
import Spinner from './components/Spinner.vue'
export default {
  components: {Spinner},
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>
<style lang="css">
html {
  height: 100%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  position: relative;
  margin: 0;
  padding: 120px 0 6rem;
  min-height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #1C2023;
  color: #fff;
  /*#7E899B*/
}

a {
  text-decoration: none;
  color: inherit
}

.layout-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

.logo {
  font-size: .9rem;
  font-weight: 400;
  user-select: none;
  cursor: default;
}

.logo img {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.layout-header nav li {
  display: inline-block;
}

.layout-header nav a {
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
  margin: 0 15px;
  user-select: none;
  letter-spacing: 0.05rem;
  opacity: .45;
  color: #fff;
}

.layout-header nav a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -5px;
  left: 0;
  background-color: #fff;
  visibility: hidden;
  transform: scaleX(0);
  transition: all .25s cubic-bezier(.82, 0, .12, 1);
}

.layout-header nav a:hover:before {
  visibility: visible;
  transform: scaleX(1)
}

.layout-header nav a:hover,
.layout-header nav a.router-link-active {
  opacity: 1
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.layout-content {
  padding: 40px 40px 0;
  text-align: center;
  position: relative;
}

.layout-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  font-size: 12px;
  text-align: center;
  color: #7E899B;
}

.inline {
  list-style: none;
  padding: 0;
}

.inline li {
  display: inline-block;
  width: 200px;
  text-align: center;
}

.inline li em {
  opacity: .4;
  font-style: normal;
  display: block;
}

.inline li span {
  font-size: 4em;
}

section {
  padding: 50px 0;
}

section h2 {
  letter-spacing: .2em;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0 0 50px;
}

@keyframes show {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(-10px);
  }
}
#tip.show {
  animation-name: show;
  animation-duration: 300ms;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
}
#tip {
  position: absolute;
  margin-top: 0;
  text-align: center;
  text-transform: none;
  background: rgb(34, 39, 42);
  color: white;
  padding: 10px 25px;
  border-radius: 2px;
  z-index: 100;
  pointer-events: none;
  font-size: .8em;
  opacity: 0;
}
#tip:after {
	top: 100%;
	left: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}
#tip:after {
	border-color: rgba(0,0,0,0);
	border-top-color: rgb(34, 39, 42);
	border-width: 5px;
	margin-left: -5px;
}

@media (max-width: 600px) {
  .layout-header nav li {
    display: block;
  }
}
</style>
