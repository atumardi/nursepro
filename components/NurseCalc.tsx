
import React, { useState } from 'react';

const InfoIcon = () => (
  <svg className="w-3.5 h-3.5 text-slate-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
  helperText?: string;
  tooltip?: string;
}> = ({ label, value, onChange, placeholder, type = "number", helperText, tooltip }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
      {tooltip && (
        <div className="group relative">
          <InfoIcon />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800" />
          </div>
        </div>
      )}
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
    />
    {helperText && <p className="text-[10px] text-slate-400 leading-tight">{helperText}</p>}
  </div>
);

const NurseCalc: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dose' | 'drip' | 'bmi'>('dose');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <section>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Nurse Calc</h2>
        </div>
        <p className="text-slate-500 text-sm">Kalkulator klinis komprehensif untuk membantu presisi tindakan keperawatan.</p>
      </section>

      <div className="flex gap-2 p-1 bg-slate-200/50 rounded-2xl w-fit">
        {(['dose', 'drip', 'bmi'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-6 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              activeTab === type 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {type === 'dose' ? 'Dosis Sediaan' : type === 'drip' ? 'Tetes Infus' : 'BMI'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        {activeTab === 'dose' && <div className="p-6 md:p-10"><DoseCalculator /></div>}
        {activeTab === 'drip' && <div className="p-6 md:p-10"><DripCalculator /></div>}
        {activeTab === 'bmi' && <div className="p-6 md:p-10"><BMICalculator /></div>}
      </div>
    </div>
  );
};

type DrugType = 'generic' | 'dobutamin' | 'norephineprine' | 'furosemid' | 'farpresin' | 'epineprine' | 'nitrogliserin' | 'perdipin';

interface DrugMarketInfo {
  image: string;
  marketNames: string[];
  preparation: string;
  info: string;
}

const DRUG_DATA: Record<Exclude<DrugType, 'generic'>, DrugMarketInfo> = {
  dobutamin: {
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&q=80',
    marketNames: ['Inotrop', 'Dobat', 'Dobutamine Hameln'],
    preparation: 'Vial: 250mg / 5ml atau 250mg / 20ml',
    info: 'Inotropik positif untuk meningkatkan kontraktilitas jantung pada syok kardiogenik.'
  },
  norephineprine: {
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop&q=80',
    marketNames: ['Levophed', 'Vascon', 'Raivas'],
    preparation: 'Ampul: 4mg / 4ml (1mg/ml)',
    info: 'Vasopresor poten untuk hipotensi berat atau syok septik.'
  },
  furosemid: {
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400&h=300&fit=crop&q=80',
    marketNames: ['Lasix', 'Uresix', 'Farsix'],
    preparation: 'Ampul: 20mg / 2ml',
    info: 'Diuretik kuat untuk edema paru akut atau gagal jantung kongestif.'
  },
  farpresin: {
    image: 'https://images.unsplash.com/photo-1615461066870-40b124f293db?w=400&h=300&fit=crop&q=80',
    marketNames: ['Vasopressin', 'Farpresin', 'Pitressin'],
    preparation: 'Ampul: 20 Units / 1ml',
    info: 'Hormon antidiuretik sintetis untuk vasokonstriksi pada syok refrakter.'
  },
  epineprine: {
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=300&fit=crop&q=80',
    marketNames: ['Adrenalin', 'Epinephrine Hameln'],
    preparation: 'Ampul: 1mg / 1ml',
    info: 'Katekolamin endogen untuk henti jantung atau anafilaksis berat.'
  },
  nitrogliserin: {
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop&q=80',
    marketNames: ['NTG', 'Nitro-Bid', 'Glyceryl Trinitrate'],
    preparation: 'Ampul: 10mg / 10ml atau 50mg / 10ml',
    info: 'Vasodilator vena untuk nyeri dada angina atau edema paru.'
  },
  perdipin: {
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop&q=80',
    marketNames: ['Nicardipine', 'Perdipine', 'Tensin'],
    preparation: 'Ampul: 10mg / 10ml',
    info: 'Antagonis kalsium untuk krisis hipertensi.'
  }
};

const DoseCalculator = () => {
  const [drugType, setDrugType] = useState<DrugType>('generic');
  const [order, setOrder] = useState('');
  const [stock, setStock] = useState('');
  const [volume, setVolume] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    let res = 0;
    const o = Number(order);
    const s = Number(stock);
    const v = Number(volume);
    const w = Number(weight);

    switch (drugType) {
      case 'generic':
        res = (o / s) * v;
        break;
      case 'dobutamin':
      case 'epineprine':
      case 'norephineprine':
      case 'perdipin':
        res = (o * w * 60 * v) / (s * 1000);
        break;
      case 'nitrogliserin':
        res = (o * 60 * v) / (s * 1000);
        break;
      case 'farpresin':
      case 'furosemid':
        res = o / (s / v);
        break;
      default:
        res = (o / s) * v;
    }

    setResult(isNaN(res) || !isFinite(res) ? null : res);
  };

  const getUnit = () => {
    if (drugType === 'farpresin') return 'Unit/jam';
    if (drugType === 'furosemid') return 'mg/jam';
    if (drugType === 'nitrogliserin') return 'mcg/menit';
    if (drugType === 'generic') return 'mg';
    return 'mcg/kg/min';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-blue-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Kalkulasi Dosis Sediaan</h3>
          <p className="text-sm text-slate-500 italic">Hitung kecepatan syringe pump atau dosis obat sediaan tunggal.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Pilih Rumus / Jenis Obat</label>
          <select 
            value={drugType} 
            onChange={(e) => {
                const val = e.target.value as DrugType;
                setDrugType(val);
                setResult(null);
                if(val === 'farpresin') { setStock('20'); setVolume('50'); }
                else if(val === 'dobutamin') { setStock('250'); setVolume('50'); }
                else if(val === 'norephineprine') { setStock('4'); setVolume('50'); }
                else if(val === 'furosemid') { setStock('100'); setVolume('50'); }
                else if(val === 'nitrogliserin') { setStock('10'); setVolume('50'); }
                else if(val === 'perdipin') { setStock('10'); setVolume('50'); }
                else if(val === 'epineprine') { setStock('1'); setVolume('50'); }
            }}
            className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm appearance-none cursor-pointer"
          >
            <option value="generic">Dosis Standar (mg → ml)</option>
            <option value="dobutamin">Dobutamin (mcg/kg/min)</option>
            <option value="norephineprine">Norepinephrine (mcg/kg/min)</option>
            <option value="epineprine">Epinephrine (mcg/kg/min)</option>
            <option value="perdipin">Nicardipine (mcg/kg/min)</option>
            <option value="nitrogliserin">Nitroglycerin (mcg/min)</option>
            <option value="farpresin">Vasopressin (Unit/jam)</option>
            <option value="furosemid">Furosemide (mg/jam)</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <InputField 
            label={`Dosis Diminta (${getUnit()})`}
            value={order}
            onChange={setOrder}
            placeholder="0"
            tooltip="Dosis yang diinstruksikan oleh dokter dalam satuan yang sesuai."
            helperText={`Contoh: 5 ${getUnit()}`}
          />

          {(['dobutamin', 'norephineprine', 'epineprine', 'perdipin'].includes(drugType)) && (
            <InputField 
              label="Berat Badan (kg)"
              value={weight}
              onChange={setWeight}
              placeholder="0"
              tooltip="Berat badan pasien dalam kilogram. Dibutuhkan untuk rumus berbasis berat badan."
            />
          )}

          <InputField 
            label={`Sediaan Obat (${drugType === 'farpresin' ? 'Unit' : 'mg'})`}
            value={stock}
            onChange={setStock}
            placeholder="0"
            tooltip="Kandungan obat dalam 1 ampul/vial (sebelum dilarutkan)."
            helperText={`Contoh: 250 mg`}
          />

          <InputField 
            label="Cairan Pengencer (ml)"
            value={volume}
            onChange={setVolume}
            placeholder="50"
            tooltip="Jumlah cairan pelarut (NS/D5) yang digunakan dalam syringe pump."
            helperText="Umumnya 50 ml untuk syringe pump."
          />
        </div>

        <button onClick={calculate} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:scale-[1.01] transition-all active:scale-95">
          Hitung Kecepatan
        </button>
        
        {result !== null && (
          <div className="bg-slate-900 p-8 rounded-3xl text-center text-white shadow-xl animate-in zoom-in duration-300 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
             <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1 relative z-10">Hasil Kecepatan Syringe Pump:</p>
             <p className="text-5xl font-black mb-1 relative z-10">{result.toFixed(2)} <span className="text-xl font-medium text-slate-400">ml/jam</span></p>
             <p className="text-[10px] text-slate-500 mt-2 relative z-10 italic">*Verifikasi kembali hasil perhitungan dengan rekan sejawat (Double Check).</p>
          </div>
        )}

        {drugType !== 'generic' && (
          <div className="pt-6 border-t border-slate-100 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-6 bg-slate-50 p-6 rounded-2xl">
              <div className="md:w-1/3 flex-shrink-0">
                <img src={DRUG_DATA[drugType].image} alt={drugType} className="w-full h-36 object-cover rounded-xl border border-slate-200 shadow-sm" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-1">Informasi Klinis</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{DRUG_DATA[drugType].info}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Merk: <span className="text-slate-700">{DRUG_DATA[drugType].marketNames.join(', ')}</span></p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Sediaan: <span className="text-blue-600 font-black">{DRUG_DATA[drugType].preparation}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DripCalculator = () => {
  const [vol, setVol] = useState('');
  const [time, setTime] = useState('');
  const [factor, setFactor] = useState('20');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const res = (Number(vol) * Number(factor)) / (Number(time) * 60);
    setResult(isNaN(res) || !isFinite(res) ? null : res);
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h3 className="font-bold text-slate-800 text-xl tracking-tight">Tetesan Infus (TPM)</h3>
        <p className="text-sm text-slate-500 italic">Hitung jumlah tetesan per menit untuk infus manual.</p>
      </div>

      <div className="space-y-5">
        <InputField 
          label="Volume Cairan (ml)"
          value={vol}
          onChange={setVol}
          placeholder="500"
          tooltip="Total volume cairan infus yang akan diberikan."
          helperText="Contoh: 500 ml RL/NS"
        />
        
        <InputField 
          label="Durasi Pemberian (Jam)"
          value={time}
          onChange={setTime}
          placeholder="8"
          tooltip="Lama waktu pemberian infus dalam satuan jam."
        />

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Faktor Tetes (gtt/ml)</label>
            <div className="group relative">
              <InfoIcon />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                Makro: 15/20 gtt/ml (Dewasa). Mikro: 60 gtt/ml (Anak/Drip Obat).
              </div>
            </div>
          </div>
          <select 
            value={factor} 
            onChange={(e) => setFactor(e.target.value)} 
            className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
          >
            <option value="20">Makro (20 gtt/ml) - Standar</option>
            <option value="15">Makro (15 gtt/ml) - Khusus</option>
            <option value="60">Mikro (60 gtt/ml) - Pediatrik</option>
          </select>
        </div>

        <button onClick={calculate} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">Hitung Tetesan</button>
        
        {result !== null && (
          <div className="bg-blue-50 p-8 rounded-[32px] text-center border-2 border-blue-100 animate-in zoom-in duration-300">
            <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1">Kecepatan Tetesan:</p>
            <p className="text-5xl font-black text-blue-700">{Math.round(result)} <span className="text-xl">TPM</span></p>
            <div className="mt-4 flex justify-center gap-4 text-[10px] font-bold text-slate-400">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> { (result / 4).toFixed(1) } tetes/15 dtk</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const hMeter = Number(height) / 100;
    const res = Number(weight) / (hMeter * hMeter);
    setResult(isNaN(res) || !isFinite(res) ? null : res);
  };

  const getStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'bg-orange-100 text-orange-600 border-orange-200', info: 'Berat badan kurang dari normal.' };
    if (bmi < 25) return { label: 'Normal', color: 'bg-green-100 text-green-600 border-green-200', info: 'Berat badan ideal dan sehat.' };
    if (bmi < 30) return { label: 'Overweight', color: 'bg-yellow-100 text-yellow-600 border-yellow-200', info: 'Kelebihan berat badan ringan.' };
    return { label: 'Obese', color: 'bg-red-100 text-red-600 border-red-200', info: 'Kegemukan tingkat tinggi (Risiko kesehatan).' };
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h3 className="font-bold text-slate-800 text-xl tracking-tight">Body Mass Index (BMI)</h3>
        <p className="text-sm text-slate-500 italic">Parameter status gizi pasien berdasarkan tinggi dan berat badan.</p>
      </div>

      <div className="space-y-5">
        <InputField 
          label="Berat Badan (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="0"
          tooltip="Berat badan pasien saat ini dalam kilogram."
        />
        <InputField 
          label="Tinggi Badan (cm)"
          value={height}
          onChange={setHeight}
          placeholder="0"
          tooltip="Tinggi badan pasien dalam centimeter."
        />
        
        <button onClick={calculate} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">Analisis Status Gizi</button>
        
        {result !== null && (
          <div className={`p-8 rounded-[32px] text-center border-2 animate-in zoom-in duration-300 ${getStatus(result).color}`}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Skor BMI Pasien:</p>
            <p className="text-6xl font-black mb-3">{result.toFixed(1)}</p>
            <div className="inline-block px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest border border-current mb-3">
              {getStatus(result).label}
            </div>
            <p className="text-xs font-medium opacity-80">{getStatus(result).info}</p>
          </div>
        )}

        <div className="bg-slate-50 p-5 rounded-2xl space-y-3">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Klasifikasi WHO (Asia)</h4>
           <div className="grid grid-cols-2 gap-y-2">
              <div className="text-[10px] font-bold text-slate-500">Normal</div>
              <div className="text-[10px] font-bold text-green-600 text-right">18.5 - 24.9</div>
              <div className="text-[10px] font-bold text-slate-500">Overweight</div>
              <div className="text-[10px] font-bold text-yellow-600 text-right">25.0 - 29.9</div>
              <div className="text-[10px] font-bold text-slate-500">Obese</div>
              <div className="text-[10px] font-bold text-red-600 text-right">> 30.0</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NurseCalc;
