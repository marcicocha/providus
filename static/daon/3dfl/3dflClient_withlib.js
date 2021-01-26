'use strict'

// const f3d = {
//   instance: undefined,
//   init: function(config){
//     const {mWidth, mHeight, video, onUpdate, onTemplateCreated} = config;

//     f3d.instance.initialize(mWidth, mHeight, videoStream, onUpdate, tpl =>{
//       onUpdate(f3d.instance.UPDATE_TYPES.AWAIT_RESULTS);
//       onTemplateCreated(tpl);
//     });
//   },
//   startProcessing: function(){
//     setTimeout(processFrame, 20);
//   },
//   setConfig: function (configuration) {
//     const config = Object.assign({}, configuration)
//     // 'png' is a special case, for research data collection,
//     // do not allow this on production code
//     if (config.compression && config.compression !== 'png') {
//       config.compression = parseFloat(config.compression);
//     }

//     f3d.instance.setOptionalConfig(config);
//   },
//   startSession: function(){
//     // request a new sequence from the server
//     f3d.instance.startSession();
//   }
// }
