const DEFAULT_COURSES = [
  {code:"IF101", name:"Algoritma dan Pemrograman", sks:3, class:"A", day:"Senin", time:"08:00 - 10:30", room:"R.401"},
  {code:"IF102", name:"Struktur Data", sks:3, class:"A", day:"Selasa", time:"08:00 - 10:30", room:"Lab. Komputer 1"},
  {code:"IF103", name:"Basis Data", sks:3, class:"B", day:"Rabu", time:"10:00 - 12:30", room:"R.402"},
  {code:"IF104", name:"Pemrograman Web", sks:3, class:"A", day:"Rabu", time:"13:00 - 15:30", room:"Lab. Komputer 2"},
  {code:"IF105", name:"Jaringan Komputer", sks:3, class:"A", day:"Kamis", time:"08:00 - 10:30", room:"R.403"},
  {code:"IF106", name:"Sistem Operasi", sks:3, class:"B", day:"Kamis", time:"13:00 - 15:30", room:"R.404"},
  {code:"IF107", name:"Rekayasa Perangkat Lunak", sks:3, class:"A", day:"Jumat", time:"08:00 - 10:30", room:"R.405"},
  {code:"IF108", name:"Kecerdasan Buatan", sks:3, class:"A", day:"Jumat", time:"13:00 - 15:30", room:"Lab. AI"}
];

const KEY = "lintar_krrs_windriew";
const MAX_SKS = 24;

function getSelected(){
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch(e){ return []; }
}
function saveSelected(data){ localStorage.setItem(KEY, JSON.stringify(data)); }
function totalSks(data){ return data.reduce((sum,c)=>sum + Number(c.sks),0); }
function esc(value){
  return String(value).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function initPengisian(){
  const tbody = document.getElementById("courseBody");
  if(!tbody) return;
  const selected = getSelected();
  const selectedCodes = new Set(selected.map(c=>c.code));

  function render(filter=""){
    const q = filter.toLowerCase();
    const rows = DEFAULT_COURSES.filter(c =>
      `${c.code} ${c.name} ${c.class} ${c.day}`.toLowerCase().includes(q)
    );
    tbody.innerHTML = rows.map(c => `
      <tr class="${selectedCodes.has(c.code) ? "selected":""}">
        <td><input class="course-check" type="checkbox" value="${esc(c.code)}" ${selectedCodes.has(c.code)?"checked":""}></td>
        <td><strong>${esc(c.code)}</strong></td>
        <td>${esc(c.name)}</td>
        <td><span class="badge badge-sks">${c.sks} SKS</span></td>
        <td>${esc(c.class)}</td>
        <td>${esc(c.day)}, ${esc(c.time)}</td>
        <td>${esc(c.room)}</td>
      </tr>`).join("");
    tbody.querySelectorAll(".course-check").forEach(cb=>{
      cb.addEventListener("change", ()=>{
        const course = DEFAULT_COURSES.find(c=>c.code===cb.value);
        if(cb.checked) selectedCodes.add(course.code); else selectedCodes.delete(course.code);
        render(filter);
        updateSummary();
      });
    });
  }

  function updateSummary(){
    const picked = DEFAULT_COURSES.filter(c=>selectedCodes.has(c.code));
    const sks = totalSks(picked);
    document.getElementById("countCourse").textContent = picked.length;
    document.getElementById("totalSks").textContent = sks;
    const alert = document.getElementById("sksAlert");
    if(sks > MAX_SKS){
      alert.className = "alert alert-danger";
      alert.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> Total SKS melebihi batas maksimal ${MAX_SKS} SKS. Kurangi mata kuliah sebelum menyimpan.`;
    } else {
      alert.className = "alert alert-info";
      alert.innerHTML = `<i class="bi bi-info-circle-fill"></i> Maksimal pengambilan pada semester ini adalah ${MAX_SKS} SKS.`;
    }
  }

  document.getElementById("searchCourse")?.addEventListener("input", e=>render(e.target.value));
  document.getElementById("selectAll")?.addEventListener("change", e=>{
    DEFAULT_COURSES.forEach(c=> e.target.checked ? selectedCodes.add(c.code) : selectedCodes.delete(c.code));
    render(document.getElementById("searchCourse").value);
    updateSummary();
  });
  document.getElementById("saveKrrs")?.addEventListener("click", ()=>{
    const picked = DEFAULT_COURSES.filter(c=>selectedCodes.has(c.code));
    if(!picked.length){ alert("Pilih minimal satu mata kuliah terlebih dahulu."); return; }
    if(totalSks(picked)>MAX_SKS){ alert(`Total SKS melebihi batas maksimal ${MAX_SKS} SKS.`); return; }
    saveSelected(picked);
    alert("KRRS berhasil disimpan.");
    window.location.href = "rincian-krrs.html";
  });
  render(); updateSummary();
}

function initRincian(){
  const body = document.getElementById("detailBody");
  if(!body) return;
  const selected = getSelected();
  const sks = totalSks(selected);
  document.getElementById("detailCount").textContent = selected.length;
  document.getElementById("detailSks").textContent = sks;
  document.getElementById("statusKrrs").textContent = selected.length ? "Tersimpan" : "Belum Diisi";

  if(!selected.length){
    body.innerHTML = `<tr><td colspan="7"><div class="empty"><i class="bi bi-journal-x"></i><p>Belum ada mata kuliah yang dipilih.</p><a class="btn btn-primary" href="pengisian-krrs.html" style="margin-top:15px">Mulai Pengisian</a></div></td></tr>`;
    return;
  }
  body.innerHTML = selected.map((c,i)=>`
    <tr>
      <td>${i+1}</td><td><strong>${esc(c.code)}</strong></td><td>${esc(c.name)}</td>
      <td><span class="badge badge-sks">${c.sks} SKS</span></td><td>${esc(c.class)}</td>
      <td>${esc(c.day)}, ${esc(c.time)}</td><td>${esc(c.room)}</td>
    </tr>`).join("");
}

function initPreview(){
  const body = document.getElementById("previewBody");
  if(!body) return;
  const selected = getSelected();
  document.getElementById("previewCount").textContent = selected.length;
  document.getElementById("previewSks").textContent = totalSks(selected);
  if(!selected.length){
    body.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px;color:#888">Belum ada mata kuliah yang dipilih.</td></tr>`;
    return;
  }
  body.innerHTML = selected.map((c,i)=>`
    <tr><td>${i+1}</td><td>${esc(c.code)}</td><td>${esc(c.name)}</td><td>${c.sks}</td><td>${esc(c.class)}</td><td>${esc(c.day)}, ${esc(c.time)}</td><td>${esc(c.room)}</td></tr>`).join("");
  document.getElementById("printBtn")?.addEventListener("click",()=>window.print());
}

document.addEventListener("DOMContentLoaded", ()=>{
  initPengisian();
  initRincian();
  initPreview();
});
