/**
 * THREE.JS PARTICLE TEXTURE UTILITY
 * Generates soft radial glow circular textures to ensure particles render as
 * luminous celestial orbs and embers instead of harsh square pixels.
 */

import * as THREE from 'three';

const textureCache: { [key: string]: THREE.Texture } = {};

export function createSoftGlowTexture(colorHex: string = '#ffffff'): THREE.Texture {
  if (textureCache[colorHex]) {
    return textureCache[colorHex];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0.0, colorHex);
    gradient.addColorStop(0.25, colorHex);
    gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.45)');
    gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.premultiplyAlpha = false;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache[colorHex] = texture;
  return texture;
}
