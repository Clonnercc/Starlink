async function loadSettings(){
 const s=await fetch("/api/settings").then(r=>r.json());
 document.getElementById("headline").textContent=s.headline;
 document.getElementById("subheadline").textContent=s.subheadline;
 document.getElementById("location").textContent=s.location;
 document.getElementById("serviceText").textContent=s.service_text;
 const wa=(s.whatsapp||"").replace(/\D/g,"");
 document.querySelectorAll("[data-wa]").forEach(a=>{
   a.href=wa?`https://wa.me/${wa}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre a Starlink Internet.")}`:"#";
   a.target="_blank"; a.rel="noopener";
 });
}
document.getElementById("year").textContent=new Date().getFullYear();
loadSettings();
