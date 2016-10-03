/**
 * @author mrdoob / http://www.mrdoob.com
 */

GPGPU.SimulationShader = function () {

	var material = new THREE.ShaderMaterial( {

		uniforms: {
			tPositions: { type: "t", value: null },
			tOrigins: { type: "t", value: null },
			intensity: { type: "f", value: 0 },
			timer: { type: "f", value: 0 }
		},
		vertexShader: [

			'varying vec2 vUv;',

			'void main() {',
			'	vUv = vec2( uv.x, 1.0 - uv.y );',
			'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
			'}'

		].join( '\n' ),
		fragmentShader: [

			'uniform float intensity;',

			'uniform sampler2D tPositions;',
			'uniform sampler2D tOrigins;',

			'uniform float timer;',

			'varying vec2 vUv;',

			/*
			'float rand(vec2 co){',
			'    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);',
			'}',
			*/

			'void main() {',

			'	vec4 pos = texture2D( tPositions, vUv );',
			'	vec4 sample = texture2D( tOrigins, vUv );',

			'	if ( pos.w <= 0.0 ) {',

			'		pos.xyz = sample.xyz;',
			'		pos.w = sample.w;',

			'	} else {',

			'		float x = pos.x + timer * 5.0;',
			'		float y = pos.y;',
			'		float z = pos.z + timer * 4.0;',

			'		float amount = 0.2;',

			'		pos.x += sin( y * 0.133 ) * cos( z * 0.037 ) * amount;',
			'		pos.y += sin( x * 0.135 ) * cos( x * 0.035 ) * amount;',
			'		pos.z += sin( x * 0.137 ) * cos( y * 0.033 ) * amount * 2.0;',
			'		pos.w -= 0.005;',

			'	}',

			'	gl_FragColor = pos;',

			'}',

		].join( '\n' )

	} );

	return {

		material: material,

		setPositionsTexture: function ( texture ) {

			material.uniforms.tPositions.value = texture;

			return this;

		},

		setOriginsTexture: function ( texture ) {

			material.uniforms.tOrigins.value = texture;

			return this;

		},

		setIntensity: function ( value ) {

			material.uniforms.intensity.value = value;

			return this;

		},

		setTimer: function ( timer ) {

			material.uniforms.timer.value = timer;

			return this;

		}

	};

};
