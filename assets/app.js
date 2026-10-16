(function(){
  const toggle=document.querySelector('[data-menu-toggle]');
  const panel=document.querySelector('[data-menu-panel]');
  if(toggle && panel){
    function closeMenu(){toggle.setAttribute('aria-expanded','false');panel.classList.remove('open');document.body.classList.remove('menu-open');}
    toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));panel.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);});
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
    addEventListener('resize',()=>{if(innerWidth>820)closeMenu()});
  }
  const dateInput=document.querySelector('input[name="date"]');
  if(dateInput){const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Edmonton',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());dateInput.min=today;}
  // This is a safe email-draft fallback until the existing WordPress booking backend
  // is transferred or the client verifies a new authenticated delivery provider.
  function mailDraft(form,kind){
    const data=new FormData(form);const entries=Array.from(data.entries()).filter(([key])=>key!=='_subject');
    const subject=kind==='booking'?'Taxi booking request - A-One Taxi Services':'Website enquiry - A-One Taxi Services';
    const body=(kind==='booking'?'BOOKING REQUEST (pending confirmation)':'WEBSITE ENQUIRY')+'\n\n'+entries.map(([key,v])=>`${key.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}: ${v}`).join('\n')+'\n\nPlease contact me to confirm.\n';
    const a=document.createElement('a');a.href='mailto:A1taxiymm@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    document.body.appendChild(a);a.click();a.remove();
  }
  document.querySelectorAll('[data-mail-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();if(!form.reportValidity())return;
    const input=form.querySelector('[name="date"]');if(input && input.value && input.min && input.value<input.min){input.setCustomValidity('Choose today or a future date.');input.reportValidity();input.setCustomValidity('');return;}
    mailDraft(form,form.dataset.mailForm);
    const status=form.parentElement.querySelector('[data-form-status]');if(status){status.className='status show success';status.textContent='Your email application has been opened with your request details. Please press Send in your email app; the booking is not confirmed until the taxi service contacts you.';}
  }));
})();
