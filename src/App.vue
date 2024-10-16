<template>
  <div>
    <h1>Vector Valued Function Utils</h1>
    <h3>(Wolfram Alpha API)</h3>
    <div class="form">
      <div class="inputs">
        <div>
          <input v-model="xFunction" placeholder="Enter x(t)" />
          <input v-model="yFunction" placeholder="Enter y(t)" />
          <input v-model="zFunction" placeholder="Enter z(t)" />
        </div>
        <div>
          <input v-model="T" placeholder="Enter point T" />
        </div>
      </div>
      <button @click="handleSubmit">Submit</button>
    </div>

    <div v-if="graphUrl">
      <img :src="graphUrl" alt="Graph output" />
    </div>
    <div v-if="curvatureImageUrl">
      <img :src="curvatureImageUrl" alt="Curvature result" />
    </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const xFunction = ref('');
    const yFunction = ref('');
    const zFunction = ref('');
    const T = ref('');
    const graphUrl = ref(null);
    const curvatureImageUrl = ref(null);

    // Wolfram API
    const appId = 'GQT55A-U4UWAJL2U5';
    const url = 'https://api.wolframalpha.com/v2/query';

    const fetchGraph = async () => {
      const query = `ParametricPlot3D[{${xFunction.value}, ${yFunction.value}, ${zFunction.value}}, {t, -pi, pi}]`;

      await axios
          .get(url, {
            params: {
              input: query,
              appid: appId,
              output: 'JSON',
            },
          })
          .then(response => {
            const result = response.data.queryresult;
            if (result.success) {
              const imgSrc = result.pods.find(pod => pod.title === 'Parametric plot').subpods[0].img.src;
              graphUrl.value = imgSrc;
            } else {
              console.log('No results found.');
            }
          })
          .catch(error => {
            console.error(error);
          });
    };

    const getCurvature = async () => {
      const query = `What is the curvature of (${xFunction.value}, ${yFunction.value}, ${zFunction.value}) at ${T.value}`;

      try {
        const response = await axios.get(url, {
          params: {
            input: query,
            appid: appId,
            output: 'JSON',
          },
        });

        const result = response.data.queryresult;
        if (result.success) {
          console.log(response.data.queryresult);
          const resultSrc = result.pods.find(pod => pod.title === 'Result').subpods[0].img.src;
          curvatureImageUrl.value = resultSrc;
        } else {
          console.error('Query was not successful.');
        }
      } catch (error) {
        console.error('Error fetching curvature:', error.message);
      }
    }

    const handleSubmit = async () => {
      await fetchGraph();
      await getCurvature();
    }

    return {
      xFunction,
      yFunction,
      zFunction,
      T,
      graphUrl,
      curvatureImageUrl,
      fetchGraph,
      handleSubmit
    };
  },
};
</script>

<style scoped>
.form{
  display: flex;
}
.inputs{
  margin: 10px;
}

</style>
