// checked - first draw
const vertexParticles = `
    #define attribute in
    #define varying out
    #define texture2D texture
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    precision highp samplerCube;
    precision highp sampler3D;
    precision highp sampler2DArray;
    precision highp sampler2DShadow;
    precision highp samplerCubeShadow;
    precision highp sampler2DArrayShadow;
    precision highp isampler2D;
    precision highp isampler3D;
    precision highp isamplerCube;
    precision highp isampler2DArray;
    precision highp usampler2D;
    precision highp usampler3D;
    precision highp usamplerCube;
    precision highp usampler2DArray;
    #define HIGH_PRECISION
    #define SHADER_TYPE ShaderMaterial
    #define SHADER_NAME 
    #define DOUBLE_SIDED
    #ifdef USE_INSTANCING
        attribute mat4 instanceMatrix;
    #endif
    #ifdef USE_INSTANCING_COLOR
        attribute vec3 instanceColor;
    #endif
    #ifdef USE_INSTANCING_MORPH
        uniform sampler2D morphTexture;
    #endif
    #ifdef USE_UV1
        attribute vec2 uv1;
    #endif
    #ifdef USE_UV2
        attribute vec2 uv2;
    #endif
    #ifdef USE_UV3
        attribute vec2 uv3;
    #endif
    #ifdef USE_TANGENT
        attribute vec4 tangent;
    #endif
    #if defined( USE_COLOR_ALPHA )
        attribute vec4 color;
        #elif defined( USE_COLOR )
        attribute vec3 color;
    #endif
    #ifdef USE_SKINNING
        attribute vec4 skinIndex;
        attribute vec4 skinWeight;
    #endif


    attribute vec2 particlesUVArray;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec4 vWorldPosition;
    varying vec4 vVelocity;
    varying vec4 vVectorField;
    varying float vDistanceToCamera;
    uniform sampler2D uPositions;
    uniform sampler2D uVelocity;
    uniform sampler2D uVectorField;
    uniform vec2 uScale;
    uniform float uPointSize;
    void main() {
        vUv = uv;
        vec4 vectorField = texture(uVectorField, particlesUVArray);
        vec4 velocity = texture(uVelocity, particlesUVArray);
        vec4 updatedPosition = texture(uPositions, particlesUVArray);
        updatedPosition.xy *= uScale;
        vec4 worldUpdatedPosition = modelViewMatrix * vec4(updatedPosition.xyz, 1.0);
        vWorldPosition = worldUpdatedPosition;
        vPosition = updatedPosition.xyz;
        vVelocity = velocity;
        vVectorField = vectorField;
        gl_Position = projectionMatrix * worldUpdatedPosition;
        // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        
        gl_PointSize = uPointSize;
    }

`;

// checked - first draw
const simFragment = `
    #define varying in
    layout(location = 0) out highp vec4 pc_fragColor;
    #define gl_FragDepthEXT gl_FragDepth
    #define texture2D texture
    #define textureCube texture
    #define texture2DProj textureProj
    #define texture2DLodEXT textureLod
    #define texture2DProjLodEXT textureProjLod
    #define textureCubeLodEXT textureLod
    #define texture2DGradEXT textureGrad
    #define texture2DProjGradEXT textureProjGrad
    #define textureCubeGradEXT textureGrad
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    precision highp samplerCube;
    precision highp sampler3D;
    precision highp sampler2DArray;
    precision highp sampler2DShadow;
    precision highp samplerCubeShadow;
    precision highp sampler2DArrayShadow;
    precision highp isampler2D;
    precision highp isampler3D;
    precision highp isamplerCube;
    precision highp isampler2DArray;
    precision highp usampler2D;
    precision highp usampler3D;
    precision highp usamplerCube;
    precision highp usampler2DArray;
    #define HIGH_PRECISION
    #define SHADER_TYPE ShaderMaterial
    #define SHADER_NAME 
    #define DOUBLE_SIDED
    vec4 LinearTransferOETF( in vec4 value ) {
        return value;
    }
    vec4 sRGBTransferEOTF( in vec4 value ) {
        return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
    }
    vec4 sRGBTransferOETF( in vec4 value ) {
        return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
    }
    vec4 linearToOutputTexel( vec4 value ) {
        return LinearTransferOETF( vec4( value.rgb * mat3( 1.0000, -0.0000, -0.0000, -0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 1.0000 ), value.a ) );
    }
    float luminance( const in vec3 rgb ) {
        const vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
        return dot( weights, rgb );
    }
    varying vec2 vUv;
    varying vec4 vWorldPosition;
    varying vec3 vPosition;
    varying vec4 vVelocity;
    varying vec4 vVectorField;
    uniform vec3 uBaseColor;
    uniform vec3 uAccentColor;
    void main() {
        vec4 color = vec4(uBaseColor, 1.);
        vec4 accentColor = vec4(uAccentColor, 1.);
        float threshold = 0.5;
        float distanceToCenter = length(gl_PointCoord - threshold);
        float time = vVectorField.w;
        float sqSpeed = dot(vVelocity.xyz, vVelocity.xyz);
        float dist = dot(vWorldPosition.xyz, vWorldPosition.xyz);
        float glow = 10. * exp(-dist * 0.0000001);
        if(sqSpeed > 0.01 && distanceToCenter > threshold) {
            discard;
        }
        color.rgb += 0.1 * accentColor.rgb * glow * smoothstep(0., .005, sqSpeed);
        color.a += 0.25 *  glow * smoothstep(0., .005, sqSpeed);
        color.a *= smoothstep(0., 1.75, pow(time, 2.)); // Opacity in
        
        color.a *= 1. - 0.5 * vVelocity.w; // Fake some blur in morph
        
        
        gl_FragColor = color;
    }

`;

// checked - second draw
const vertex = `
    #version 300 es

    #define attribute in
    #define varying out
    #define texture2D texture
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    precision highp samplerCube;
    precision highp sampler3D;
    precision highp sampler2DArray;
    precision highp sampler2DShadow;
    precision highp samplerCubeShadow;
    precision highp sampler2DArrayShadow;
    precision highp isampler2D;
    precision highp isampler3D;
    precision highp isamplerCube;
    precision highp isampler2DArray;
    precision highp usampler2D;
    precision highp usampler3D;
    precision highp usamplerCube;
    precision highp usampler2DArray;
    #define HIGH_PRECISION
    #define SHADER_TYPE ShaderMaterial
    #define SHADER_NAME CopyMaterial
    #define FRAMEBUFFER_PRECISION_HIGH 1
    uniform mat4 modelMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat3 normalMatrix;
    uniform vec3 cameraPosition;
    uniform bool isOrthographic;
    #ifdef USE_INSTANCING
        attribute mat4 instanceMatrix;
    #endif
    #ifdef USE_INSTANCING_COLOR
        attribute vec3 instanceColor;
    #endif
    #ifdef USE_INSTANCING_MORPH
        uniform sampler2D morphTexture;
    #endif
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    #ifdef USE_UV1
        attribute vec2 uv1;
    #endif
    #ifdef USE_UV2
        attribute vec2 uv2;
    #endif
    #ifdef USE_UV3
        attribute vec2 uv3;
    #endif
    #ifdef USE_TANGENT
        attribute vec4 tangent;
    #endif
    #if defined( USE_COLOR_ALPHA )
        attribute vec4 color;
        #elif defined( USE_COLOR )
        attribute vec3 color;
    #endif
    #ifdef USE_SKINNING
        attribute vec4 skinIndex;
        attribute vec4 skinWeight;
    #endif

    varying vec2 vUv;
    void main() {
        vUv = position.xy*0.5+0.5;
        gl_Position = vec4(position.xy, 1.0, 1.0);
    }

`;

// checked - second draw
const fragment = `
#version 300 es
#define varying in
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
#define gl_FragDepthEXT gl_FragDepth
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;
precision highp sampler3D;
precision highp sampler2DArray;
precision highp sampler2DShadow;
precision highp samplerCubeShadow;
precision highp sampler2DArrayShadow;
precision highp isampler2D;
precision highp isampler3D;
precision highp isamplerCube;
precision highp isampler2DArray;
precision highp usampler2D;
precision highp usampler3D;
precision highp usamplerCube;
precision highp usampler2DArray;
#define HIGH_PRECISION
#define SHADER_TYPE ShaderMaterial
#define SHADER_NAME CopyMaterial
#define FRAMEBUFFER_PRECISION_HIGH 1
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
vec4 LinearTransferOETF( in vec4 value ) {
    return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
    return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
    return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 linearToOutputTexel( vec4 value ) {
    return LinearTransferOETF( vec4( value.rgb * mat3( 1.0000, -0.0000, -0.0000, -0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 1.0000 ), value.a ) );
}
float luminance( const in vec3 rgb ) {
    const vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, rgb );
}
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
    #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) {
    return x*x;
}
vec3 pow2( const in vec3 x ) {
    return x*x;
}
float pow3( const in float x ) {
    return x*x*x;
}
float pow4( const in float x ) {
    float x2 = x*x;
    return x2*x2;
}
float max3( const in vec3 v ) {
    return max( max( v.x, v.y ), v.z );
}
float average( const in vec3 v ) {
    return dot( v, vec3( 0.3333333 ) );
}
highp float rand( const in vec2 uv ) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot( uv.xy, vec2( a, b ) ), sn = mod( dt, PI );
    return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
    float precisionSafeLength( vec3 v ) {
        return length( v );
    }
#else
    float precisionSafeLength( vec3 v ) {
        float maxComponent = max3( abs( v ) );
        return length( v / maxComponent ) * maxComponent;
    }
#endif
struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};
struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
    varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
    mat3 tmp;
    tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
    tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
    tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
    return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
    return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
    float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
    float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
    return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
    return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
    float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
    return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
    float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
    return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
// validated
#ifdef DITHERING
    vec3 dithering( vec3 color ) {
        float grid_position = rand( gl_FragCoord.xy );
        vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
        dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
        return color + dither_shift_RGB;
    }
#endif
#ifdef FRAMEBUFFER_PRECISION_HIGH
    uniform mediump sampler2D inputBuffer;
#else
    uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;
varying vec2 vUv;
void main() {
    vec4 texel = texture2D(inputBuffer, vUv);
    gl_FragColor = opacity*texel;
    gl_FragColor = linearToOutputTexel( gl_FragColor );
    #ifdef DITHERING
        gl_FragColor.rgb = dithering( gl_FragColor.rgb );
    #endif
}

`;

const vertex2 = `
#define SHADER_TYPE RawShaderMaterial
#define SHADER_NAME 
precision highp float;
varying float vMorphImpulse;
varying float vIntroModulation;
varying float vPointerSpeedModulation;
varying vec2 vUv;
uniform sampler2D uDefaultPositionOne;
uniform vec3 uPointer;
uniform float uMorphTime;
uniform float uGlobalTime;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec2 uv;


// https://www.desmos.com/calculator/4dyq5zch4v

#define PI 3.1415926

float heaviside(float x) {
    return (sign(x) + 1.0) / 2.0;
}
float chichon(float x, float stepness) {
    return 1.0 - pow(abs(sin(0.5 * PI * x)), stepness);
}
float impulseModulation(float time, float center, float scale, float stepness) {
    float scaledCenter = center * scale;
    float x = time * scale;
    float wave = heaviside(1. - (x - scaledCenter)) * chichon(x -scaledCenter, stepness) * heaviside(x - scaledCenter + 1.);
    return wave;
}
void main () {
    vUv = uv;
    
    // time modulation has big impact in output
    
    vIntroModulation = impulseModulation(uGlobalTime, 1.5, .8, 5.);
    vMorphImpulse = impulseModulation(uMorphTime, 0., .9, 10.);
    vPointerSpeedModulation = 5. * (1. - pow(1. - uPointer.z, 12.)) *  impulseModulation(uPointer.z, 1.4, .7, 12.);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`;

const fragment2 = `
#define SHADER_TYPE RawShaderMaterial
#define SHADER_NAME 
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying float vMorphImpulse;
varying float vIntroModulation;
varying float vPointerSpeedModulation;
uniform sampler2D uVectorField;
uniform sampler2D uPositionField;
uniform vec3 uPointer;
uniform float uGlobalTime;
uniform float uDeltaTime;


//	Simplex 4D Noise

//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}
float permute(float x) {
    return floor(mod(((x*34.0)+1.0)*x, 289.0));
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
float taylorInvSqrt(float r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec4 grad4(float j, vec4 ip) {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p, s;
    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
    return p;
}
float simplexNoise4d(vec4 v) {
    const vec2  C = vec2( 0.138196601125010504, // (5 - sqrt(5))/20  G4
    0.309016994374947451); // (sqrt(5) - 1)/4   F4
    
    // First corner
    vec4 i = floor(v + dot(v, C.yyyy) );
    vec4 x0 = v -   i + dot(i, C.xxxx);
    
    // Other corners
    
    
    // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    //  i0.x = dot( isX, vec3( 1.0 ) );
    
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    
    //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
    
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;
    
    // i0 now contains the unique values 0, 1, 2, 3 in each channel
    
    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );
    
    //  x0 = x0 - 0.0 + 0.0 * C
    
    vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
    vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
    vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
    vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;
    
    // Permutations
    
    i = mod(i, 289.0);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
    i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
    + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
    + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
    + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
    // Gradients
    
    // ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
    // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
    
    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
    vec4 p0 = grad4(j0, ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);
    
    // Normalise gradients
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4, p4));
    
    // Mix contributions from the five corners
    
    vec3 m0 = max(0.6 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
    vec2 m1 = max(0.6 - vec2(dot(x3, x3), dot(x4, x4)            ), 0.0);
    m0 = m0 * m0;
    m1 = m1 * m1;
    return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
    + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}
vec3 curlNoise(vec3 position, float scale) {
    // Derivatives of the noise function
    float eps = 1e-3;
    vec3 epsX = vec3(eps, 0., 0.);
    vec3 epsY = vec3(0., eps, 0.);
    vec3 epsZ = vec3(0., 0., eps);
    float dX = simplexNoise4d(vec4(position.xyz * scale + epsX, uGlobalTime)) - simplexNoise4d(vec4(position.xyz * scale - epsX, uGlobalTime));
    float dY = simplexNoise4d(vec4(position.xyz * scale + epsY, uGlobalTime)) - simplexNoise4d(vec4(position.xyz * scale - epsY, uGlobalTime));
    float dZ = simplexNoise4d(vec4(position.xyz * scale + epsZ, uGlobalTime)) - simplexNoise4d(vec4(position.xyz * scale - epsZ, uGlobalTime));
    return vec3(dY, -dX, -dZ);
}
// Big Eddies Vortex Perpendicular to direction for rotation in XY plane
vec3 vorticyAroundZ(vec3 targetPositions, vec3 center, float  xyStrength) {
    vec3 distTocenter = targetPositions - center;
    float distSQ = dot(distTocenter.xyz, distTocenter.xyz);
    vec3 direction = normalize(distTocenter.xyz);
    float verticalStrength = -100.;
    // CW rotation
    
    vec3 normalXYPlane = vec3(-direction.y * xyStrength, direction.x * xyStrength, verticalStrength * direction.z );
    
    // // CCW rotation
    
    // if(uPointer.y > 0.) {
    //   normalXYPlane.xy *= -1.;
    // }
    
    return vec3(normalXYPlane) * 1. / distSQ;
}
vec3 turbulence(vec3 position, float scale) {
    float time = uGlobalTime * 0.01;
    float noiseX = simplexNoise4d(vec4(position.xyz * scale, time));
    float noiseY = simplexNoise4d(vec4(position.xyz * scale + 10., time));
    float noiseZ = simplexNoise4d(vec4(position.xyz * scale + 20., time));
    return vec3(noiseX, noiseY, noiseZ);
}
uniform sampler2D uDefaultPositionOne;
uniform sampler2D uDefaultPositionTwo;
uniform float uMorphState;
vec4 getCurrentTarget( float morphState) {
    vec4 defaultPositionOne = texture2D(uDefaultPositionOne, vUv);
    vec4 defaultPositionTwo = texture2D(uDefaultPositionTwo, vUv);
    vec4 targetPositions = mix(defaultPositionOne, defaultPositionTwo, morphState);
    return targetPositions;
}
vec3 morphField(vec3 positionField, float maxStrength) {
    vec3 field = vec3(0.);
    field += .2 * turbulence(positionField.xyz, 0.007);
    field += 5. * curlNoise(positionField.xyz, .01);
    float fieldStrength = dot(field, field);
    field /= fieldStrength;
    fieldStrength = min(fieldStrength, maxStrength);
    field *= fieldStrength;
    return field;
}
vec3 hoverField(vec3 positionField, float maxStrength) {
    vec3 field = vec3(0.);
    float vortexRadio = 100. + step(0.5, uMorphState) * 300.;
    field += .25 * turbulence(positionField.xyz, 0.001);
    field += 10. * vorticyAroundZ(positionField.xyz, vec3(uPointer.xy, 0.), vortexRadio * 1.5 * (1. - pow(1. - uPointer.z, 15.)) );
    float fieldStrength = dot(field, field);
    field /= fieldStrength;
    fieldStrength = min(fieldStrength, maxStrength);
    field *= fieldStrength;
    return field;
}
vec3 introField(vec3 positionField) {
    vec3 field = normalize(positionField) * -.1; // Divergence
    
    field += .075 * turbulence(positionField.xyz, 0.07);
    field += 30. * curlNoise(positionField.xyz, .005);
    field *= .5;
    return field;
}
float distanceModulation(vec3 positionField) {
    vec2 distanceVector = uPointer.xy - positionField.xy;
    return exp(- dot(distanceVector, distanceVector) * .0001);
}
void main () {
    vec4 defaultPositionOne = texture2D(uDefaultPositionOne, vUv);
    vec4 positionField = texture2D(uPositionField, vUv);
    vec4 vectorField = texture2D(uVectorField, vUv);
    vec3 field = vec3(0.);
    float dt = 100.0 * uDeltaTime;
    float dampingFactor = .05;
    float inverseMass = defaultPositionOne.w;
    float dist = distanceModulation(positionField.xyz);
    field += inverseMass * vPointerSpeedModulation * dist * (morphField(positionField.xyz, 5.) + hoverField(positionField.xyz, 15.));
    field += morphField(positionField.xyz, 5.) * vMorphImpulse;
    // Set hover and morph fields to 0 when intro
    
    field *= smoothstep(2.25, 2.75, uGlobalTime);
    
    //Avoid computing intro field after intro is over
    
    if(uGlobalTime < 5.) {
        field += introField(positionField.xyz) * vIntroModulation;
    }
    field += -1. * dampingFactor * vectorField.xyz;
    vectorField.xyz += dt * field.xyz;
    vectorField.w = uGlobalTime;
    gl_FragColor = vectorField;
}

`;

const introFragment = `
#define SHADER_TYPE RawShaderMaterial
#define SHADER_NAME 
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying float vMorphImpulse;
varying float vIntroModulation;
varying float vPointerSpeedModulation;
uniform sampler2D uVectorField;
uniform sampler2D uPositionField;
uniform vec3 uPointer;
uniform float uGlobalTime;
uniform float uDeltaTime;


//	Simplex 4D Noise

//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}
float permute(float x) {
    return floor(mod(((x*34.0)+1.0)*x, 289.0));
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
float taylorInvSqrt(float r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec4 grad4(float j, vec4 ip) {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p, s;
    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
    return p;
}
float simplexNoise4d(vec4 v) {
    const vec2  C = vec2( 0.138196601125010504, // (5 - sqrt(5))/20  G4
    0.309016994374947451); // (sqrt(5) - 1)/4   F4
    
    // First corner
    vec4 i = floor(v + dot(v, C.yyyy) );
    vec4 x0 = v -   i + dot(i, C.xxxx);
    
    // Other corners
    
    
    // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    //  i0.x = dot( isX, vec3( 1.0 ) );
    
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    
    //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
    
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;
    
    // i0 now contains the unique values 0, 1, 2, 3 in each channel
    
    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );
    
    //  x0 = x0 - 0.0 + 0.0 * C
    
    vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
    vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
    vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
    vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;
    
    // Permutations
    
    i = mod(i, 289.0);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
    i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
    + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
    + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
    + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
    // Gradients
    
    // ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
    // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
    
    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
    vec4 p0 = grad4(j0, ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);
    
    // Normalise gradients
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4, p4));
    
    // Mix contributions from the five corners
    
    vec3 m0 = max(0.6 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
    vec2 m1 = max(0.6 - vec2(dot(x3, x3), dot(x4, x4)            ), 0.0);
    m0 = m0 * m0;
    m1 = m1 * m1;
    return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
    + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}
vec3 curlNoise(vec3 position, float scale) {
    // Derivatives of the noise function
    float eps = 1e-3;
    vec3 epsX = vec3(eps, 0., 0.);
    vec3 epsY = vec3(0., eps, 0.);
    vec3 epsZ = vec3(0., 0., eps);
    float dX = simplexNoise4d(vec4(position.xyz * scale + epsX, uGlobalTime)) - simplexNoise4d(vec4(position.xyz * scale - epsX, uGlobalTime));
    float dY = simplexNoise4d(vec4(position.xyz * scale + epsY, uGlobalTime)) - simplexNoise4d(vec4(position.xyz * scale - epsY, uGlobalTime));
    float dZ = simplexNoise4d(vec4(position.xyz * scale + epsZ, uGlobalTime)) - simplexNoise4d(vec4(position.xyz * scale - epsZ, uGlobalTime));
    return vec3(dY, -dX, -dZ);
}
// Big Eddies Vortex Perpendicular to direction for rotation in XY plane
vec3 vorticyAroundZ(vec3 targetPositions, vec3 center, float  xyStrength) {
    vec3 distTocenter = targetPositions - center;
    float distSQ = dot(distTocenter.xyz, distTocenter.xyz);
    vec3 direction = normalize(distTocenter.xyz);
    float verticalStrength = -100.;
    // CW rotation
    
    vec3 normalXYPlane = vec3(-direction.y * xyStrength, direction.x * xyStrength, verticalStrength * direction.z );
    
    // // CCW rotation
    
    // if(uPointer.y > 0.) {
    //   normalXYPlane.xy *= -1.;
    // }
    
    return vec3(normalXYPlane) * 1. / distSQ;
}
vec3 turbulence(vec3 position, float scale) {
    float time = uGlobalTime * 0.01;
    float noiseX = simplexNoise4d(vec4(position.xyz * scale, time));
    float noiseY = simplexNoise4d(vec4(position.xyz * scale + 10., time));
    float noiseZ = simplexNoise4d(vec4(position.xyz * scale + 20., time));
    return vec3(noiseX, noiseY, noiseZ);
}
uniform sampler2D uDefaultPositionOne;
uniform sampler2D uDefaultPositionTwo;
uniform float uMorphState;
vec4 getCurrentTarget( float morphState) {
    vec4 defaultPositionOne = texture2D(uDefaultPositionOne, vUv);
    vec4 defaultPositionTwo = texture2D(uDefaultPositionTwo, vUv);
    vec4 targetPositions = mix(defaultPositionOne, defaultPositionTwo, morphState);
    return targetPositions;
}
vec3 morphField(vec3 positionField, float maxStrength) {
    vec3 field = vec3(0.);
    field += .2 * turbulence(positionField.xyz, 0.007);
    field += 5. * curlNoise(positionField.xyz, .01);
    float fieldStrength = dot(field, field);
    field /= fieldStrength;
    fieldStrength = min(fieldStrength, maxStrength);
    field *= fieldStrength;
    return field;
}
vec3 hoverField(vec3 positionField, float maxStrength) {
    vec3 field = vec3(0.);
    float vortexRadio = 100. + step(0.5, uMorphState) * 300.;
    field += .25 * turbulence(positionField.xyz, 0.001);
    field += 10. * vorticyAroundZ(positionField.xyz, vec3(uPointer.xy, 0.), vortexRadio * 1.5 * (1. - pow(1. - uPointer.z, 15.)) );
    float fieldStrength = dot(field, field);
    field /= fieldStrength;
    fieldStrength = min(fieldStrength, maxStrength);
    field *= fieldStrength;
    return field;
}
vec3 introField(vec3 positionField) {
    vec3 field = normalize(positionField) * -.1; // Divergence
    
    field += .075 * turbulence(positionField.xyz, 0.07);
    field += 30. * curlNoise(positionField.xyz, .005);
    field *= .5;
    return field;
}
float distanceModulation(vec3 positionField) {
    vec2 distanceVector = uPointer.xy - positionField.xy;
    return exp(- dot(distanceVector, distanceVector) * .0001);
}
void main () {
    vec4 defaultPositionOne = texture2D(uDefaultPositionOne, vUv);
    vec4 positionField = texture2D(uPositionField, vUv);
    vec4 vectorField = texture2D(uVectorField, vUv);
    vec3 field = vec3(0.);
    float dt = 100.0 * uDeltaTime;
    float dampingFactor = .05;
    float inverseMass = defaultPositionOne.w;
    float dist = distanceModulation(positionField.xyz);
    field += inverseMass * vPointerSpeedModulation * dist * (morphField(positionField.xyz, 5.) + hoverField(positionField.xyz, 15.));
    field += morphField(positionField.xyz, 5.) * vMorphImpulse;
    // Set hover and morph fields to 0 when intro
    
    field *= smoothstep(2.25, 2.75, uGlobalTime);
    
    //Avoid computing intro field after intro is over
    
    if(uGlobalTime < 5.) {
        field += introField(positionField.xyz) * vIntroModulation;
    }
    field += -1. * dampingFactor * vectorField.xyz;
    vectorField.xyz += dt * field.xyz;
    vectorField.w = uGlobalTime;
    gl_FragColor = vectorField;
}

`;

const introVertex = `
#define SHADER_TYPE RawShaderMaterial
#define SHADER_NAME 
precision highp float;
varying float vMorphImpulse;
varying float vIntroModulation;
varying float vPointerSpeedModulation;
varying vec2 vUv;
uniform sampler2D uDefaultPositionOne;
uniform vec3 uPointer;
uniform float uMorphTime;
uniform float uGlobalTime;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec2 uv;


// https://www.desmos.com/calculator/4dyq5zch4v

#define PI 3.1415926

float heaviside(float x) {
    return (sign(x) + 1.0) / 2.0;
}
float chichon(float x, float stepness) {
    return 1.0 - pow(abs(sin(0.5 * PI * x)), stepness);
}
float impulseModulation(float time, float center, float scale, float stepness) {
    float scaledCenter = center * scale;
    float x = time * scale;
    float wave = heaviside(1. - (x - scaledCenter)) * chichon(x -scaledCenter, stepness) * heaviside(x - scaledCenter + 1.);
    return wave;
}
void main () {
    vUv = uv;
    
    // time modulation has big impact in output
    
    vIntroModulation = impulseModulation(uGlobalTime, 1.5, .8, 5.);
    vMorphImpulse = impulseModulation(uMorphTime, 0., .9, 10.);
    vPointerSpeedModulation = 5. * (1. - pow(1. - uPointer.z, 12.)) *  impulseModulation(uPointer.z, 1.4, .7, 12.);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`;

export {
  vertexParticles,
  simFragment,
  vertex,
  vertex2,
  fragment2,
  introFragment,
  introVertex,
  fragment,
};
