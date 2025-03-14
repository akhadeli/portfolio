(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1481:(e,n,t)=>{Promise.resolve().then(t.bind(t,5736))},5736:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>d});var i=t(5155),o=t(5841),r=t(7558),s=t(2115),a=t(6552),m=t(2230),v=t(3264);let l=()=>{let e=new v.Z58,n=new v.qUd(-1,1,1,-1,-1,1);return n.position.set(0,0,.5),n.lookAt(0,0,0),{fboScene:e,fboCamera:n}},x=e=>{let n=new Float32Array(e*e*4);for(let t=0;t<e;t++)for(let i=0;i<e;i++){let o=(t*e+i)*4,r=Math.random()*Math.PI*2,s=.5+.5*Math.random();n[o]=Math.cos(r)*s,n[o+1]=Math.sin(r)*s,n[o+2]=1,n[o+3]=1}let t=new v.GYF(n,e,e,v.GWd,v.RQf);return t.minFilter=v.hxR,t.magFilter=v.hxR,t.needsUpdate=!0,t},c=e=>{let n=new Float32Array(e*e*4);for(let t=0;t<e;t++)for(let i=0;i<e;i++){let o=(t*e+i)*4;n[o]=.5+Math.random(),n[o+1]=.5+Math.random(),n[o+2]=1,n[o+3]=1}let t=new v.GYF(n,e,e,v.GWd,v.RQf);return t.minFilter=v.hxR,t.magFilter=v.hxR,t.needsUpdate=!0,t},p=e=>{let n=e*e,t=new Float32Array(3*n),i=new Float32Array(2*n);for(let n=0;n<e;n++)for(let o=0;o<e;o++){let r=n+o*e;t[3*r]=Math.random(),t[3*r+1]=Math.random(),t[3*r+2]=0;let s=n+o*e;i[2*s]=n/e,i[2*s+1]=o/e}return{positions:t,uv:i}};function u(){let e=(0,s.useRef)(null),n=(0,s.useMemo)(()=>x(128),[]),t=(0,s.useMemo)(()=>c(128),[]),{positions:o,uv:r}=(0,s.useMemo)(()=>p(128),[]),{fboScene:u,fboCamera:f}=(0,s.useMemo)(()=>l(),[]),d=(0,s.useMemo)(()=>({uPositions:{value:n},uInfo:{value:t},uTime:{value:0},resolution:{value:new v.IUQ},progress:{value:0},uMouse:{value:new v.I9Y(0,0)}}),[n,t]),y=(0,s.useMemo)(()=>({uPositions:{value:null},uTime:{value:0},resolution:{value:new v.IUQ},progress:{value:0}}),[n]),w=(0,m.j)(512,512,{type:v.RQf,minFilter:v.hxR,magFilter:v.hxR,format:v.GWd}),g=(0,m.j)(512,512,{type:v.RQf,minFilter:v.hxR,magFilter:v.hxR,format:v.GWd}),h=(0,s.useRef)(!0);return(0,a.C)(t=>{let{gl:i,scene:o,camera:r,clock:s}=t;if(e.current){d.uTime.value+=.05,y.uTime.value=s.getElapsedTime(),h.current?(d.uPositions.value=n,h.current=!1):d.uPositions.value=g.texture,y.uPositions.value=w.texture,i.setRenderTarget(w),i.render(u,f),i.setRenderTarget(null),i.render(o,r);let e=w;w=g,g=e}}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("points",{ref:e,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[o,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-uv",args:[r,2]})]}),(0,i.jsx)("shaderMaterial",{side:v.$EB,fragmentShader:"\n    uniform float uTime;\n    uniform float progress;\n    uniform sampler2D uPositions;\n    uniform vec4 resolution;\n    varying vec2 vUv;\n    varying vec3 vPosition;\n    varying vec4 vColor;\n    float PI = 3.141592653589793238;\n\n    void main() {\n        gl_FragColor = vec4(1., 0., 0., 1.);\n        gl_FragColor = vColor;\n    }\n",vertexShader:"\n    uniform float uTime;\n    varying vec2 vUv;\n    varying vec3 vPosition;\n    varying vec4 vColor;\n    uniform sampler2D uPositions;\n    float PI = 3.141592653589793238;\n\n    void main() {\n        vUv = uv;\n\n        vec4 pos = texture2D(uPositions, vUv);\n\n        float angle = atan(pos.y, pos.x);\n\n        vColor = 0.7 * vec4(0.7 + 0.45*sin(angle + uTime*0.5));\n\n        vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);\n        gl_PointSize = 2.0 * (1.0 / -mvPosition.z);\n        gl_Position = projectionMatrix * mvPosition;\n    }\n",uniforms:y,transparent:!0})]}),(0,a.o)((0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[2,2]}),(0,i.jsx)("shaderMaterial",{fragmentShader:"\n    uniform float uTime;\n    uniform float progress;\n    uniform sampler2D uPositions;\n    uniform sampler2D uInfo;\n    uniform vec4 resolution;\n    varying vec2 vUv;\n    varying vec3 vPosition;\n    uniform vec2 uMouse;\n    float PI = 3.141592653589793238;\n\n    #define PI 3.1415926538\n\n    const float EPS = 0.001;\n    vec4 mod289(vec4 x) {\n        return x - floor(x * (1.0 / 289.0)) * 289.0;\n    }\n    float mod289(float x) {\n        return x - floor(x * (1.0 / 289.0)) * 289.0;\n    }\n    vec4 permute(vec4 x) {\n        return mod289(((x*34.0)+1.0)*x);\n    }\n    float permute(float x) {\n        return mod289(((x*34.0)+1.0)*x);\n    }\n    vec4 taylorInvSqrt(vec4 r) {\n        return 1.79284291400159 - 0.85373472095314 * r;\n    }\n    float taylorInvSqrt(float r) {\n        return 1.79284291400159 - 0.85373472095314 * r;\n    }\n    vec4 grad4(float j, vec4 ip) {\n        const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n        vec4 p, s;\n        p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n        p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n        s = vec4(lessThan(p, vec4(0.0)));\n        p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n        return p;\n    }\n    #define F4 0.309016994374947451\n\n    vec4 simplexNoiseDerivatives (vec4 v) {\n        const vec4  C = vec4( 0.138196601125011, 0.276393202250021, 0.414589803375032, -0.447213595499958);\n        vec4 i = floor(v + dot(v, vec4(F4)) );\n        vec4 x0 = v -   i + dot(i, C.xxxx);\n        vec4 i0;\n        vec3 isX = step( x0.yzw, x0.xxx );\n        vec3 isYZ = step( x0.zww, x0.yyz );\n        i0.x = isX.x + isX.y + isX.z;\n        i0.yzw = 1.0 - isX;\n        i0.y += isYZ.x + isYZ.y;\n        i0.zw += 1.0 - isYZ.xy;\n        i0.z += isYZ.z;\n        i0.w += 1.0 - isYZ.z;\n        vec4 i3 = clamp( i0, 0.0, 1.0 );\n        vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n        vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n        vec4 x1 = x0 - i1 + C.xxxx;\n        vec4 x2 = x0 - i2 + C.yyyy;\n        vec4 x3 = x0 - i3 + C.zzzz;\n        vec4 x4 = x0 + C.wwww;\n        i = mod289(i);\n        float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n        vec4 j1 = permute( permute( permute( permute (\n        i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n        + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n        + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n        + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n        vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n        vec4 p0 = grad4(j0, ip);\n        vec4 p1 = grad4(j1.x, ip);\n        vec4 p2 = grad4(j1.y, ip);\n        vec4 p3 = grad4(j1.z, ip);\n        vec4 p4 = grad4(j1.w, ip);\n        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\n        p0 *= norm.x;\n        p1 *= norm.y;\n        p2 *= norm.z;\n        p3 *= norm.w;\n        p4 *= taylorInvSqrt(dot(p4, p4));\n        vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point\n        \n        vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));\n        vec3 m0 = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0); //(0.5 - x^2) where x is the distance\n        \n        vec2 m1 = max(0.5 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);\n        vec3 temp0 = -6.0 * m0 * m0 * values0;\n        vec2 temp1 = -6.0 * m1 * m1 * values1;\n        vec3 mmm0 = m0 * m0 * m0;\n        vec2 mmm1 = m1 * m1 * m1;\n        float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;\n        float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;\n        float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;\n        // float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;\n        \n        \n        // return vec4(dx, dy, dz, dw) * 49.0;\n        return vec4(dx, dy, dz, 0.0) * 49.0;\n    }\n    vec3 curl( in vec3 p, in float noiseTime, in float persistence ) {\n        vec4 xNoisePotentialDerivatives = vec4(0.0);\n        vec4 yNoisePotentialDerivatives = vec4(0.0);\n        // vec4 zNoisePotentialDerivatives = vec4(0.0);\n        \n        \n        for (int i = 0; i < 2; ++i) {\n            float twoPowI = pow(2.0, float(i));\n            float scale = 0.5 * twoPowI * pow(persistence, float(i));\n            xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;\n            yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;\n            // zNoisePotentialDerivatives += snoise4(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;\n        }\n        return vec3(\n        yNoisePotentialDerivatives[1] - xNoisePotentialDerivatives[1], yNoisePotentialDerivatives[2] - xNoisePotentialDerivatives[2], yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[0]\n        );\n    }\n\n    void main() {\n        // Sample the texture using the UV coordinates\n        vec4 pos = texture2D(uPositions, vUv);\n        vec4 info = texture2D(uInfo, vUv);\n\n        vec2 mouse = uMouse;\n\n        float radius = length(pos.xy);\n\n        float circularForce = 1. - smoothstep(0.3, 1.4, pos.x - radius);\n\n        float angle = atan(pos.y, pos.x) - info.y * 0.3 * mix(0.5, 1., circularForce);\n\n        float targetRadius = mix(info.x, 1.8, 0.5 + 0.45 * sin(angle*2. + uTime*0.6));\n\n        radius += (targetRadius - radius) * mix(0.2, 0.5, circularForce);\n\n        vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;\n        \n        pos.xy += (targetPos.xy - pos.xy) * 0.01;\n\n        pos.xy += curl(pos.xyz * 4., uTime*0.1, 0.1).xy * 0.002;\n\n        float distToMouse = length(pos.xy - mouse);\n        vec2 dir = normalize(pos.xy - mouse);\n\n        pos.xy += dir * 0.01 * smoothstep(0.5, 0.0, distToMouse);\n        \n        // Display the texture directly\n        gl_FragColor = vec4(pos.xy, 1.0, 1.0);\n    }\n",vertexShader:"\n    uniform float uTime;\n    varying vec2 vUv;\n    varying vec3 vPosition;\n    uniform vec2 pixels;\n\n    void main() {\n        vUv = uv;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n",uniforms:d})]}),u),(0,i.jsxs)("mesh",{position:[0,0,1],onPointerMove:e=>{d.uMouse.value=new v.I9Y(e.point.x,e.point.y)},children:[(0,i.jsx)("planeGeometry",{args:[4,4]}),(0,i.jsx)("meshBasicMaterial",{transparent:!0,opacity:0})]})]})}function f(){return(0,i.jsx)(r.Hl,{camera:{position:[0,0,3]},children:(0,i.jsx)(u,{})})}function d(){return(0,i.jsx)(o.FH,{root:!0,children:(0,i.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]",children:[(0,i.jsx)("main",{className:"flex flex-col gap-8 row-start-2 items-center sm:items-start w-full",children:(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"w-full h-screen",children:(0,i.jsx)(f,{})})})}),(0,i.jsx)("footer",{className:"row-start-3 flex gap-6 flex-wrap items-center justify-center"})]})})}}},e=>{var n=n=>e(e.s=n);e.O(0,[367,831,413,821,441,684,358],()=>n(1481)),_N_E=e.O()}]);