const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
toggle?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});

// Give every fenced code example a one-click copy action without changing the article Markdown.
document.querySelectorAll('.prose pre').forEach(pre=>{
  const code=pre.querySelector('code');
  if(!code)return;

  const button=document.createElement('button');
  button.type='button';
  button.className='code-copy-button';
  button.textContent='Copy';
  button.setAttribute('aria-label','Copy code to clipboard');
  pre.append(button);

  let resetTimer;
  button.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(code.textContent||'');
      button.textContent='Copied!';
      button.setAttribute('aria-label','Code copied to clipboard');
      button.classList.add('is-copied');
    }catch{
      button.textContent='Copy failed';
      button.setAttribute('aria-label','Unable to copy code');
      button.classList.remove('is-copied');
    }

    clearTimeout(resetTimer);
    resetTimer=setTimeout(()=>{
      button.textContent='Copy';
      button.setAttribute('aria-label','Copy code to clipboard');
      button.classList.remove('is-copied');
    },2000);
  });
});
