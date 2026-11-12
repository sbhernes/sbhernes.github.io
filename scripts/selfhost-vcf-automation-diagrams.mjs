import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {join} from 'node:path';

const root=process.cwd();
const articlePath=join(root,'astro/src/content/blog/vcf-automation-overview.md');
const imageDirectory=join(root,'astro/public/assets/images/vcf-automation');
const assets=[
  {url:'https://i0.wp.com/theaistack.blog/wp-content/uploads/2025/08/image-4.png?resize=1546%2C952&ssl=1', local:'vcf-automation-tenant-structure.png'},
  {url:'https://vmcheese.com/media/posts/11/VPC_Components.png', local:'nsx-vpc-components.png'},
  {url:'https://vmcheese.com/media/posts/11/ExternalConnectivityOptions.jpeg', local:'vcf9-transit-gateway-options.jpg'},
  {url:'https://devynharrington.com/images/vcf/vcf-automation-all-apps/72newnamespace72.png', local:'vcf-automation-create-namespace.png'}
];
function actualImageType(bytes){
  if(bytes.length>3 && bytes[0]===255 && bytes[1]===216 && bytes[2]===255) return 'jpg';
  if(bytes.length>8 && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return 'png';
  if(bytes.length>12 && bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP')return 'webp';
  return 'unknown';
}
const downloaded=[];
for(const asset of assets){
  let lastError;
  for(let attempt=1;attempt<=3;attempt++){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),45000);
    try{
      const response=await fetch(asset.url,{signal:controller.signal,headers:{'User-Agent':'Mozilla/5.0 (compatible; VirtualViking/1.0)'}});
      if(!response.ok)throw new Error('HTTP '+response.status);
      const bytes=Buffer.from(await response.arrayBuffer());
      if(bytes.length>12_000_000)throw new Error('Image exceeds 12 MB');
      const extension=actualImageType(bytes);
      if(extension==='unknown')throw new Error('Response is not a supported image');
      const targetExtension=asset.local.split('.').pop();
      if(extension!==targetExtension)throw new Error('Unexpected image format '+extension+' for '+asset.local);
      downloaded.push({...asset,bytes});
      console.log(asset.local+': '+bytes.length+' bytes, '+extension);
      lastError=undefined;
      break;
    }catch(error){
      lastError=error;
      console.error('Attempt '+attempt+' failed for '+asset.url+': '+error.message);
    }finally{clearTimeout(timer);}
  }
  if(lastError)throw lastError;
}
let markdown=await readFile(articlePath,'utf8');
for(const a of downloaded){
  const local='/assets/images/vcf-automation/'+a.local;
  const escaped=a.url.replaceAll('&','&amp;');
  if(!markdown.includes(escaped) && !markdown.includes(a.url))throw new Error('Missing reference '+a.url);
  markdown=markdown.split(escaped).join(local).split(a.url).join(local);
}
if(markdown.includes('<img src="https://'))throw new Error('One or more external images remain');
if(/^cover:\s*["']https?:/m.test(markdown))throw new Error('Remote cover remains');
await mkdir(imageDirectory,{recursive:true});
for(const a of downloaded)await writeFile(join(imageDirectory,a.local),a.bytes);
await writeFile(articlePath,markdown);
console.log('Updated article and saved '+downloaded.length+' verified local images. Source attributions are unchanged.');
