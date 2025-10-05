import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";

// === Datos de ejemplo (puedes reemplazar por tus JSON) ===
const kpis = [
  { labelTop: "20M+", labelBottom: "Registros Analizados" },
  { labelTop: "15", labelBottom: "Dashboards Desplegados" },
  { labelTop: "50+", labelBottom: "Cursos Impartidos" },
  { labelTop: "4", labelBottom: "Universidades donde he dado clase" },
];

// 5 años (60 meses) con tendencia, estacionalidad y ruido controlado
const ingresos5y = [
  { x: "2021-01", ingresos: 100, margen: 35 },
  { x: "2021-02", ingresos: 104, margen: 35 },
  { x: "2021-03", ingresos: 112, margen: 36 },
  { x: "2021-04", ingresos: 108, margen: 36 },
  { x: "2021-05", ingresos: 116, margen: 36 },
  { x: "2021-06", ingresos: 124, margen: 37 },
  { x: "2021-07", ingresos: 120, margen: 37 },
  { x: "2021-08", ingresos: 128, margen: 37 },
  { x: "2021-09", ingresos: 131, margen: 37 },
  { x: "2021-10", ingresos: 135, margen: 38 },
  { x: "2021-11", ingresos: 140, margen: 38 },
  { x: "2021-12", ingresos: 160, margen: 38 },
  { x: "2022-01", ingresos: 118, margen: 36 },
  { x: "2022-02", ingresos: 122, margen: 36 },
  { x: "2022-03", ingresos: 130, margen: 37 },
  { x: "2022-04", ingresos: 126, margen: 37 },
  { x: "2022-05", ingresos: 136, margen: 37 },
  { x: "2022-06", ingresos: 145, margen: 38 },
  { x: "2022-07", ingresos: 142, margen: 38 },
  { x: "2022-08", ingresos: 150, margen: 38 },
  { x: "2022-09", ingresos: 154, margen: 39 },
  { x: "2022-10", ingresos: 160, margen: 39 },
  { x: "2022-11", ingresos: 168, margen: 39 },
  { x: "2022-12", ingresos: 190, margen: 40 },
  { x: "2023-01", ingresos: 150, margen: 38 },
  { x: "2023-02", ingresos: 156, margen: 38 },
  { x: "2023-03", ingresos: 166, margen: 39 },
  { x: "2023-04", ingresos: 162, margen: 39 },
  { x: "2023-05", ingresos: 174, margen: 39 },
  { x: "2023-06", ingresos: 186, margen: 40 },
  { x: "2023-07", ingresos: 182, margen: 40 },
  { x: "2023-08", ingresos: 194, margen: 40 },
  { x: "2023-09", ingresos: 198, margen: 41 },
  { x: "2023-10", ingresos: 206, margen: 41 },
  { x: "2023-11", ingresos: 216, margen: 41 },
  { x: "2023-12", ingresos: 240, margen: 42 },
  { x: "2024-01", ingresos: 210, margen: 40 },
  { x: "2024-02", ingresos: 216, margen: 40 },
  { x: "2024-03", ingresos: 230, margen: 41 },
  { x: "2024-04", ingresos: 226, margen: 41 },
  { x: "2024-05", ingresos: 240, margen: 41 },
  { x: "2024-06", ingresos: 254, margen: 42 },
  { x: "2024-07", ingresos: 248, margen: 42 },
  { x: "2024-08", ingresos: 262, margen: 42 },
  { x: "2024-09", ingresos: 268, margen: 43 },
  { x: "2024-10", ingresos: 276, margen: 43 },
  { x: "2024-11", ingresos: 288, margen: 43 },
  { x: "2024-12", ingresos: 320, margen: 44 },
  { x: "2025-01", ingresos: 300, margen: 43 },
  { x: "2025-02", ingresos: 310, margen: 43 },
  { x: "2025-03", ingresos: 326, margen: 44 },
  { x: "2025-04", ingresos: 320, margen: 44 },
  { x: "2025-05", ingresos: 338, margen: 44 },
  { x: "2025-06", ingresos: 356, margen: 45 },
  { x: "2025-07", ingresos: 348, margen: 45 },
  { x: "2025-08", ingresos: 368, margen: 45 },
  { x: "2025-09", ingresos: 376, margen: 46 },
  { x: "2025-10", ingresos: 386, margen: 46 },
  { x: "2025-11", ingresos: 402, margen: 46 },
  { x: "2025-12", ingresos: 440, margen: 47 },
];

// Pareto por categoría de producto/cliente
const pareto = [
  { nombre: "A", valor: 340 },
  { nombre: "B", valor: 260 },
  { nombre: "C", valor: 180 },
  { nombre: "D", valor: 120 },
  { nombre: "E", valor: 90 },
  { nombre: "F", valor: 60 },
  { nombre: "G", valor: 40 },
  { nombre: "H", valor: 30 },
  { nombre: "I", valor: 20 },
  { nombre: "J", valor: 10 },
];

// Control Chart (SPC) de tiempo de ciclo mensual
const spc = [
  42, 40, 39, 41, 38, 37, 36, 35, 39, 40, 41, 38,
  37, 36, 34, 35, 33, 34, 36, 37, 39, 38, 37, 36,
  35, 34, 36, 33, 32, 31, 30, 31, 33, 32, 31, 30,
  29, 28, 29, 27, 26, 27, 28, 27, 26, 25, 26, 24,
  25, 24, 23, 22, 23, 22, 21, 22, 21, 20, 21, 19,
].map((v, i) => ({ x: i + 1, valor: v }));

// helper para Pareto: acumulado %
const paretoConAcum = (() => {
  const orden = [...pareto].sort((a, b) => b.valor - a.valor);
  const total = orden.reduce((s, r) => s + r.valor, 0);
  let acc = 0;
  return orden.map((r) => {
    acc += r.valor;
    return { ...r, acum: (acc / total) * 100 };
  });
})();

// helper para SPC: media y límites de control
const spcStats = (() => {
  const media = spc.reduce((s, r) => s + r.valor, 0) / spc.length;
  const sd = Math.sqrt(
    spc.reduce((s, r) => s + Math.pow(r.valor - media, 2), 0) / (spc.length - 1)
  );
  return {
    media,
    ucl: media + 3 * sd,
    lcl: Math.max(0, media - 3 * sd),
  };
})();

// === Chips helper ===
function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((t) => (
        <span key={t} className="text-xs rounded-full px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200">
          {t}
        </span>
      ))}
    </div>
  );
}

// === Tarjeta Proyecto ===
function Proyecto({ titulo, descripcion, chips }) {
  return (
    <div className="rounded-2xl p-6 bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-4">
        <span className="text-xl">📈</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{titulo}</h3>
      <p className="text-slate-600 mt-2 leading-relaxed">{descripcion}</p>
      <Chips items={chips} />
    </div>
  );
}

// === Componente principal ===
export default function PortfolioDashboard() {
  const totalIngresos = useMemo(
    () => ingresos5y.reduce((acc, r) => acc + r.ingresos, 0),
    []
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Portafolio – Senior Business Intelligence Analyst
        </h1>
        <p className="mt-3 text-slate-600 max-w-3xl">
          Impulso decisiones estratégicas con datos confiables. Diseño modelos analíticos,
          orquesto procesos end‑to‑end y traduzco métricas en acciones que mejoran ingresos,
          eficiencia y experiencia del cliente.
        </p>
      </section>

      {/* KPI Cards */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.labelBottom} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-700">{k.labelTop}</div>
            <div className="mt-2 text-slate-600 leading-tight">{k.labelBottom}</div>
          </div>
        ))}
      </section>

      {/* Clientes & Sectores */}
      <section className="max-w-6xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Experiencia con organizaciones</h3>
          <p className="text-slate-600 mt-2">He colaborado con empresas de consumo, transporte, finanzas y sector público.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              "Volaris","Galletas Dondé","Deacero","Deintec","Grupo Cynthus","Grupo Galería (Carl's Jr)","Grupo IAMSA","CFE","Grupo AlEn","Banorte","Infonavit","CNBV","Profuturo"
            ].map((n)=> (
              <span key={n} className="text-xs rounded-full px-3 py-1 bg-slate-50 text-slate-700 border border-slate-200">{n}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Sector Salud</h3>
          <p className="text-slate-600 mt-2">Proyectos analíticos y operativos en hospitales y servicios médicos.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              "Hospital Gea González","Vitalmex","Central de Emergencias ISSSTE","4Doctors"
            ].map((n)=> (
              <span key={n} className="text-xs rounded-full px-3 py-1 bg-green-50 text-green-700 border border-green-200">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de gráficas */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* 5 años de ingresos y margen */}
        <div className="col-span-2 rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <div className="flex items-end justify-between">
            <h3 className="text-lg font-semibold">Ingresos y Margen (5 años)</h3>
            <div className="text-sm text-slate-500">Total: {totalIngresos.toLocaleString()} u.</div>
          </div>
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ingresos5y} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" tickFormatter={(v)=> v.slice(2)} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ingresos" strokeWidth={2} />
                <Line type="monotone" dataKey="margen" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-500">Serie sintética con tendencia, estacionalidad y mejora gradual de margen (storytelling de crecimiento sostenido).</p>
        </div>

        {/* Pareto 80/20 */}
        <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Pareto de Ingresos por Categoría</h3>
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paretoConAcum}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0,100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="valor" barSize={24} />
                <Line yAxisId="right" type="monotone" dataKey="acum" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-500">Demuestra priorización 80/20 y enfoque en categorías críticas (A/B/C).</p>
        </div>

        {/* Control Chart (SPC) */}
        <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Control Chart – Tiempo de Ciclo</h3>
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spc}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="valor" strokeWidth={2} name="Tiempo (min)" />
                <Line type="monotone" dataKey={() => spcStats.media} dot={false} strokeWidth={1} name="Media" />
                <Line type="monotone" dataKey={() => spcStats.ucl} dot={false} strokeWidth={1} name="UCL" />
                <Line type="monotone" dataKey={() => spcStats.lcl} dot={false} strokeWidth={1} name="LCL" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-500">Muestra control estadístico del proceso y mejoras de eficiencia en el tiempo.</p>
        </div>

        {/* Proyectos destacados */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Proyecto
            titulo="Suite Ejecutiva de KPIs"
            descripcion="Visión 360° de ingresos, margen, costos y satisfacción con navegación drill‑through y control de acceso por rol."
            chips={["KPIs", "Modelado", "Gobernanza"]}
          />
          <Proyecto
            titulo="Modelado y Marts con Buenas Prácticas"
            descripcion="Diseño de modelos en capas y data marts orientados a decisiones, con pruebas de calidad y documentación."
            chips={["dbt", "Calidad", "Linaje"]}
          />
          <Proyecto
            titulo="Auditoría Continua"
            descripcion="Controles de compras/pagos (duplicados, sin PO, fraccionamiento) con trazabilidad a documento."
            chips={["Controles", "Riesgo", "Trazabilidad"]}
          />
          <Proyecto
            titulo="Optimización de Operaciones"
            descripcion="Reducción de tiempos de ciclo y variabilidad, con monitoreo SPC y metas de servicio."
            chips={["Eficiencia", "SPC", "SLA"]}
          />
        </div>
      </section>

      {/* Footer simple */}
      <footer className="max-w-6xl mx-auto px-6 mt-10 mb-16 text-sm text-slate-500">
        <p>
          *Datos de ejemplo y anonimizados. Sustituye los arreglos por tus JSON reales o un endpoint.
        </p>
      </footer>
    </div>
  );
}
