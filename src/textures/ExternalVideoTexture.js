import { VideoTexture } from './VideoTexture.js';

/**
 * A texture that uses an {@link HTMLVideoElement} as an external source.
 *
 * This class enables zero-copy sampling of a video stream through the
 * renderer's external texture mechanism.
 *
 * ```js
 * // assuming you have created a HTML video element with id="video"
 * const video = document.getElementById( 'video' );
 * const texture = new THREE.ExternalVideoTexture( video );
 * // For WebGPU, typical sRGB video:
 * texture.colorSpace = THREE.SRGBColorSpace;
 * ```
 *
 * Notes:
 * - **Supported only in the {@link WebGPURenderer} WebGPU backend.** Not supported in {@link WebGLRenderer}.
 * - With {@link WebGPURenderer}, the video is bound as a WGSL `texture_external`:
 *   no mipmaps, addressing behaves as clamp-to-edge, and only base-level sampling is allowed.
 * - The external binding may be valid only for the current frame; the renderer will re-bind it as needed.
 * - After the initial use of a texture, its dimensions, format, and type cannot be changed.
 *   Instead, call {@link Texture#dispose} and instantiate a new one.
 *
 * @augments VideoTexture
 */
class ExternalVideoTexture extends VideoTexture {

	constructor( video = null ) {

		super( video );

		/**
		 * Marks this texture as an external texture so renderer routes it to importExternalTexture.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isExternalTexture = true;

	}

}

export { ExternalVideoTexture };
