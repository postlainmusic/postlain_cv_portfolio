/**
 * DATA-DRIVEN MATERIAL PROFILES
 * Governs friction, viscosity, temperature, drag, and typography interaction
 */

export interface MaterialProfile {
  name: string;
  friction: number;
  drag: number;
  viscosity: number;
  turbulence: number;
  gravity: number;
  elasticity: number;
  dissipation: number;
  interactionStrength: number;
  baseColor: string;
  accentColor: string;
}

export const MATERIAL_PROFILES: Record<string, MaterialProfile> = {
  desert: {
    name: 'Desert Mineral Bed',
    friction: 0.88,
    drag: 0.15,
    viscosity: 0.05,
    turbulence: 0.12,
    gravity: 0.0,
    elasticity: 0.1,
    dissipation: 0.92,
    interactionStrength: 1.0,
    baseColor: '#e8e5dc',
    accentColor: '#cf4525',
  },
  volcano: {
    name: 'Molten Magma Plume',
    friction: 0.35,
    drag: 0.08,
    viscosity: 0.85,
    turbulence: 0.75,
    gravity: -0.25, // Buoyancy upward
    elasticity: 0.55,
    dissipation: 0.96,
    interactionStrength: 1.8,
    baseColor: '#10110f',
    accentColor: '#cf4525',
  },
  waterfall: {
    name: 'Deep Mineral Waterfall',
    friction: 0.05,
    drag: 0.04,
    viscosity: 0.15,
    turbulence: 0.65,
    gravity: 0.45, // Torrent downward
    elasticity: 0.4,
    dissipation: 0.965,
    interactionStrength: 1.5,
    baseColor: '#101820',
    accentColor: '#7890a3',
  },
  forest: {
    name: 'Ancient Weathered Bark',
    friction: 0.65,
    drag: 0.3,
    viscosity: 0.6,
    turbulence: 0.25,
    gravity: 0.0,
    elasticity: 0.15,
    dissipation: 0.88,
    interactionStrength: 0.9,
    baseColor: '#121814',
    accentColor: '#c8b48c',
  },
  storm: {
    name: 'Kinetic Wind Vortex',
    friction: 0.02,
    drag: 0.92,
    viscosity: 0.01,
    turbulence: 1.0,
    gravity: 0.15,
    elasticity: 0.8,
    dissipation: 0.98,
    interactionStrength: 2.2,
    baseColor: '#0a0d10',
    accentColor: '#8a9ba8',
  },
  moon: {
    name: 'Celestial Starlight Expanse',
    friction: 0.95,
    drag: 0.02,
    viscosity: 0.0,
    turbulence: 0.05,
    gravity: 0.0,
    elasticity: 0.9,
    dissipation: 0.85,
    interactionStrength: 1.2,
    baseColor: '#080a0f',
    accentColor: '#e0e6ed',
  },
};
