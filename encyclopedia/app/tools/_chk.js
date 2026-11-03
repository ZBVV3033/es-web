const fs=require('fs'),cp=require('child_process'),path=require('path');
const root=process.cwd();
const html=fs.readFileSync(path.join(root,'es-web-integrated.html'),'utf8');
const re=/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m,i=0,bad=0;
const tmp=path.join(root,'_chk_tmp'); fs.mkdirSync(tmp,{recursive:true});
while((m=re.exec(html))){
  i++; const f=path.join(tmp,`b${i}.js`); fs.writeFileSync(f,m[1]);
  const r=cp.spawnSync(process.execPath,['--check',f],{encoding:'utf8'});
  if(r.status!==0){bad++; console.log('BLOCK',i,'ERROR\n'+(r.stderr||r.stdout));}
}
const d=cp.spawnSync(process.execPath,['--check',path.join(root,'latest-preview','data.js')],{encoding:'utf8'});
console.log('blocks=',i,'bad=',bad,'dataExit=',d.status);
if(d.status!==0) console.log(d.stderr||d.stdout);
fs.rmSync(tmp,{recursive:true,force:true});
