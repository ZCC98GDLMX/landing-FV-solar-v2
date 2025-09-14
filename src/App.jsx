import React, { useMemo, useState } from "react";

// ⚡ Landing page para negocio de energía solar en Guadalajara
// - Un solo archivo React (TailwindCSS por CDN en index.html)
// - Incluye: Hero, Servicios, Beneficios, Calculadora simple, Testimonios, Proceso, FAQs, Formulario, Aviso de Privacidad
// - Acciones: WhatsApp prellenado, mailto, y formulario con manejo básico (console + alerta)
// 🔧 Personaliza las constantes de CONTACTO más abajo.

const CONTACTO = {
  negocio: "Energía Solar GDL",
  telefono: "+523312345678", // Formato internacional para WhatsApp
  telefonoBonito: "33 1234 5678",
  email: "ventas@energiasolargdl.mx",
  politicaPrivacidadURL: "https://tu-dominio.com/aviso-de-privacidad", // reemplaza por tu URL real
  cobertura: "Guadalajara, Zapopan y alrededores",
};

const beneficios = [
  { title: "Ahorro en tu recibo", desc: "Reduce hasta 95% tu pago de luz dependiendo de tu consumo y techo disponible.", icon: "💸" },
  { title: "Garantía larga", desc: "Paneles con garantía de potencia hasta 25 años y equipos certificados.", icon: "🛡️" },
  { title: "Instalación profesional", desc: "Equipo técnico con experiencia residencial y comercial.", icon: "🛠️" },
  { title: "Financiamiento", desc: "Opciones para pagar a plazos y deducibilidad para empresas.", icon: "🏦" },
];

const servicios = [
  {
    title: "Paneles Solares (FV)",
    desc: "Sistemas fotovoltaicos residenciales y comerciales a la medida.",
    bullets: ["Levantamiento y diseño", "Instalación en 1–3 días", "Monitoreo y garantía"],
  },
  {
    title: "Calentadores Solares",
    desc: "Ahorra gas con termosifón o presurizado según tus hábitos.",
    bullets: ["Cálculo de capacidad", "Instalación segura", "Mantenimiento y refacciones"],
  },
  {
    title: "Mantenimiento",
    desc: "Limpieza, revisión eléctrica/hidráulica, cambio de componentes.",
    bullets: ["Limpieza profesional", "Pruebas eléctricas", "Garantía de servicio"],
  },
];

const faqs = [
  {
    q: "¿En cuánto tiempo recupero la inversión?",
    a: "Usualmente entre 2 y 5 años según tu consumo y tarifa. La calculadora te da una referencia rápida.",
  },
  {
    q: "¿Trabajan en toda el área metropolitana?",
    a: `Sí, cubrimos ${CONTACTO.cobertura}.`,
  },
  {
    q: "¿Puedo deducir impuestos?",
    a: "Personas morales pueden deducir y mejorar flujo; te orientamos con tu contador.",
  },
  {
    q: "¿Ofrecen garantía?",
    a: "Sí: garantía de instalación y fabricantes (módulos hasta 25 años de potencia).",
  },
];

function whatsappLink(mensaje) {
  const text = encodeURIComponent(mensaje);
  return `https://wa.me/${CONTACTO.telefono.replace(/\D/g, "")}?text=${text}`;
}

export default function SolarLanding() {
  const [consumoMXN, setConsumoMXN] = useState(1200);
  const [tipoInmueble, setTipoInmueble] = useState("Casa");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [colonia, setColonia] = useState("");

  // 🔢 Calculadora sencilla (estimada):
  // Supuestos aproximados para referencia educativa.
  // - Relación MXN→kWh estimada por tarifa doméstica (ajústalo según tu experiencia).
  // - Ahorro del 90% con FV bien dimensionado.
  const calc = useMemo(() => {
    const precioKWh = 2.8; // MXN/kWh (referencial), ajusta a tu realidad local
    const kWhMes = Math.max(1, consumoMXN / precioKWh);
    // tamaño de sistema (kWp) ≈ kWhMes / (producción mensual por kWp ~ 140 kWh/kWp en GDL)
    const kWhPorkWpMes = 140; // aproximado para GDL
    const sistemaKwp = +(kWhMes / kWhPorkWpMes).toFixed(2);
    const ahorroMensual = +(consumoMXN * 0.9).toFixed(0);
    const costoSistemaMXN = Math.max(20000, Math.round(sistemaKwp * 25000)); // sup. 25k por kWp
    const paybackMeses = Math.max(6, Math.round(costoSistemaMXN / Math.max(1, ahorroMensual)));
    return { kWhMes, sistemaKwp, ahorroMensual, costoSistemaMXN, paybackMeses };
  }, [consumoMXN]);

  const leadMessage = useMemo(() => {
    return (
      `Hola, soy ${nombre || "[Tu nombre]"}. Me interesa una cotización de ${tipoInmueble} en ${colonia || "[colonia]"}. ` +
      `Pago ~$${consumoMXN} al mes de luz. Estimado de sistema: ${calc.sistemaKwp} kWp, ahorro ~$${calc.ahorroMensual}/mes. ` +
      `Contacto: ${telefono || "[tel]"} | ${email || "[email]"}`
    );
  }, [nombre, tipoInmueble, colonia, consumoMXN, calc, telefono, email]);

  function onSubmit(e) {
    e.preventDefault();
    // Aquí puedes integrar tu backend, Zapier o Google Sheets
    console.log({ nombre, email, telefono, colonia, consumoMXN, tipoInmueble, calc });
    alert("¡Gracias! Hemos recibido tu solicitud. Te contactaremos a la brevedad.");
    // Redirigir a WhatsApp con mensaje prellenado (opcional):
    window.location.href = whatsappLink(leadMessage);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="font-semibold">{CONTACTO.negocio}</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#servicios" className="hover:text-slate-900">Servicios</a>
            <a href="#beneficios" className="hover:text-slate-900">Beneficios</a>
            <a href="#calculadora" className="hover:text-slate-900">Calculadora</a>
            <a href="#testimonios" className="hover:text-slate-900">Testimonios</a>
            <a href="#contacto" className="hover:text-slate-900">Contacto</a>
          </nav>
          <a
            href={whatsappLink("Hola, deseo una cotización de energía solar.")}
            className="rounded-xl px-4 py-2 bg-emerald-600 text-white text-sm font-medium shadow hover:bg-emerald-700"
          >WhatsApp</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Ahorra hasta <span className="text-emerald-600">95%</span> en tu recibo de luz
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Instalamos <strong>paneles solares</strong> y <strong>calentadores solares</strong> en {CONTACTO.cobertura}. 
              Cotización gratuita y profesional.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contacto"
                className="rounded-xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700"
              >Solicitar cotización</a>
              <a
                href="#calculadora"
                className="rounded-xl px-5 py-3 bg-white border border-slate-300 font-semibold hover:bg-slate-50"
              >Estimar ahorro</a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2"><span>✅</span><span>Garantía hasta 25 años</span></div>
              <div className="flex items-center gap-2"><span>✅</span><span>Instalación certificada</span></div>
              <div className="flex items-center gap-2"><span>✅</span><span>Financiamiento</span></div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl bg-[url('https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center shadow-xl ring-1 ring-slate-200"></div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-500">Clientes satisfechos</p>
              <p className="text-2xl font-bold">+350</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Servicios</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.desc}</p>
              <ul className="mt-4 space-y-1 text-sm text-slate-700 list-disc list-inside">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Beneficios</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {beneficios.map((b) => (
              <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
                <div className="text-3xl">{b.icon}</div>
                <h3 className="mt-2 font-semibold">{b.title}</h3>
                <p className="text-slate-600 mt-1 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section id="calculadora" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Calcula tu ahorro</h2>
            <p className="mt-2 text-slate-600">Ingresa tu gasto mensual de luz para estimar tamaño de sistema y tiempo de recuperación.</p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className="text-sm text-slate-600">Gasto mensual (MXN)</label>
              <input
                type="range"
                min={300}
                max={8000}
                step={50}
                value={consumoMXN}
                onChange={(e) => setConsumoMXN(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="mt-2 text-lg font-semibold">${consumoMXN} MXN/mes</div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-slate-500">Tamaño estimado</p>
                  <p className="text-xl font-bold">{calc.sistemaKwp} kWp</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-slate-500">Ahorro mensual</p>
                  <p className="text-xl font-bold">${calc.ahorroMensual}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-slate-500">Costo estimado</p>
                  <p className="text-xl font-bold">${calc.costoSistemaMXN}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-slate-500">Payback</p>
                  <p className="text-xl font-bold">{calc.paybackMeses} meses</p>
                </div>
              </div>

              <a
                href={whatsappLink(
                  `Hola, quiero una cotización. Pago ~$${consumoMXN}/mes, sistema estimado ${calc.sistemaKwp} kWp.`
                )}
                className="mt-6 inline-flex rounded-xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700"
              >Quiero una cotización por WhatsApp</a>
            </div>
          </div>

          {/* FORMULARIO */}
          <div id="contacto" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold">Recibe tu propuesta hoy</h3>
            <p className="text-slate-600 text-sm mt-1">Completa tus datos y te contactamos en menos de 24h.</p>

            <form className="mt-4 space-y-4" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">Nombre</label>
                  <input value={nombre} onChange={(e) => setNombre(e.target.value)} required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Teléfono</label>
                  <input value={telefono} onChange={(e) => setTelefono(e.target.value)} required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Colonia</label>
                  <input value={colonia} onChange={(e) => setColonia(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="text-sm text-slate-600">Tipo de inmueble</label>
                  <select value={tipoInmueble} onChange={(e) => setTipoInmueble(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Casa</option>
                    <option>Negocio</option>
                    <option>Industria</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Gasto de luz (MXN/mes)</label>
                  <input type="number" min={100} step={50} value={consumoMXN} onChange={(e) => setConsumoMXN(parseInt(e.target.value || "0"))} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <button type="submit" className="w-full rounded-xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700">
                Solicitar cotización
              </button>

              <div className="text-xs text-slate-500">
                Al enviar aceptas nuestro <a className="underline" href={CONTACTO.politicaPrivacidadURL} target="_blank" rel="noreferrer">Aviso de Privacidad</a>.
              </div>
            </form>

            <div className="mt-6 grid md:grid-cols-2 gap-3">
              <a href={`mailto:${CONTACTO.email}`} className="text-sm underline">{CONTACTO.email}</a>
              <a href={whatsappLink("Hola, quiero información de paneles/ calentadores/ mantenimiento.")} className="text-sm underline">WhatsApp {CONTACTO.telefonoBonito}</a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Testimonios</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { n: "María G.", t: "Casa en Zapopan", m: "Bajó nuestro recibo de $2,400 a menos de $200. Instalación impecable." },
              { n: "Taller López", t: "Comercio en GDL", m: "La inversión se paga sola. Excelente seguimiento y monitoreo." },
              { n: "Hotel Centro", t: "Calentadores", m: "Agua caliente constante y ahorro importante en gas." },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-700">“{c.m}”</p>
                <div className="mt-4 text-sm text-slate-500">{c.n} • {c.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">¿Cómo trabajamos?</h2>
        <ol className="mt-8 grid md:grid-cols-4 gap-6">
          {[
            { t: "Diagnóstico", d: "Levantamiento y consumo actual." },
            { t: "Diseño", d: "Propuesta técnica/económica a medida." },
            { t: "Instalación", d: "1–3 días con pruebas y puesta en marcha." },
            { t: "Monitoreo", d: "Seguimiento y garantía de desempeño." },
          ].map((p, i) => (
            <li key={p.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-extrabold text-emerald-600">{i + 1}</div>
              <h3 className="mt-2 font-semibold">{p.t}</h3>
              <p className="text-slate-600 text-sm">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Preguntas frecuentes</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-slate-600 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl bg-emerald-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">¿Listo para empezar a ahorrar?</h2>
            <p className="text-emerald-50 mt-2">Agenda tu diagnóstico sin costo hoy mismo.</p>
          </div>
          <div className="flex gap-3">
            <a href="#contacto" className="rounded-xl px-5 py-3 bg-white text-emerald-700 font-semibold shadow">Solicitar cotización</a>
            <a href={whatsappLink("Hola, quiero agendar un diagnóstico sin costo.")} className="rounded-xl px-5 py-3 bg-emerald-700 text-white font-semibold shadow hover:bg-emerald-800">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-600">
          <div>
            <div className="font-semibold">{CONTACTO.negocio}</div>
            <div className="mt-2">{CONTACTO.cobertura}</div>
          </div>
          <div>
            <div className="font-semibold">Contacto</div>
            <div className="mt-2 space-y-1">
              <a href={`mailto:${CONTACTO.email}`} className="underline">{CONTACTO.email}</a>
              <div>Tel: {CONTACTO.telefonoBonito}</div>
              <a className="underline" href={whatsappLink("Hola, deseo información.")}>WhatsApp</a>
            </div>
          </div>
          <div>
            <div className="font-semibold">Legal</div>
            <div className="mt-2 space-y-1">
              <a className="underline" href={CONTACTO.politicaPrivacidadURL} target="_blank" rel="noreferrer">Aviso de Privacidad</a>
              <div className="text-xs">© {new Date().getFullYear()} {CONTACTO.negocio}</div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
