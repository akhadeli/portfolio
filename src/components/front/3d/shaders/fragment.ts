export const fragment = `
    uniform float uTime;
    uniform float progress;
    uniform sampler2D uPositions;
    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec4 vColor;
    float PI = 3.141592653589793238;

    void main() {
        gl_FragColor = vec4(1., 0., 0., 1.);
        gl_FragColor = vColor;
    }
`;
