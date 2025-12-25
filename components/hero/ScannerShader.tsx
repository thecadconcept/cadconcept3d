import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

export const ScannerShader = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.1, 0.1, 0.1), // Dark Metal (Physical)
        uScanColor: new THREE.Color(0.0, 1.0, 1.0), // Cyan (Laser)
        uWireframeColor: new THREE.Color(0.0, 1.0, 0.5), // Teal (Wireframe)
        uCadColor: new THREE.Color(0.95, 0.98, 1.0), // White/Blue (CAD)
        uScanPos: 5.0, // Scan line Y-position
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uScanColor;
    uniform vec3 uWireframeColor;
    uniform vec3 uCadColor;
    uniform float uScanPos;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    // Grid Utility
    float grid(vec2 uv, float width) {
      vec2 grid = fract(uv);
      return (step(width, grid.x) * step(width, grid.y));
    }

    void main() {
    
      // --- Lighting ---
      vec3 lightDir = normalize(vec3(5.0, 5.0, 5.0));
      float diff = max(dot(vNormal, lightDir), 0.0);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
      
      // --- Scan Logic ---
      // We assume scan moves Top -> Bottom (5.0 -> -5.0)
      // Points > uScanPos are UNSCANNED (Physical)
      // Points < uScanPos are SCANNED (Digital)
      
      float distToScan = vPosition.y - uScanPos;
      
      // 1. Physical Look
      vec3 physicalLook = uColor * (diff * 0.8 + 0.2) + vec3(0.5) * fresnel * 0.3;
      
      // 2. Wireframe Look
      // Use UVs for grid
      float wireGrid = 1.0 - grid(vUv * 60.0, 0.05); // High density
      vec3 wireframeLook = mix(vec3(0.0), uWireframeColor, wireGrid);
      wireframeLook += uWireframeColor * 0.1; // Ambient glow
      
      // 3. CAD Look
      vec3 cadLook = uCadColor * (diff * 0.7 + 0.6); // Clean, bright
      // Subtle CAD grid
      float cadGrid = 1.0 - grid(vUv * 20.0, 0.02);
      cadLook = mix(cadLook, cadLook * 0.9, cadGrid);
      
      // 4. Scan Line
      float scanWidth = 0.15;
      float scanIntensity = smoothstep(scanWidth, 0.0, abs(distToScan));
      // Add digital noise
      scanIntensity += sin(vPosition.y * 100.0 + uTime * 20.0) * 0.3 * scanIntensity;
      
      // --- Mixing ---
      vec3 finalColor = physicalLook;
      
      if (distToScan < 0.0) {
        // SCANNED REGION (Transition: Wireframe -> CAD)
        // Transition based on distance from scan line
        // 0.0 to 1.5 units away changes from Wireframe to CAD
        
        float transition = smoothstep(0.0, 1.8, abs(distToScan));
        finalColor = mix(wireframeLook, cadLook, transition);
        
      } else {
        // UNSCANNED REGION
        finalColor = physicalLook;
      }
      
      // Add Scan Line (Additive)
      finalColor += uScanColor * scanIntensity * 2.0;
      
      gl_FragColor = vec4(finalColor, 1.0);
      
      // Simple Tone Mapping
      gl_FragColor.rgb = gl_FragColor.rgb / (gl_FragColor.rgb + vec3(1.0));
      gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0/2.2));
    }
  `
)

extend({ ScannerShader })
