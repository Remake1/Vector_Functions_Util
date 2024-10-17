import {defineStore} from 'pinia'

import {ref} from 'vue';
import axios from 'axios';

export const useGlobalStore = defineStore('global', () => {
    // Input fields
    const xFunction = ref('');
    const yFunction = ref('');
    const zFunction = ref('');
    const T = ref('');

    // Images
    const graphUrl = ref(null);
    const curvatureImageUrl = ref(null);
    const tangentImageUrl = ref(null);
    const normalImageUrl = ref(null);

    // Wolfram API
    const appId = 'GQT55A-U4UWAJL2U5';
    const url = 'https://cors-anywhere.herokuapp.com/https://api.wolframalpha.com/v2/query';


    // Math input tools
    function ddt(fun){
        return `d/dt(${fun})`;
    }

    function magnitude(x,y,z){
        return `sqrt((${x})^2+(${y})^2+(${z})^2 )`;
    }

    function dElement(el, x,y,z){
        return `(${ddt(el)})/(${magnitude(ddt(x),ddt(y),ddt(z))})`;
    }

    // Methods
    // Graph
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
    // Curvature
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

    // Tangent
    const getTangent = async () => {
        const tangentURL = `https://www.wolframcloud.com/obj/83dfa5b7-4b11-47f5-b13c-73687403669f?x=${xFunction.value}&y=${yFunction.value}&z=${zFunction.value}`;

        try {
            const response = await axios.get(tangentURL,
                { responseType: 'blob', headers: { 'Accept': 'image/jpeg' }});

            tangentImageUrl.value = window.URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Error fetching curvature:', error.message);
        }
    }

    // Normal
    const getNormal = async () => {
        const tangentURL = `https://www.wolframcloud.com/obj/karbongames7/normal?x=${xFunction.value}&y=${yFunction.value}&z=${zFunction.value}&t=${T.value}`;

        try {
            const response = await axios.get(tangentURL,
                { responseType: 'blob', headers: { 'Accept': 'image/jpeg' }});

            normalImageUrl.value = window.URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Error fetching curvature:', error.message);
        }
    }

    const handleSubmit = async () => {
        await fetchGraph();
        await getCurvature();
        await getTangent();
        await getNormal();
    }

    return {
        xFunction,
        yFunction,
        zFunction,
        T,
        graphUrl,
        curvatureImageUrl,
        tangentImageUrl,
        normalImageUrl,
        fetchGraph,
        handleSubmit
    };
})