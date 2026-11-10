
const nav=document.querySelector('[data-nav]');
const menu=document.querySelector('[data-menu]');
const serviceToggle=document.querySelector('[data-services-toggle]');
const serviceDropdown=serviceToggle?.closest('.nav-dropdown');
if(serviceToggle&&serviceDropdown){serviceToggle.addEventListener('click',()=>{const open=serviceDropdown.classList.toggle('is-open');serviceToggle.setAttribute('aria-expanded',String(open));});document.addEventListener('click',e=>{if(!serviceDropdown.contains(e.target)){serviceDropdown.classList.remove('is-open');serviceToggle.setAttribute('aria-expanded','false');}});}
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰';});nav.querySelectorAll('.primary-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';}));}
const form=document.getElementById('quoteForm');
if(form){
 const status=document.getElementById('formStatus'),btn=document.getElementById('submitBtn');
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!form.reportValidity())return;
  const fileInput=form.querySelector('input[type=file]');
  const file=fileInput?.files?.[0];
  if(file&&file.size>15*1024*1024){status.textContent=document.documentElement.lang==='ru'?'Файл больше 15 МБ. Уменьшите файл или отправьте его отдельно через WhatsApp.':'The file is larger than 15 MB. Please reduce it or send it separately via WhatsApp.';status.className='form-status error';return;}
  btn.disabled=true;btn.style.opacity='.6';
  status.textContent=document.documentElement.lang==='ru'?'Отправляем заявку…':'Sending your enquiry…';status.className='form-status';
  try{
   const res=await fetch('/api/quote',{method:'POST',body:new FormData(form)});
   const data=await res.json().catch(()=>({}));
   if(!res.ok)throw new Error(data.error||'send_failed');
   status.textContent=document.documentElement.lang==='ru'?'Заявка отправлена! Мы свяжемся с вами.':'Enquiry sent! We will get back to you shortly.';
   status.className='form-status success';form.reset();
  }catch(err){
   const ru=document.documentElement.lang==='ru';
   if(err.message==='email_not_configured'){
    status.innerHTML=ru?'Форма готова, но почта ещё не подключена. Пока отправьте запрос через <a href="https://wa.me/35797587065" target="_blank" rel="noopener">WhatsApp</a> и прикрепите файл в чате.':'The form is ready, but email delivery has not been configured yet. Please contact us via <a href="https://wa.me/35797587065" target="_blank" rel="noopener">WhatsApp</a> and attach your file in the chat.';
   }else{
    status.textContent=ru?'Не удалось отправить заявку. Попробуйте WhatsApp или повторите позже.':'Could not send the enquiry. Please try WhatsApp or try again later.';
   }
   status.className='form-status error';
  }finally{btn.disabled=false;btn.style.opacity='1';}
 });
}
