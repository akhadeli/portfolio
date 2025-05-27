export const fragment = `
    uniform float uTime;
    uniform float progress;
    uniform sampler2D uPositions;
    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    float PI = 3.141592653589793238;

    void main() {
        // Sample the texture using the UV coordinates
        vec4 pos = texture2D(uPositions, vUv);
        
        // Display the texture directly
        gl_FragColor = pos;
    }
`;

export const vertex = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform vec2 pixels;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
