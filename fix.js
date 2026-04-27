import fs from 'fs';

let content = fs.readFileSync('src/components/SystemArchitecturePanel.tsx', 'utf-8');

// The image tag is probably like <img\n              src="data:image/png;base64,...."\n              alt="System Architecture Schematic"\n              className="w-full mix-blend-lighten object-contain"\n            />

// Replace the huge img tag
content = content.replace(/<img[^>]*src="data:image\/png;base64,[^>]*>/g, '<img src="/architecture.png" alt="System Architecture Schematic" className="w-full object-contain rounded-xl" />');

// Replace black background
content = content.replace('bg-[#000000]', 'bg-slate-50');
content = content.replace('border-y border-[#1a1a1a]', 'border-y border-slate-200');

fs.writeFileSync('src/components/SystemArchitecturePanel.tsx', content);
console.log('Fixed file');
