# 3D model assets

The MVP now loads real glTF assets from this directory.

## Cheomseongdae

- Source zip: `public/models/cheomseongdae.zip` (ignored by git and Vercel)
- Runtime path: `public/models/optimized/cheomseongdae.glb`
- License copy: `public/models/licenses/cheomseongdae-license.txt`
- Source: https://sketchfab.com/3d-models/cheomseongdae-observatory-d601340170384b0d8e3b40aa0c829a8f
- Author: lacomi1975
- License: CC-BY-4.0

## Woljeonggyo Pier

- Source zip: `public/models/chunyanggyo_pier.zip` (ignored by git and Vercel)
- Runtime path: `public/models/optimized/woljeonggyo-pier.glb`
- License copy: `public/models/licenses/woljeonggyo-pier-license.txt`
- Source: https://sketchfab.com/3d-models/woljeonggyo-pier-chunyanggyo-woljeonggyo-01cd4113bb2449b9a4b4e0d57ae4013f
- Author: KOREA HERITAGE SERVICE [KHS]
- License: CC-BY-4.0

## Optimization

- Cheomseongdae: `45.34 MB` original glTF/bin -> `13.90 MB` optimized GLB
- Woljeonggyo Pier: `76.74 MB` original glTF/bin/textures -> `2.80 MB` optimized GLB
- Method: glTF Transform `optimize`, quantization, simplification, WebP texture compression for textured assets.

The original `.zip` files are not needed at runtime and are ignored by git/Vercel.
