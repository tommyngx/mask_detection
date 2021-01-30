# Wearing Mask Detection Project by Tensorflow Js

## Original Link: [FaceMaskDetection](https://github.com/AIZOOTech/FaceMaskDetection)

Special thank to AIZOOTech for great sourcecode & sharing.

Let's have fun at https://tommy-ngx.github.io/mask_detection/index.html

## Principle
This demo is a web demo of face mask detection running in the browser, and it introduces how to deploy the face mask detection model of deep learning to the browser.
For PyTorch, TensorFlow, Caffe, Keras, MXNet versions of face mask detection, you can enter the corresponding Github warehouse
[FaceMaskDetection](https://github.com/AIZOOTech/FaceMaskDetection)
For project introduction, you can read two articles:

[AIZOO open source face mask detection data + model + code + online web experience, all open source](https://mp.weixin.qq.com/s/22U_v6IQ9PBHslI-65v_0Q)

[Face mask detection now open source PyTorch, TensorFlow, MXNet and other five mainstream deep learning framework models and codes](https://mp.weixin.qq.com/s?__biz=MzIyMDY2MTUyNg==&mid=2247483779&idx=1&sn=b9ac5af31adf1dfdc3c87eb1c74836a5&exportkey=AX%2FANiIY8CWWMPQrHKh6A5E%3D&pass_ticket=aaNfWJGBgSum6CY5pvFqx0IIfljPPkeX%2BdMtPEl3zo5hQfPnYR5mEUlayz06kNKG)


Deep learning models can be run in the browser with the help of the TensorFlow.js library. First, you need to use `tensorflowjs_converter` to convert tensorflow's graph model or keras' layer model to a model supported by TensorFlow.js.
This tool can be installed via `pip install tensorflowjs`.

If you use the Keras model, the operation is as follows:
```
tensorflowjs_convert --input_format keras --output_format tfjs_layers_model /path/to/keras/hdf5/model /path/to/output/folder
```
The model generates a `model.json` file and one or more `bin` files. The former saves the topology of the model and the latter saves the weight of the model.
To use JavaScript, you need to first import the `tfjs.min.js` library in the html, and then load the model
```
<script src="js/tfjs.min.js"></script>

```
In `detection.js`, load the model
```
model = await tf.loadLayersModel('./tfjs-models/model.json');
```
There is not much difference between the anchor generation, output decoding, nms and python version. You can check the three related functions in `detection.js` for a glance.

## How to run
To open the terminal in the current directory, you only need to create a minimal web server.
For users who use python
```
// python3 user
python -m http.server
// python2 user
python -m SimpleHTTPServer

```
If you use Node.js
```
npm install serve -g //install serve
serve // this will open a mini web serve
// You can also use http-serve
npm install http-server -g
http-server
```

## Effect
You can click the upload image button on the webpage, or drag the image to the webpage area, and the model will automatically detect and draw a frame.
![Page rendering](/images/result.png) 

Cheers,

Tommy.