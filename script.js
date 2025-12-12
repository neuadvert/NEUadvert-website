// Global UI helpers (menu + plan handling)
document.addEventListener('DOMContentLoaded', ()=>{

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  hamburger && hamburger.addEventListener('click', ()=> {
    if(!nav) return;
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
  });

  // Plan buttons: store chosen plan in localStorage and open contact form
  const planButtons = document.querySelectorAll('[data-plan]');
  planButtons.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const plan = btn.getAttribute('data-plan');
      localStorage.setItem('neu_selected_plan', plan);

      // If developer adds GOOGLE_FORM_ENTRY_ID below, code will open prefilled form
      const GOOGLE_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSeYtS-i0BWwBldJEpT3Z9u8oRw0PpOcKbAKsxYAhlHqWlbJQg/viewform?usp=header";
      const ENTRY_ID = ""; // <-- If you obtain the Google Forms entry id for the Plan field, paste it here (e.g. "entry.123456789")
      if(ENTRY_ID){
        const url = `${GOOGLE_FORM_LINK}?usp=pp_url&${ENTRY_ID}=${encodeURIComponent(plan)}`;
        window.open(url,'_blank');
      } else {
        // default: just open the main form
        window.open(GOOGLE_FORM_LINK,'_blank');
      }
    });
  });

  // On contact page: auto-fill UI hint from localStorage (if you embed the form)
  const planInput = document.querySelector('#planHint');
  if(planInput){
    const p = localStorage.getItem('neu_selected_plan') || '';
    if(p) planInput.textContent = `Selected plan: ${p}`;
  }

});
