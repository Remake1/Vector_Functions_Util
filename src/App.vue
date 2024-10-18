<template>
  <div>
    <h1>Vector Valued Function Utils</h1>
    <h3>(Wolfram Alpha API)</h3>
    <h4>(avoid using ^ and [] in input)</h4>
    <div class="form">
      <div class="inputs">
        <div>
          <input v-model="store.xFunction" placeholder="Enter x(t)" />
          <input v-model="store.yFunction" placeholder="Enter y(t)" />
          <input v-model="store.zFunction" placeholder="Enter z(t)" />
        </div>
        <div>
          <input v-model="store.T" placeholder="Enter point T" />
        </div>
      </div>
      <div v-if="!store.isLoading">
        <button @click="store.handleSubmit">Submit</button>
      </div>
      <div v-else>
        <svg width="30" height="30" fill="white" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" class="spinner_6kVp"/></svg>
      </div>
    </div>

    <h4>Graph from -π to π</h4>
    <div v-if="store.graphUrl">
      <img :src="store.graphUrl" alt="Graph output" />
    </div>

    <div class="output">
      <h4>Curvature(κ): </h4>
      <div v-if="store.curvatureImageUrl">
        <img :src="store.curvatureImageUrl" alt="Curvature result" />
      </div>
    </div>

    <div class="output">
      <h4>Tangent vector(T): </h4>
      <div v-if="store.tangentImageUrl">
        <img :src="store.tangentImageUrl" alt="Curvature result" />
      </div>
    </div>

    <div class="output">
      <h4>Norma vector(N): </h4>
      <div v-if="store.normalImageUrl">
        <img :src="store.normalImageUrl" alt="Curvature result" />
      </div>
    </div>

    </div>
</template>

<script setup>
import {useGlobalStore} from "./globalStore.js";

const store = useGlobalStore();
</script>

<style scoped>
.form{
  display: flex;
}
.inputs{
  margin: 10px;
}
.output{
  display: flex;
  align-items: center;
}
.output * {
  margin-right: 10px;
}
.spinner_6kVp
{
  transform-origin:center;
  animation:spinner_irSm .75s infinite linear
}
@keyframes spinner_irSm{
   100%{
     transform:rotate(360deg)
   }
}
</style>
