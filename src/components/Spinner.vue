<template>
  <transition>
    <div class="loader" v-show="show">
      <div class="loading"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'spinner',
  props: ['show'],
  serverCacheKey: props => props.show
}
</script>

<style lang="css">
@keyframes wave {
  0% {
    border-radius: 25%;
  }
  100% {
    border-radius: 50%;
  }
}

@keyframes wave-after {
  0% {
    border-radius: 25%;
    left: -50px;
  }
  100% {
    border-radius: 50%;
    left: -42px;
  }
}

@keyframes wave-before {
  0% {
    border-radius: 25%;
    left: 44px;
  }
  100% {
    border-radius: 50%;
    left: 36px;
  }
}

@keyframes ocean {
  0% {
    top: 0;
  }
  100% {
    top: 10px;
  }
}

.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 300px;
  height: 30px;
  animation: ocean .9s infinite alternate ease-in-out;
}

.loading,
.loading:after,
.loading:before {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-bottom-color: #f32a64;
  box-sizing: border-box;
}

.loading {
  position: relative;
  margin: auto;
  margin-bottom: 10px;
  animation: wave 1.1s infinite alternate ease-in-out;
}

.loading:after,
.loading:before {
  position: absolute;
  content: "";
  display: block;
  top: -3px;
}

.loading:after {
  left: -42px;
  animation: wave-after 1.1s infinite alternate ease-in-out;
}

.loading:before {
  left: 36px;
  animation: wave-before 1.1s infinite alternate ease-in-out;
}
</style>
