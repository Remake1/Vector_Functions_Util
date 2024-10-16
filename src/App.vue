<template>
  <div>
    <h1>Vector Valued Function Utils</h1>
    <h3>(Wolfram Alpha API)</h3>
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
      <button @click="store.handleSubmit">Submit</button>
    </div>

    <h4>Graph from -π to π</h4>
    <div v-if="store.graphUrl">
      <img :src="store.graphUrl" alt="Graph output" />
    </div>

    <div class="output">
      <h4>Curvature(κ) at T</h4>
      <div v-if="store.curvatureImageUrl">
        <img :src="store.curvatureImageUrl" alt="Curvature result" />
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
</style>
