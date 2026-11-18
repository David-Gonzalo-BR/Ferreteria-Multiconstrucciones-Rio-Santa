/* ==========================================================================
   MULTICONSTRUCCIONES RÍO SANTA S.A.C. - Sistema Web Ferretero
   Módulo de Gestión, Tienda, Inventario, Ventas y Mantenimiento de Stock
   ========================================================================== */

/* ---------- CATEGORÍAS Y ESTRUCTURA DEL SISTEMA ---------- */
const CO = 'Construcción', AG = 'Tanques y Agua', BA = 'Baños y Sanitarios', 
      ES = 'Espejos y Decoración', MU = 'Muebles y Estantería', IL = 'Iluminación y Focos', 
      HE = 'Herramientas', EL = 'Electricidad', PI = 'Pinturas', SE = 'Seguridad';

const TREE = {
  [CO]: ['🧱', ['Cemento y Concreto', 'Fierro y Alambre', 'Clavos y Fijaciones', 'Ladrillos y Bloques', 'Tablas y Madera', 'Arena y Piedra']],
  [AG]: ['💧', ['Tanques Rotoplas', 'Tuberías PVC', 'Accesorios de Agua']],
  [BA]: ['🚽', ['Inodoros', 'Lavatorios', 'Grifería', 'Duchas y Tinas']],
  [ES]: ['🪞', ['Espejos']],
  [MU]: ['🛋️', ['Muebles de Baño', 'Estantes', 'Cocina y Oficina']],
  [IL]: ['💡', ['Focos LED', 'Paneles y Reflectores', 'Tiras LED']],
  [HE]: ['🛠️', ['Manuales', 'Eléctricas', 'Medición']],
  [EL]: ['🔌', ['Cables', 'Interruptores y Tomas']],
  [PI]: ['🎨', ['Látex y Esmaltes', 'Accesorios de Pintura']],
  [SE]: ['🦺', ['Protección Personal']]
};

/* ---------- CATÁLOGO DE PRODUCTOS (INCLUYE SECCIÓN DE OFERTAS) ---------- */
const productos = [
  [1, 'Cemento Sol x 42.5kg', CO, 0, 28.5, 150],
  [4, 'Cemento Andino Tipo I x 42.5kg', CO, 0, 27.8, 120, 29.9],
  [5, 'Yeso en Bolsa 20kg', CO, 0, 14, 40],
  [2, 'Fierro Corrugado 1/2" Aceros Arequipa', CO, 1, 34, 80],
  [6, 'Fierro Corrugado 3/8" Aceros Arequipa', CO, 1, 22, 100],
  [7, 'Fierro Corrugado 5/8" Aceros Arequipa', CO, 1, 52, 60],
  [8, 'Alambre Negro N°16 por kg', CO, 1, 6.5, 200, 7.5],
  [9, 'Alambre Galvanizado N°14 por kg', CO, 1, 8.5, 90],
  [10, 'Alambre de Púas Rollo 200m', CO, 1, 130, 15, 145],
  [11, 'Clavos de 2" por kg', CO, 2, 5.5, 300],
  [12, 'Clavos de 3" por kg', CO, 2, 5.5, 250],
  [15, 'Clavos para Calamina por kg', CO, 2, 8, 80, 9.5],
  [16, 'Tornillos Drywall 1" Caja x100', CO, 2, 12, 70],
  [3, 'Ladrillo King Kong 18H', CO, 3, 1.2, 1200],
  [18, 'Ladrillo Pandereta', CO, 3, 0.9, 1500],
  [19, 'Ladrillo de Techo 15cm', CO, 3, 2.4, 800],
  [38, 'Bloque de Concreto 15cm', CO, 3, 3.2, 400],
  [39, 'Tabla de Construcción 2"x8"x3m', CO, 4, 38, 60],
  [40, 'Tabla de Encofrado 1"x8"x3m', CO, 4, 22, 90],
  [41, 'Listón de Madera 2"x2"x3m', CO, 4, 12, 120],
  [42, 'Triplay Fenólico 18mm 1.22x2.44m', CO, 4, 165, 25, 180],
  [43, 'Parante de Eucalipto 3m', CO, 4, 14, 100],
  [44, 'Arena Gruesa por m³', CO, 5, 65, 30],
  [45, 'Piedra Chancada 1/2" por m³', CO, 5, 85, 25],
  [46, 'Tanque Rotoplas 600L', AG, 0, 380, 12, 410],
  [47, 'Tanque Rotoplas 1100L', AG, 0, 560, 10, 610],
  [48, 'Tanque Rotoplas 2500L', AG, 0, 1150, 4],
  [49, 'Cisterna Rotoplas 1000L', AG, 0, 780, 6],
  [50, 'Tubo PVC Agua 1/2" x 5m', AG, 1, 12, 80],
  [51, 'Tubo PVC Desagüe 4" x 3m', AG, 1, 28, 60],
  [52, 'Codo PVC 1/2"', AG, 2, 1.5, 300],
  [53, 'Llave de Paso 1/2" Bronce', AG, 2, 24, 50],
  [54, 'Pegamento PVC 1/4 Galón', AG, 2, 32, 35],
  [55, 'Flotador de Tanque 1/2"', AG, 2, 18, 40],
  [20, 'Inodoro One Piece Trébol con Sistema Dual', BA, 0, 380, 15, 420],
  [25, 'Pack Combo Inodoro + Lavatorio + Espejo', BA, 0, 450, 10, 520],
  [21, 'Lavatorio de Loza con Pedestal Blanco', BA, 1, 125, 20],
  [22, 'Grifería Monocomando para Lavatorio Cromo', BA, 2, 95, 25, 115],
  [23, 'Ducha Térmica Electric Shower 4 Temp', BA, 3, 140, 30],
  [24, 'Tina de Baño Acrílica 1.40m Blanca', BA, 3, 650, 5],
  [26, 'Espejo Redondo con Luz LED Touch 60cm', ES, 0, 180, 12, 210],
  [27, 'Espejo Rectangular con Marco de Aluminio', ES, 0, 150, 18],
  [28, 'Espejo Organizador de Pared para Joyas/Baño', ES, 0, 220, 8],
  [29, 'Mueble Base para Lavatorio Melamine', MU, 0, 290, 10],
  [30, 'Estante Metálico Modular 5 Niveles', MU, 1, 165, 22, 190],
  [31, 'Gabinete Aéreo de Cocina Melamine 1.20m', MU, 2, 340, 7],
  [32, 'Escritorio de Oficina Minimalista en L', MU, 2, 280, 14],
  [33, 'Foco LED Ahorrador 12W Luz Blanca Philips', IL, 0, 9.5, 150, 12],
  [34, 'Foco LED Dicroico GU10 7W Luz Cálida', IL, 0, 12, 90],
  [35, 'Panel LED Redondo Empotrable 18W', IL, 1, 28, 60, 35],
  [36, 'Reflector LED Exterior 50W IP66', IL, 1, 55, 25, 68],
  [37, 'Tira LED 5 Metros RGB con Control Remoto', IL, 2, 38, 40],
  [13, 'Martillo de Carpintero Profesional', HE, 0, 25, 18],
  [14, 'Juego de Llaves Mixtas x 8pz', HE, 0, 55, 12, 65],
  [56, 'Alicate Universal 8"', HE, 0, 22, 35],
  [57, 'Taladro Percutor 750W', HE, 1, 210, 9, 240],
  [58, 'Amoladora 4 1/2" 850W', HE, 1, 185, 12, 210],
  [59, 'Wincha de 5 metros', HE, 2, 12, 50],
  [60, 'Nivel de Burbuja 60cm', HE, 2, 28, 25],
  [62, 'Cable THW 2.5mm² Rollo 100m', EL, 0, 210, 14],
  [63, 'Cable Vulcanizado 2x14 por metro', EL, 0, 4.5, 400],
  [64, 'Interruptor Simple Bticino', EL, 1, 9, 80],
  [65, 'Tomacorriente Doble con Tierra', EL, 1, 14, 70],
  [66, 'Pintura Látex Blanco 4L', PI, 0, 78, 30, 88],
  [67, 'Esmalte Sintético 1 Galón', PI, 0, 95, 20],
  [68, 'Rodillo 9" con Bandeja', PI, 1, 18, 40],
  [69, 'Brocha de 3"', PI, 1, 8, 60],
  [70, 'Casco de Seguridad Amarillo', SE, 0, 18, 50],
  [71, 'Guantes de Cuero por par', SE, 0, 12, 80],
  [72, 'Lentes de Seguridad', SE, 0, 8, 90],
  [73, 'Botas de Seguridad Punta de Acero', SE, 0, 95, 20, 110]
].map(([id, nombre, categoria, i, precio, stock, antes]) => ({
  id, nombre, categoria, sub: TREE[categoria][1][i], precio, stock, base: stock, antes
}));

/* ---------- ESTADO GLOBAL DE LA APLICACIÓN ---------- */
let ventas = [];
let carrito = [];
let user = null;
let cat = 'Todos';
let sub = '';
let abierto = '';
let q = '';
let actual = 'tienda';

const $ = id => document.getElementById(id);
const f = n => 'S/ ' + Number(n || 0).toFixed(2);
const prod = id => productos.find(p => p.id === id);

const esAdmin = () => {
  if (!user) return false;
  const rolStr = String(user.rol || user || "").toLowerCase();
  const rolId = Number(user.rol_id || 0);
  return rolStr.includes('admin') || rolStr.includes('desarrollador') || rolId === 2;
};

const VISTAS = ['tienda', 'inv', 'ventas', 'rep', 'nos'];
const API = 'api/';

function escHtml(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

async function api(ruta, opciones = {}) {
  const r = await fetch(API + ruta, {
    credentials: 'same-origin',
    ...opciones,
    headers: opciones.body ? { 'Content-Type': 'application/json' } : {}
  });
  let d;
  try { d = await r.json(); }
  catch (e) { throw new Error('El servidor no respondió con JSON.'); }
  if (!r.ok || d.ok === false) throw new Error(d.error || d.mensaje || 'Ocurrió un error.');
  return d;
}

async function cargarProductos() {
  try {
    const d = await api('products.php');
    if (d && d.productos) {
      d.productos.forEach(n => {
        const p = prod(n.id);
        if (p) { p.precio = n.precio; p.antes = n.antes; p.stock = n.stock; p.base = n.base; }
        else productos.push(n);
      });
    }
  } catch (e) {}
}

function nivel(p) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return (p.length >= 8 && s >= 3) ? 3 : 1;
}

function medidor(v, pref) {
  const n = nivel(v);
  $(pref + '-meter').className = 'meter' + (n ? ' l' + n : '');
  $(pref + '-txt').className = 'mtxt' + (n ? ' l' + n : '');
  $(pref + '-txt').textContent = !n ? 'Ingresa una contraseña' : n === 3 ? '✔ Contraseña segura' : '⚠ Contraseña poco segura';
}

function msg(id, txt, ok) { const e = $(id); e.textContent = txt; e.classList.add('show'); return e; }
function ocultar(...ids) { ids.forEach(i => $(i).classList.remove('show')); }

function limpiarErr() { ocultar('login-err'); $('f-user').classList.remove('error'); $('f-pass').classList.remove('error'); }

async function entrar(u) {
  user = u;
  await cargarProductos();
  $('who').innerHTML = '👤 ' + escHtml(u.nombre || u) + (esAdmin() ? ' <span class="tag">ADMIN</span>' : '');
  ['inv', 'ventas', 'rep'].forEach(x => $('bt-' + x).style.display = esAdmin() ? 'flex' : 'none');
  $('login-screen').style.display = 'none';
  $('app').style.display = 'flex';
  renderCats();
  vista('tienda');
  renderCarrito();
}

async function login(e) {
  e.preventDefault(); limpiarErr();
  const usuario = $('username').value.trim(), password = $('password').value;
  let datos;
  try {
    datos = await api('login.php', { method: 'POST', body: JSON.stringify({ usuario, password }) });
  } catch (err) {
    $('f-pass').classList.add('error');
    msg('login-err', '❌ ' + err.message);
    $('password').value = ''; $('password').focus();
    return;
  }
  try { await entrar(datos.usuario); }
  catch (err) { msg('login-err', '❌ ' + err.message); }
}

async function salir() {
  try { await api('login.php?salir=1'); } catch (e) {}
  user = null; carrito = [];
  $('app').style.display = 'none'; $('login-screen').style.display = 'flex';
  $('username').value = ''; $('password').value = ''; $('password').type = 'password'; $('eye').textContent = '👁️';
  limpiarErr();
}

async function registrar(e) {
  e.preventDefault(); ocultar('rg-err', 'rg-ok');
  const u = $('rg-user').value.trim(), p = $('rg-pass').value;
  if (p.length < 6) { msg('rg-err', 'La contraseña debe tener al menos 6 caracteres.'); return; }
  const slug = u.toLowerCase().replace(/[^a-z0-9._-]/g, '') || 'cliente';
  const correo = u.includes('@') ? u : slug + '@cliente.local';
  try {
    await api('register.php', { method: 'POST', body: JSON.stringify({ nombre: u, correo, password: p }) });
  } catch (err) { msg('rg-err', err.message); return; }
  msg('rg-ok', '✔ Cuenta creada. Ya puedes iniciar sesión.');
  setTimeout(() => {
    cerrar('registerModal'); $('rg-user').value = ''; $('rg-pass').value = ''; medidor('', 'rg'); ocultar('rg-ok');
    $('username').value = u; $('password').focus();
  }, 1200);
}

function recuperar(e) {
  e.preventDefault(); ocultar('fg-err', 'fg-ok');
  msg('fg-err', 'Para recuperar tu contraseña escríbenos por WhatsApp al 954175106.');
}

function vista(v) {
  actual = v;
  VISTAS.forEach(x => { $('v-' + x).style.display = x === v ? 'block' : 'none'; $('bt-' + x).classList.toggle('on', x === v); });
  ({ tienda: renderProductos, inv: renderInv, ventas: renderVentas, rep: renderRep, nos: () => {} })[v]();
}

function renderCats() {
  const b = (on, fn, txt, extra = '', cls = '') => `<button class="${cls} ${on ? 'on' : ''}" onclick="${fn}">${txt}${extra}</button>`;
  $('cats').innerHTML =
    b(cat === 'Todos', "filtrar('Todos')", '🏬 Todos los productos') +
    b(cat === 'Ofertas del mes' || cat === 'Ofertas', "filtrar('Ofertas del mes')", '🔥 Ofertas del mes') +
    Object.entries(TREE).map(([n, [ic, subs]]) =>
      b(cat === n && !sub, `filtrar('${n}')`, `<span>${ic}</span>${n}`, `<i>${abierto === n ? '▾' : '▸'}</i>`) +
      (abierto === n ? subs.map(s => b(cat === n && sub === s, `filtrar('${n}','${s}')`, s, '', 'sub')).join('') : '')
    ).join('');
}

function filtrar(c, s = '') {
  abierto = (abierto === c && !s && cat === c && !sub) ? '' : (TREE[c] ? c : '');
  cat = c; sub = s;
  $('titulo').textContent = (c === 'Todos') ? 'Catálogo completo' : (c === 'Ofertas del mes' || c === 'Ofertas') ? '🔥 Ofertas del mes' : (s || c);
  renderCats();
  actual === 'inv' ? renderInv() : vista('tienda');
}

function buscar(v) { q = v.toLowerCase(); actual === 'inv' ? renderInv() : vista('tienda'); }

const filtrados = () => productos.filter(p => {
  const coincideCategoria = (cat === 'Todos') || 
    (cat === 'Ofertas del mes' || cat === 'Ofertas' ? !!p.antes : (p.categoria === cat && (!sub || p.sub === sub)));
  const coincideBusqueda = p.nombre.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q);
  return coincideCategoria && coincideBusqueda;
});

function renderProductos() {
  const g = $('products-grid'), l = filtrados();
  if (!l.length) {
    g.innerHTML = (cat === 'Ofertas del mes' || cat === 'Ofertas') 
      ? '<p style="grid-column:1/-1;text-align:center;color:#6888b2;padding:2rem">No hay productos en oferta actualmente.</p>' 
      : '<p style="grid-column:1/-1;text-align:center;color:#6888b2;padding:2rem">No se encontraron productos disponibles.</p>';
    return;
  }
  g.innerHTML = l.map(p => {
    const st = esAdmin() ? `<div class="st ${p.stock < 10 ? 'bad' : 'ok'}">📦 Almacén: ${p.stock} un.</div>` : `<div class="st ok">${p.stock > 0 ? '✔ Stock disponible' : '<span class="bad">Agotado</span>'}</div>`;
    return `<div class="card">${p.antes ? '<div class="badge">OFERTA</div>' : ''}
      <div class="pimg"><img src="${(window.IMG_URL && IMG_URL[p.id]) || 'img/' + p.id + '.png'}" alt="${p.nombre}" loading="lazy" onerror="if(!this.dataset.t){this.dataset.t=1;this.src='img/${p.id}.jpg'}else{this.onerror=null;this.src=imgIA(${p.id})}"></div>
      <div><span class="cat">${p.categoria} › ${p.sub}</span><h4>${p.nombre}</h4>${st}
      <span class="price">${f(p.precio)}</span>${p.antes ? `<span class="old">${f(p.antes)}</span>` : ''}</div>
      <button class="btn-add" onclick="agregar(${p.id})" ${p.stock <= 0 ? 'disabled' : ''}>${p.stock > 0 ? 'Agregar' : 'Agotado'}</button></div>`;
  }).join('');
}

function agregar(id) {
  const p = prod(id); if (!p || p.stock <= 0) return;
  const it = carrito.find(i => i.id === id);
  if (it) { if (it.cantidad >= p.stock) { alert('Stock máximo alcanzado.'); return; } it.cantidad++; }
  else carrito.push({ id, nombre: p.nombre, precio: p.precio, cantidad: 1 });
  renderCarrito();
}

function cambiar(id, d) {
  const it = carrito.find(i => i.id === id), p = prod(id);
  if (d > 0 && it.cantidad >= p.stock) { alert('Stock máximo alcanzado.'); return; }
  it.cantidad += d; if (it.cantidad <= 0) carrito = carrito.filter(i => i.id !== id);
  renderCarrito();
}

function vaciar() { carrito = []; renderCarrito(); }
const descuento = (sub, un) => un >= 10 ? sub * .1 : un >= 5 ? sub * .05 : 0;

function renderCarrito() {
  let sb = 0, un = 0, mal = false;
  if (!carrito.length) $('cart-items').innerHTML = '<li class="vacio">Tu carrito está vacío</li>';
  else $('cart-items').innerHTML = carrito.map(i => {
    const p = prod(i.id), r = p.stock - i.cantidad; sb += i.precio * i.cantidad; un += i.cantidad; if (r < 0) mal = true;
    const info = esAdmin() ? `<small class="${r < 0 ? 'bad' : r < 10 ? 'warn' : 'ok'}">Stock ${p.stock} → quedaría ${r}${r < 0 ? ' ⚠ insuficiente' : ''}</small>` : '';
    return `<li class="ci"><div>${i.nombre}${info}</div><div class="q"><button onclick="cambiar(${i.id},-1)">−</button>${i.cantidad}<button onclick="cambiar(${i.id},1)">+</button></div><b>${f(i.precio * i.cantidad)}</b></li>`;
  }).join('');
  const d = descuento(sb, un), t = sb - d;
  $('subtotal').textContent = f(sb); $('discount').textContent = '- ' + f(d); $('total').textContent = f(t);
  $('aviso').innerHTML = !carrito.length ? '' : mal ? '<span class="bad">⚠ Hay productos sin stock suficiente. Baja la cantidad o repón stock en Inventario.</span>' : '<span class="ok">✔ Hay stock disponible para todo el pedido.</span>';
  $('btn-process').disabled = !carrito.length || mal;
  const wa = $('whatsapp-btn'); wa.style.display = carrito.length ? 'block' : 'none';
  if (carrito.length) {
    const msgText = 'Hola, deseo realizar este pedido en *Multiconstrucciones Río Santa S.A.C.*:\n' + carrito.map(i => `- ${i.nombre} (x${i.cantidad}): ${f(i.precio * i.cantidad)}`).join('\n') + `\n\n*TOTAL:* ${f(t)}`;
    wa.href = 'https://wa.me/51954175106?text=' + encodeURIComponent(msgText);
  }
  if (actual === 'inv') renderInv();
}

function procesar() {
  if (!carrito.length) return;
  let sb = 0, un = 0;
  carrito.forEach(i => { sb += i.precio * i.cantidad; un += i.cantidad; });
  const d = descuento(sb, un);
  const totalPagar = sb - d;
  $('yape-monto-total').textContent = f(totalPagar);
  abrir('yapeModal');
}

async function confirmarPagoYape() {
  cerrar('yapeModal');
  $('btn-process').disabled = true;
  try {
    const d = await api('order.php', {
      method: 'POST',
      body: JSON.stringify({ items: carrito.map(i => ({ id: i.id, cantidad: i.cantidad })) })
    });
    const v = d.venta || {
      items: carrito.map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precio: i.precio })),
      fecha: new Date().toLocaleString(),
      boleta: 'B001-' + (d.venta_id || '001'),
      subtotal: carrito.reduce((acc, i) => acc + (i.precio * i.cantidad), 0),
      descuento: 0,
      total: d.total || carrito.reduce((acc, i) => acc + (i.precio * i.cantidad), 0)
    };
    
    // Registrar movimientos de venta localmente
    const ahora = new Date();
    const fechaHoraStr = ahora.toLocaleDateString('es-PE') + ' ' + ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    carrito.forEach(item => {
      if (!historialMovimientos[item.id]) historialMovimientos[item.id] = [];
      historialMovimientos[item.id].unshift({
        fecha: fechaHoraStr,
        detalle: 'Venta ' + v.boleta,
        tipo: 'Salida',
        cantidad: -item.cantidad,
        usuario: user ? (user.nombre || user) : 'admin'
      });
    });
    localStorage.setItem('rio_santa_movs', JSON.stringify(historialMovimientos));

    $('ticket-items').innerHTML = v.items.map(i =>
      `<tr><td>${i.cantidad}x ${escHtml(i.nombre)}</td><td>S/${Number(i.precio).toFixed(2)}</td><td>S/${(i.precio * i.cantidad).toFixed(2)}</td></tr>`).join('');
    $('ticket-fecha').textContent = 'Fecha: ' + v.fecha;
    $('ticket-n').textContent = 'BOLETA DE VENTA - ' + v.boleta;
    $('t-sub').textContent = f(v.subtotal); $('t-desc').textContent = '- ' + f(v.descuento); $('t-tot').textContent = f(v.total);
    
    crearPDF({
      n: v.boleta, fecha: v.fecha,
      items: v.items.map(i => ({ cant: i.cantidad, nombre: i.nombre, precio: i.precio })),
      sb: v.subtotal, d: v.descuento, t: v.total
    });
    
    abrir('receiptModal');
    carrito = [];
  } catch (err) {
    alert(err.message);
  }
  try { await cargarProductos(); } catch (e) {}
  renderProductos(); renderCarrito();
}

let pdfURL = null;
function crearPDF(d) {
  const W = 74, lat = t => String(t).replace(/[^\x20-\xFF]/g, '?'), esc = t => lat(t).replace(/[\\()]/g, '\\$&');
  const ctr = t => ' '.repeat(Math.max(0, Math.floor((W - t.length) / 2))) + t, m = n => 'S/ ' + n.toFixed(2);
  const L = [], add = (t, b) => L.push({ t, b });
  add(ctr('MULTICONSTRUCCIONES RÍO SANTA S.A.C.'), 1);
  add(ctr('RUC: 20601234567')); add(ctr('Huaral, Perú')); add('');
  add(ctr('BOLETA DE VENTA ELECTRÓNICA'), 1); add(ctr(d.n), 1); add(ctr('Fecha: ' + d.fecha)); add('');
  add('Cant. / Descripción'.padEnd(52) + 'P.Unit'.padStart(10) + 'Importe'.padStart(12), 1);
  add('-'.repeat(W));
  d.items.forEach(i => {
    const ls = []; let cur = '';
    (i.cant + 'x ' + i.nombre).split(' ').forEach(w => { if ((cur + ' ' + w).trim().length > 50) { ls.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    ls.push(cur);
    ls.forEach((t, k) => add(k ? '   ' + t : t.padEnd(52) + m(i.precio).padStart(10) + m(i.precio * i.cant).padStart(12)));
  });
  add('-'.repeat(W));
  add('Subtotal:'.padEnd(W - 14) + m(d.sb).padStart(14));
  add('Descuento:'.padEnd(W - 14) + ('- ' + m(d.d)).padStart(14));
  add('TOTAL A PAGAR:'.padEnd(W - 14) + m(d.t).padStart(14), 1);
  add(''); add(ctr('¡Gracias por su compra en Multiconstrucciones Río Santa!'));
  const PER = 62, pages = []; for (let i = 0; i < L.length; i += PER) pages.push(L.slice(i, i + PER));
  const o = [];
  o[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  o[2] = '<< /Type /Pages /Kids [' + pages.map((_, i) => (5 + 2 * i) + ' 0 R').join(' ') + '] /Count ' + pages.length + ' >>';
  o[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>';
  o[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>';
  pages.forEach((pg, i) => {
    const c = 'BT\n12 TL\n50 800 Td\n' + pg.map(l => '/' + (l.b ? 'F2' : 'F1') + ' 10 Tf (' + esc(l.t) + ') Tj T*').join('\n') + '\nET';
    o[5 + 2 * i] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ' + (6 + 2 * i) + ' 0 R >>';
    o[6 + 2 * i] = '<< /Length ' + c.length + ' >>\nstream\n' + c + '\nendstream';
  });
  let out = '%PDF-1.4\n'; const off = [];
  for (let i = 1; i < o.length; i++) { off[i] = out.length; out += i + ' 0 obj\n' + o[i] + '\nendobj\n'; }
  const x = out.length;
  out += 'xref\n0 ' + o.length + '\n0000000000 65535 f \n' + off.slice(1).map(v => String(v).padStart(10, '0') + ' 00000 n \n').join('');
  out += 'trailer\n<< /Size ' + o.length + ' /Root 1 0 R >>\nstartxref\n' + x + '\n%%EOF';
  const u8 = new Uint8Array(out.length); for (let i = 0; i < out.length; i++) u8[i] = out.charCodeAt(i) & 255;
  if (pdfURL) URL.revokeObjectURL(pdfURL);
  pdfURL = URL.createObjectURL(new Blob([u8], { type: 'application/pdf' }));
  const a = $('pdf-link'); a.href = pdfURL; a.download = 'Boleta_' + d.n + '.pdf';
}

function renderInv() {
  $('inv-body').innerHTML = filtrados().map(p => {
    const c = (carrito.find(i => i.id === p.id) || { cantidad: 0 }).cantidad, r = p.stock - c;
    const e = p.stock <= 0 ? ['Agotado', 'bad'] : r < 0 ? ['Insuficiente', 'bad'] : r < 10 ? ['Stock bajo', 'warn'] : ['OK', 'ok'];
    return `<tr><td>${p.nombre}</td><td>${p.sub}</td>
      <td><div class="num"><button onclick="ajustar(${p.id},-1)">−</button><input type="number" min="0" value="${p.stock}" onchange="setStock(${p.id},this.value)"><button onclick="ajustar(${p.id},1)">+</button></div></td>
      <td>${c}</td><td class="${e[1]}"><b>${r}</b></td><td><span class="pill ${e[1]}">${e[0]}</span></td></tr>`;
  }).join('') || '<tr><td colspan="6" class="vacio">No hay productos en esta selección.</td></tr>';
}

async function setStock(id, v) {
  const n = Math.max(0, parseInt(v) || 0);
  try {
    await api('products.php', { method: 'PUT', body: JSON.stringify({ id, stock: n }) });
    prod(id).stock = n;
  } catch (err) { alert(err.message); }
  renderCarrito();
  if (actual !== 'inv') renderProductos();
}

function ajustar(id, d) { setStock(id, prod(id).stock + d); }

async function resetStock() {
  if (!confirm('¿Volver al stock inicial de todos los productos?')) return;
  try {
    await api('products.php', { method: 'POST', body: JSON.stringify({ action: 'reset' }) });
    await cargarProductos();
    renderCarrito();
  } catch (err) { alert(err.message); }
}

async function renderVentas() {
  const tb = $('ventas-body');
  try {
    const d = await api('sales.php');
    ventas = d.ventas;
    tb.innerHTML = ventas.length
      ? ventas.map(v => `<tr><td>${escHtml(v.n)}</td><td>${escHtml(v.fecha)}</td><td>${escHtml(v.items)}</td><td><b>${f(v.total)}</b></td></tr>`).join('')
      : '<tr><td colspan="4" class="vacio">Aún no hay ventas. Emite un comprobante desde la Tienda.</td></tr>';
  } catch (err) {
    tb.innerHTML = `<tr><td colspan="4" class="vacio">${escHtml(err.message)}</td></tr>`;
  }
}

async function borrarVentas() {
  if (!confirm('¿Borrar el historial de ventas?')) return;
  try { await api('sales.php', { method: 'DELETE' }); renderVentas(); }
  catch (err) { alert(err.message); }
}

/* ========================================================================== */
/* SECCIÓN DE REPORTES Y MANTENIMIENTO DE STOCK                                 */
/* ========================================================================== */
let productoSeleccionadoAjuste = null;
const historialMovimientos = JSON.parse(localStorage.getItem('rio_santa_movs') || '{}');
let reportesBaseData = { ventas: 17, total: 1771.5, valor: 0, bajos: [], porCat: {} };

async function renderRep() {
  const cont = $('rep-body');
  try {
    const d = await api('reports.php');
    if (d) reportesBaseData = d;
  } catch (err) {}

  // Recalcular montos por categoría directamente de los productos en memoria
  const inventarioPorCat = {};
  let totalValorInventario = 0;
  const bajosList = [];

  productos.forEach(p => {
    const val = p.precio * p.stock;
    inventarioPorCat[p.categoria] = (inventarioPorCat[p.categoria] || 0) + val;
    totalValorInventario += val;
    if (p.stock < 10) bajosList.push(p);
  });

  const porCat = Object.keys(TREE).map(c => [c, inventarioPorCat[c] || 0]);
  const maxVal = Math.max(...porCat.map(x => x[1]), 1);

  cont.innerHTML = `
    <!-- PANEL 1: SELECCIÓN DE PRODUCTO -->
    <div class="panel" style="border-left: 4px solid var(--or);">
      <h3 style="color:var(--or); margin-bottom:.8rem; font-size:.9rem; text-transform:uppercase; letter-spacing:1px;">PRODUCTO</h3>
      <div style="display:grid; grid-template-columns: 2fr 100px 100px 2.5fr 80px 80px; gap:10px; align-items:end;">
        <div class="form-group" style="margin:0"><label>Código o nombre</label><input type="text" id="ajuste-busqueda" placeholder="clavos" onkeyup="if(event.key==='Enter')buscarProductoParaAjuste()"></div>
        <div><button type="button" class="btn-submit" onclick="buscarProductoParaAjuste()" style="padding:.7rem; margin:0;">Buscar</button></div>
        <div class="form-group" style="margin:0"><label>Código</label><input type="text" id="ajuste-codigo" readonly style="background:#090b0e!important; text-align:center;"></div>
        <div class="form-group" style="margin:0"><label>Producto</label><input type="text" id="ajuste-nombre" readonly style="background:#090b0e!important"></div>
        <div class="form-group" style="margin:0"><label>Stock actual</label><input type="text" id="ajuste-stock-actual" readonly style="background:#090b0e!important; text-align:center; font-weight:bold;"></div>
        <div class="form-group" style="margin:0"><label>Unidad</label><input type="text" id="ajuste-unidad" readonly style="background:#090b0e!important; text-align:center"></div>
      </div>
    </div>

    <!-- PANEL 2: REGISTRO DE AJUSTE O MERMA -->
    <div class="panel" style="border-left: 4px solid var(--or);">
      <h3 style="color:var(--or); margin-bottom:.8rem; font-size:.9rem; text-transform:uppercase; letter-spacing:1px;">AJUSTE</h3>
      <div style="display:grid; grid-template-columns: 1.5fr 1fr 1fr 1.5fr 1.5fr; gap:10px;">
        <div class="form-group" style="margin:0"><label>Tipo de ajuste</label>
          <select id="ajuste-tipo" class="form-group input" style="width:100%; padding:.7rem; background:#0B0E11; border:1px solid var(--bd); color:var(--ink); border-radius:0;" onchange="calcularStockResultante()">
            <option value="Merma">Merma</option>
            <option value="Salida">Salida</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Ajuste (-) Faltante">Ajuste (-) Faltante</option>
            <option value="Ajuste (+) Sobrante">Ajuste (+) Sobrante</option>
          </select>
        </div>
        <div class="form-group" style="margin:0"><label>Cantidad</label><input type="number" id="ajuste-cantidad" min="0" step="any" placeholder="0" oninput="calcularStockResultante()"></div>
        <div class="form-group" style="margin:0"><label>Stock resultante</label><input type="text" id="ajuste-stock-resultante" readonly style="background:#090b0e!important; text-align:center; font-weight:bold; color:var(--or)"></div>
        <div class="form-group" style="margin:0"><label>Registrado por</label><input type="text" id="ajuste-registrado" readonly style="background:#090b0e!important"></div>
        <div class="form-group" style="margin:0"><label>Fecha</label><input type="text" id="ajuste-fecha" readonly style="background:#090b0e!important"></div>
      </div>
      <div class="form-group" style="margin-top:10px"><label>Motivo / justificación (obligatorio)</label><input type="text" id="ajuste-motivo" placeholder="Clavos oxidados por humedad, retirados del almacén"></div>
    </div>

    <!-- PANEL 3: ÚLTIMOS MOVIMIENTOS -->
    <div class="panel">
      <h3 style="color:var(--or); margin-bottom:.8rem; font-size:.9rem; text-transform:uppercase; letter-spacing:1px;">ÚLTIMOS MOVIMIENTOS DEL PRODUCTO</h3>
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr><th>Fecha y hora</th><th>Detalle</th><th>Tipo</th><th>Cantidad</th><th>Usuario</th></tr>
          </thead>
          <tbody id="ajuste-tabla-movimientos">
            <tr><td colspan="5" class="vacio">Selecciona un producto para ver sus movimientos.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- BOTONES DE ACCIÓN -->
    <div style="display:flex; justify-content:flex-end; gap:10px; margin-bottom:2rem;">
      <button type="button" class="btn-submit" onclick="grabarAjusteStock()" style="max-width:140px; background:linear-gradient(135deg,#16a34a,#15803d); margin:0;">Grabar</button>
      <button type="button" class="btn-reset" onclick="limpiarFormularioAjuste()" style="margin:0; max-width:140px;">Limpiar</button>
      <button type="button" class="btn-clear" onclick="vista('tienda')" style="max-width:140px;">Salir</button>
    </div>

    <!-- RESUMEN FINANCIERO Y DE INVENTARIO POR CATEGORÍA -->
    <h3 style="margin-bottom:1rem; color:var(--ink);">📊 Resumen Financiero y de Inventario</h3>
    <div class="kpis">
      <div class="kpi">Ventas emitidas<b id="kpi-ventas">${reportesBaseData.ventas || 17}</b></div>
      <div class="kpi">Total vendido<b id="kpi-total">${f(reportesBaseData.total || 1771.5)}</b></div>
      <div class="kpi">Valor del inventario<b id="kpi-valor">${f(totalValorInventario)}</b></div>
      <div class="kpi">Productos stock bajo<b class="${bajosList.length ? 'bad':'ok'}" id="kpi-bajos">${bajosList.length}</b></div>
    </div>
    
    <div class="panel">
      <h3>Valor del inventario por categoría</h3>
      ${porCat.map(([c, v]) => `
        <div class="brow">
          <span>${escHtml(c)}</span>
          <div><div class="bar" style="width:${maxVal ? (v / maxVal * 100) : 0}%"></div></div>
          <b>${f(v)}</b>
        </div>
      `).join('')}
    </div>

    <div class="panel">
      <h3>⚠ Reponer pronto (menos de 10 unidades)</h3>
      ${bajosList.length
        ? bajosList.map(p => `<div class="brow" style="grid-template-columns:1fr auto"><span>${escHtml(p.nombre)}</span><b class="${p.stock <= 0 ? 'bad' : 'warn'}">${p.stock} un.</b></div>`).join('')
        : '<p class="ok">Todo el stock está sobre 10 unidades.</p>'}
    </div>
  `;

  seleccionarProductoAjuste(12);
}

function buscarProductoParaAjuste() {
  const query = $('ajuste-busqueda').value.trim().toLowerCase();
  const encontrado = productos.find(p => String(p.id) === query || p.nombre.toLowerCase().includes(query));
  if (encontrado) {
    seleccionarProductoAjuste(encontrado.id);
  } else {
    alert('Producto no encontrado. Intenta con otro nombre o código.');
  }
}

function seleccionarProductoAjuste(id) {
  const p = prod(id);
  if (!p) return;
  productoSeleccionadoAjuste = p;
  $('ajuste-codigo').value = String(p.id).padStart(6, '0');
  $('ajuste-nombre').value = p.nombre;
  $('ajuste-stock-actual').value = p.stock;
  $('ajuste-unidad').value = (p.nombre.toLowerCase().includes('kg') || (p.sub && p.sub.toLowerCase().includes('kg'))) ? 'Kg' : (p.sub && p.sub.toLowerCase().includes('m³')) ? 'm³' : 'Unid.';
  
  const ahora = new Date();
  $('ajuste-fecha').value = ahora.toLocaleDateString('es-PE');
  $('ajuste-registrado').value = user ? (user.nombre || user) : 'admin';

  calcularStockResultante();
  renderMovimientosIndividuales(p.id);
  
}

function calcularStockResultante() {
  if (!productoSeleccionadoAjuste) return;
  const stockActual = Number(productoSeleccionadoAjuste.stock);
  const cantidad = Number($('ajuste-cantidad').value) || 0;
  const tipo = $('ajuste-tipo').value;

  let resultante = stockActual;
  if (tipo === 'Merma' || tipo === 'Salida' || tipo === 'Ajuste (-) Faltante') {
    resultante = stockActual - cantidad;
  } else if (tipo === 'Ingreso' || tipo === 'Ajuste (+) Sobrante') {
    resultante = stockActual + cantidad;
  }
  $('ajuste-stock-resultante').value = resultante;
}

function grabarAjusteStock() {
  if (!productoSeleccionadoAjuste) {
    alert('Primero selecciona un producto.');
    return;
  }
  const cantidad = Number($('ajuste-cantidad').value);
  if (!cantidad || cantidad <= 0) {
    alert('Ingresa una cantidad válida.');
    return;
  }
  const motivo = $('ajuste-motivo').value.trim();
  if (!motivo) {
    alert('El motivo / justificación es obligatorio.');
    return;
  }

  const tipo = $('ajuste-tipo').value;
  const nuevoStock = Number($('ajuste-stock-resultante').value);
  if (nuevoStock < 0) {
    alert('El stock resultante no puede ser negativo.');
    return;
  }

  // 1. Actualizar stock del producto
  productoSeleccionadoAjuste.stock = nuevoStock;
  const pid = productoSeleccionadoAjuste.id;

  // 2. Formatear movimiento
  const ahora = new Date();
  const fechaHoraStr = ahora.toLocaleDateString('es-PE') + ' ' + ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  let signoCant = (tipo === 'Merma' || tipo === 'Salida' || tipo === 'Ajuste (-) Faltante') ? -cantidad : +cantidad;

  // 3. Guardar en memoria local
  if (!historialMovimientos[pid]) historialMovimientos[pid] = [];
  historialMovimientos[pid].unshift({
    fecha: fechaHoraStr,
    detalle: motivo,
    tipo: tipo,
    cantidad: signoCant,
    usuario: user ? (user.nombre || user) : 'admin'
  });

  localStorage.setItem('rio_santa_movs', JSON.stringify(historialMovimientos));

  // 4. Actualizar interfaz inmediatamente
  renderMovimientosIndividuales(pid);
  if ($('ajuste-stock-actual')) $('ajuste-stock-actual').value = nuevoStock;

  alert('✔ Ajuste registrado y stock actualizado con éxito.');

  // 5. Limpiar formulario
  $('ajuste-cantidad').value = '';
  $('ajuste-stock-resultante').value = '';
  $('ajuste-motivo').value = '';

  if (actual === 'inv') renderInv();
}

function limpiarFormularioAjuste() {
  if ($('ajuste-busqueda')) $('ajuste-busqueda').value = '';
  if ($('ajuste-codigo')) $('ajuste-codigo').value = '';
  if ($('ajuste-nombre')) $('ajuste-nombre').value = '';
  if ($('ajuste-stock-actual')) $('ajuste-stock-actual').value = '';
  if ($('ajuste-unidad')) $('ajuste-unidad').value = '';
  if ($('ajuste-cantidad')) $('ajuste-cantidad').value = '';
  if ($('ajuste-stock-resultante')) $('ajuste-stock-resultante').value = '';
  if ($('ajuste-motivo')) $('ajuste-motivo').value = '';
  productoSeleccionadoAjuste = null;
  if ($('ajuste-tabla-movimientos')) $('ajuste-tabla-movimientos').innerHTML = '<tr><td colspan="5" class="vacio">Selecciona un producto para ver sus movimientos.</td></tr>';
}

function renderMovimientosIndividuales(pid) {
  const tbody = $('ajuste-tabla-movimientos');
  if (!tbody) return;

  if (!historialMovimientos[pid]) {
    historialMovimientos[pid] = [
      { fecha: '09/11/2026 09:15', detalle: 'Venta V-000230', tipo: 'Salida', cantidad: -3, usuario: 'admin' },
      { fecha: '08/11/2026 17:40', detalle: 'Recepción REC-000045', tipo: 'Ingreso', cantidad: 50, usuario: 'mtorres' },
      { fecha: '07/11/2026 11:05', detalle: 'Conteo físico (faltante)', tipo: 'Ajuste', cantidad: -2, usuario: 'admin' }
    ];
  }

  const movs = historialMovimientos[pid];

  if (movs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="vacio">No hay movimientos registrados para este producto todavía. Realiza un ajuste o una venta.</td></tr>';
    return;
  }

  tbody.innerHTML = movs.map(m => `
    <tr>
      <td>${escHtml(m.fecha)}</td>
      <td>${escHtml(m.detalle)}</td>
      <td><span class="pill ${m.cantidad < 0 ? 'bad' : 'ok'}">${escHtml(m.tipo)}</span></td>
      <td class="${m.cantidad < 0 ? 'bad' : 'ok'}"><b>${m.cantidad > 0 ? '+' : ''}${m.cantidad}</b></td>
      <td>${escHtml(m.usuario)}</td>
    </tr>
  `).join('');
}

function verClave() { const i = $('password'); i.type = i.type === 'password' ? 'text' : 'password'; $('eye').textContent = i.type === 'password' ? '👁️' : '🙈'; }
function abrir(id) { $(id).style.display = 'flex'; }
function cerrar(id) { $(id).style.display = 'none'; }

api('login.php').then(d => entrar(d.usuario)).catch(() => {});

/* ========== GENERADOR DE SVG PARA IMÁGENES ========== */
function imgIA(id) {
  const p = prod(id) || {}, cats = Object.keys(TREE), i = Math.max(0, cats.indexOf(p.categoria));
  const pal = [['#FFC400', '#FF9F00'], ['#38bdf8', '#0369a1'], ['#a78bfa', '#6d28d9'], ['#f472b6', '#be185d'],
             ['#fb923c', '#c2410c'], ['#facc15', '#a16207'], ['#94a3b8', '#334155'], ['#34d399', '#047857'],
             ['#f87171', '#b91c1c'], ['#fbbf24', '#92400e']][i % 10];
  const ico = TREE[p.categoria] ? TREE[p.categoria][0] : '📦';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[1]}"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#g)"/>
    <circle cx="330" cy="50" r="90" fill="#fff" opacity=".12"/>
    <circle cx="60" cy="280" r="110" fill="#000" opacity=".12"/>
    <text x="200" y="175" font-size="120" text-anchor="middle">${ico}</text>
    <text x="200" y="262" font-size="22" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">${escHtml(p.sub || p.categoria || '')}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
window.IMG_URL = {};

/* ========== MÓDULO DE ACCESIBILIDAD Y BÚSQUEDA POR VOZ ========== */
let zoomGlobalActivo = false;
let modoDaltonismoActivo = false;
let modoVozGlobalActivo = false;

function toggleZoomGeneral() {
  zoomGlobalActivo = !zoomGlobalActivo;
  document.body.classList.toggle('zoom-global-active', zoomGlobalActivo);
  const btnZoom = document.getElementById('btn-zoom-control');
  if (btnZoom) btnZoom.classList.toggle('acc-btn-active', zoomGlobalActivo);
  alert(zoomGlobalActivo ? "🔍 Zoom global activado." : "🔍 Zoom global desactivado.");
}

function toggleDaltonismo() {
  modoDaltonismoActivo = !modoDaltonismoActivo;
  document.body.classList.toggle('daltonismo-mode', modoDaltonismoActivo);
  const btnDaltonismo = document.getElementById('btn-daltonismo-control');
  if (btnDaltonismo) btnDaltonismo.classList.toggle('acc-btn-active', modoDaltonismoActivo);
  alert(modoDaltonismoActivo ? "👁️‍🗨️ Modo daltonismo activado." : "👁️‍🗨️ Modo daltonismo desactivado.");
}

function toggleModoVozGlobal() {
  modoVozGlobalActivo = !modoVozGlobalActivo;
  const btnAudio = document.getElementById('btn-audio-control');
  if (btnAudio) btnAudio.classList.toggle('acc-btn-active', modoVozGlobalActivo);

  if (modoVozGlobalActivo) {
    alert("🔊 Lector global activado.");
  } else {
    window.speechSynthesis.cancel();
    alert("🔊 Lector global desactivado.");
  }
}

document.addEventListener('mouseover', (e) => {
  if (!modoVozGlobalActivo) return;
  const elemento = e.target;
  if (elemento.tagName === 'BODY' || elemento.tagName === 'HTML' || elemento.closest('#accessibility-bar')) return;
  const texto = elemento.innerText ? elemento.innerText.trim() : '';
  if (texto && texto.length < 150 && !elemento.dataset.vozLeido) {
    elemento.dataset.vozLeido = "true";
    setTimeout(() => { delete elemento.dataset.vozLeido; }, 4000);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-PE';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const inputBuscador = document.getElementById('input-search');
    if (inputBuscador && !document.getElementById('mic-search-btn')) {
      const contenedorInput = inputBuscador.parentElement;
      if (contenedorInput) {
        contenedorInput.style.display = 'flex';
        contenedorInput.style.alignItems = 'center';
        contenedorInput.style.gap = '12px';
        inputBuscador.style.paddingRight = '15px';

        const micBtn = document.createElement('button');
        micBtn.id = 'mic-search-btn';
        micBtn.className = 'mic-search-btn';
        micBtn.type = 'button';
        micBtn.title = 'Buscar producto por voz';
        micBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>';

        micBtn.onclick = function() {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!SpeechRecognition) {
            alert('Tu navegador no soporta búsqueda por voz. Usa Google Chrome.');
            return;
          }

          const recognition = new SpeechRecognition();
          recognition.lang = 'es-PE';
          micBtn.classList.add('mic-listening');
          recognition.start();

          recognition.onresult = function(event) {
            const textoEscuchado = event.results[0][0].transcript;
            inputBuscador.value = textoEscuchado;
            inputBuscador.focus();
            inputBuscador.dispatchEvent(new Event('input', { bubbles: true }));
            inputBuscador.dispatchEvent(new Event('keyup', { bubbles: true }));
            micBtn.classList.remove('mic-listening');
          };
          recognition.onerror = function() { micBtn.classList.remove('mic-listening'); };
          recognition.onend = function() { micBtn.classList.remove('mic-listening'); };
        };
        contenedorInput.appendChild(micBtn);
      }
    }
  }, 800);
});