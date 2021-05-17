const path = require('path');
const fs = require('fs');

// const tf = require('@tensorflow/tfjs-node-gpu'); // GPU CUDA
const tf = require('@tensorflow/tfjs-node'); // CPU
const Upscaler = require('upscaler').default;

// const upscaleImageToUInt8Array = async (filename, upscaler, progress) => {
//   const file = fs.readFileSync(filename)
//   const image = tf.node.decodeImage(file, 3)
//   const options = { output: 'tensor', patchSize: 64, padding: 6, progress }
//   const tensor = await upscaler.upscale(image, options)
//   const upscaledImage = await tf.node.encodePng(tensor)
//   return upscaledImage
// }

const file = fs.readFileSync('./tmp/allodsbight-squarified.png');
const image = tf.node.decodeImage(file, 3);

const upscaler = new Upscaler();
upscaler.upscale(image).then(function(upscaledImgSrc)
{
  console.log("oui !!");
  // console.log(img);
});