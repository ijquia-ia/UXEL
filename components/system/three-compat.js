// @react-three/fiber 8.2 still reads this legacy Three.js constant at runtime.
// Three r185 removed it, so we expose the equivalent legacy value while keeping
// all modern Three.js exports intact.
export * from '../../node_modules/three/build/three.module.js'
export const LinearEncoding = 3000
export const sRGBEncoding = 3001
