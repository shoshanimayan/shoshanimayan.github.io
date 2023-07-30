import{P as N,I as F,A as S,a as M,Q as W,C as w,V as D,N as E}from"./index-2330fff8.js";const h={node:"node",material:"material",camera:"camera",light:"light"},_="KHR_animation_pointer",O={CUBICSPLINE:void 0,LINEAR:F,STEP:M},K=N.findNode;let C=!1;class z{constructor(i){this.parser=i,this.name=_,this.animationPointerResolver=null}setAnimationPointerResolver(i){return this.animationPointerResolver=i,this}_patchPropertyBindingFindNode(){C||(C=!0,N.findNode=function(i,n){if(n.startsWith(".materials.")){const a=n.substring(11).substring(n.indexOf(".")),e=a.indexOf("."),t=e<0?a:a.substring(0,e);let s=null;return i.traverse(o=>{s!==null||o.type!=="Mesh"||o.material&&(o.material.uuid===t||o.material.name===t)&&(s=o.material,s!==null&&(a.endsWith(".map")?s=s.map:a.endsWith(".emissiveMap")&&(s=s.emissiveMap)))}),s}else if(n.startsWith(".nodes.")||n.startsWith(".lights.")||n.startsWith(".cameras.")){const a=n.split(".");let e;for(let t=1;t<a.length;t++){const s=a[t];if(s.length==36)e=i.getObjectByProperty("uuid",s);else if(e&&e[s]){const l=Number.parseInt(s);let r=s;l>=0&&(r=l),e=e[r]}else{const l=i.getObjectByName(s);l&&(e=l)}}if(!e){const t=K(i,a[2]);return t||console.warn(_+": Property binding not found",n,i,i.name,a),t}return e}return K(i,n)})}loadAnimationTargetFromChannel(i){const n=i.target,a=n.node!==void 0?n.node:n.id;return this.parser.getDependency("node",a)}loadAnimationTargetFromChannelWithAnimationPointer(i){this._havePatchedPropertyBindings||this._patchPropertyBindingFindNode();const n=i.target,a=n.extensions&&n.extensions[_]&&n.path&&n.path==="pointer";if(!a)return null;let e,t=h.node,s;if(a){const l=n.extensions[_];let r=l.pointer;if(!r){console.warn("Invalid path",l,n);return}if(r.startsWith("/materials/")?t=h.material:r.startsWith("/extensions/KHR_lights_punctual/lights/")?t=h.light:r.startsWith("/cameras/")&&(t=h.camera),s=this._tryResolveTargetId(r,t),s===null||isNaN(s)){console.warn("Failed resolving animation node id: "+s,r);return}switch(t){case h.material:const b=("/materials/"+s.toString()+"/").length,c=r.substring(0,b);switch(e=r.substring(b),e){case"pbrMetallicRoughness/baseColorFactor":e="color";break;case"pbrMetallicRoughness/roughnessFactor":e="roughness";break;case"pbrMetallicRoughness/metallicFactor":e="metalness";break;case"emissiveFactor":e="emissive";break;case"alphaCutoff":e="alphaTest";break;case"occlusionTexture/strength":e="aoMapIntensity";break;case"normalTexture/scale":e="normalScale";break;case"pbrMetallicRoughness/baseColorTexture/extensions/KHR_texture_transform/scale":e="map/repeat";break;case"pbrMetallicRoughness/baseColorTexture/extensions/KHR_texture_transform/offset":e="map/offset";break;case"emissiveTexture/extensions/KHR_texture_transform/scale":e="emissiveMap/repeat";break;case"emissiveTexture/extensions/KHR_texture_transform/offset":e="emissiveMap/offset";break;case"extensions/KHR_materials_emissive_strength/emissiveStrength":e="emissiveIntensity";break;case"extensions/KHR_materials_transmission/transmissionFactor":e="transmission";break;case"extensions/KHR_materials_ior/ior":e="ior";break;case"extensions/KHR_materials_volume/thicknessFactor":e="thickness";break;case"extensions/KHR_materials_volume/attenuationColor":e="attenuationColor";break;case"extensions/KHR_materials_volume/attenuationDistance":e="attenuationDistance";break;case"extensions/KHR_materials_iridescence/iridescenceFactor":e="iridescence";break;case"extensions/KHR_materials_iridescence/iridescenceIor":e="iridescenceIOR";break;case"extensions/KHR_materials_iridescence/iridescenceThicknessMinimum":e="iridescenceThicknessRange[0]";break;case"extensions/KHR_materials_iridescence/iridescenceThicknessMaximum":e="iridescenceThicknessRange[1]";break;case"extensions/KHR_materials_clearcoat/clearcoatFactor":e="clearcoat";break;case"extensions/KHR_materials_clearcoat/clearcoatRoughnessFactor":e="clearcoatRoughness";break;case"extensions/KHR_materials_sheen/sheenColorFactor":e="sheenColor";break;case"extensions/KHR_materials_sheen/sheenRoughnessFactor":e="sheenRoughness";break;case"extensions/KHR_materials_specular/specularFactor":e="specularIntensity";break;case"extensions/KHR_materials_specular/specularColorFactor":e="specularColor";break}r=c+e;break;case h.node:const p=("/nodes/"+s.toString()+"/").length,u=r.substring(0,p);switch(e=r.substring(p),e){case"translation":e="position";break;case"rotation":e="quaternion";break;case"scale":e="scale";break;case"weights":e="morphTargetInfluences";break}r=u+e;break;case h.light:const g=("/extensions/KHR_lights_punctual/lights/"+s.toString()+"/").length;switch(e=r.substring(g),e){case"color":break;case"intensity":break;case"spot/innerConeAngle":e="penumbra";break;case"spot/outerConeAngle":e="angle";break;case"range":e="distance";break}r="/lights/"+s.toString()+"/"+e;break;case h.camera:const d=("/cameras/"+s.toString()+"/").length,k=r.substring(0,d);switch(e=r.substring(d),e){case"perspective/yfov":e="fov";break;case"perspective/znear":case"orthographic/znear":e="near";break;case"perspective/zfar":case"orthographic/zfar":e="far";break;case"perspective/aspect":e="aspect";break;case"orthographic/xmag":e="zoom";break;case"orthographic/ymag":e="zoom";break}r=k+e;break}const m=this.animationPointerResolver;m&&m.resolvePath&&(r=m.resolvePath(r)),n.extensions[_].pointer=r}if(s===null||isNaN(s)){console.warn("Failed resolving animation node id: "+s,n);return}let o;return t===h.node?o=this.parser.getDependency("node",s):t===h.material?o=this.parser.getDependency("material",s):t===h.light?o=this.parser.getDependency("light",s):t===h.camera?o=this.parser.getDependency("camera",s):console.error("Unhandled type",t),o}createAnimationTracksWithAnimationPointer(i,n,a,e,t){if(!(t.extensions&&t.extensions[_]&&t.path&&t.path==="pointer"))return null;let o=t.extensions[_].pointer;if(!o)return null;const l=[];o=o.replaceAll("/",".");const r=o.split(".");r[2]=i.name!==void 0&&i.name!==null?i.name:i.uuid,o=r.join(".");let m;switch(a.itemSize){case 1:m=E;break;case 2:case 3:m=D;break;case 4:o.endsWith(".quaternion")?m=W:m=w;break}const b=e.interpolation!==void 0?O[e.interpolation]:F;let c=this.parser._getArrayFromAccessor(a);o.endsWith(".fov")&&(c=c.map(u=>u/Math.PI*180));const p=new m(o,n.array,c,b);if(b==="CUBICSPLINE"&&this.parser._createCubicSplineTrackInterpolant(p),l.push(p),o&&a.itemSize===4&&o.startsWith(".materials.")&&o.endsWith(".color")){const u=new Float32Array(c.length/4);for(let d=0,k=c.length/4;d<k;d+=1)u[d]=c[d*4+3];const g=new m(o.replace(".color",".opacity"),n.array,u,b);b==="CUBICSPLINE"&&this.parser._createCubicSplineTrackInterpolant(p),l.push(g)}return l}_tryResolveTargetId(i,n){let a="";return n==="node"?a=i.substring(7):n==="material"?a=i.substring(11):n==="light"?a=i.substring(39):n==="camera"&&(a=i.substring(9)),a=a.substring(0,a.indexOf("/")),Number.parseInt(a)}loadAnimation(i){const n=this,a=this.parser.json,e=this.parser,t=a.animations[i],s=t.name?t.name:"animation_"+i,o=[],l=[],r=[],m=[],b=[];for(let c=0,p=t.channels.length;c<p;c++){const u=t.channels[c],g=t.samplers[u.sampler],d=u.target,k=t.parameters!==void 0?t.parameters[g.input]:g.input,y=t.parameters!==void 0?t.parameters[g.output]:g.output;let f=n.loadAnimationTargetFromChannelWithAnimationPointer(u);f||(f=n.loadAnimationTargetFromChannel(u)),o.push(f),l.push(e.getDependency("accessor",k)),r.push(e.getDependency("accessor",y)),m.push(g),b.push(d)}return Promise.all([Promise.all(o),Promise.all(l),Promise.all(r),Promise.all(m),Promise.all(b)]).then(function(c){const p=c[0],u=c[1],g=c[2],d=c[3],k=c[4],y=[];for(let f=0,H=p.length;f<H;f++){const x=p[f],P=u[f],I=g[f],v=d[f],A=k[f];if(x===void 0)continue;x.updateMatrix&&(x.updateMatrix(),x.matrixAutoUpdate=!0);let R=n.createAnimationTracksWithAnimationPointer(x,P,I,v,A);if(R||(R=e._createAnimationTracks(x,P,I,v,A)),R)for(let T=0;T<R.length;T++)y.push(R[T])}return new S(s,void 0,y)})}}export{z as GLTFAnimationPointerExtension};
