document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.menu-btn');
  const menu=document.querySelector('.mobile-menu');
  if(btn&&menu){
    const close=()=>{menu.classList.remove('open');btn.setAttribute('aria-expanded','false')};
    btn.addEventListener('click',()=>{
      const open=menu.classList.toggle('open');
      btn.setAttribute('aria-expanded',String(open));
    });
    menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  document.querySelectorAll('[data-lead-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.reportValidity()) return;
      const cfg=window.NTEO_CONFIG||{};
      const data=new FormData(form);
      const msg=`NTEO enquiry\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\nMessage: ${data.get('message')||''}`;
      const status=form.querySelector('.form-status');
      if(cfg.whatsapp){
        window.open('https://wa.me/'+String(cfg.whatsapp).replace(/\\D/g,'')+'?text='+encodeURIComponent(msg),'_blank','noopener');
        if(status)status.textContent='Your enquiry details are ready in WhatsApp. Please send the message there.';
      }else if(cfg.email){
        window.location.href='mailto:'+cfg.email+'?subject='+encodeURIComponent('NTEO website enquiry')+'&body='+encodeURIComponent(msg);
        if(status)status.textContent='Your email app is opening with the enquiry details.';
      }else{
        if(status)status.textContent='The enquiry form is not connected yet. Add the company WhatsApp number or email in assets/config.js before publishing.';
      }
    });
  });
});
