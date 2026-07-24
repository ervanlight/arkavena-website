import os

files = [
    '/Users/macbook/kontraktor-website/src/app/residential/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/residential/bangun-rumah-surabaya/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/residential/renovasi-rumah-surabaya/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/residential/tambah-lantai-rumah/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/facility-care/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/facility-care/maintenance-gedung/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/facility-care/maintenance-sekolah/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/facility-care/minor-works-industri/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/facility-care/waterproofing-dan-atap/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/tentang/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/projectview/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/portfolio/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/trust-center/page.tsx',
    '/Users/macbook/kontraktor-website/src/app/terima-kasih/page.tsx'
]

reps = [
    ("font-manrope", "font-[family-name:var(--font-space-grotesk)]"),
    ("bg-zinc-950", "bg-[#14171B]"),
    ("bg-zinc-900", "bg-[#14171B]"),
    ("border-zinc-200", "border-[#C9C3B8]"),
    ("border-zinc-800", "border-white/10"),
    ("border-zinc-900", "border-white/10"),
    ("text-zinc-900", "text-[#14171B]"),
    ("text-zinc-600", "text-[#5B6570]"),
    ("text-zinc-500", "text-[#5B6570]"),
    ("text-zinc-100", "text-white"),
    ("text-zinc-50", "text-white"),
    ("text-zinc-300", "text-white/70"),
    ("bg-zinc-50", "bg-[#ECE8E1]"),
    ("bg-zinc-100", "bg-[#C9C3B8]/20"),
    ("hover:bg-zinc-50", "hover:bg-[#C9C3B8]/10"),
    ("hover:bg-zinc-900", "hover:bg-white/5"),
    ("bg-white", "bg-[#ECE8E1]")
]

for f in files:
    if not os.path.exists(f):
        print(f"Skipping {f}, not found")
        continue
    
    with open(f, 'r') as file:
        content = file.read()
    
    # special handling for text-zinc-400
    if "bg-[#14171B]" in content and "text-zinc-400" in content:
         content = content.replace("text-zinc-400", "text-white/50")
    else:
         content = content.replace("text-zinc-400", "text-[#C9C3B8]")

    for old, new in reps:
        content = content.replace(old, new)
        
    with open(f, 'w') as file:
        file.write(content)
print("Token replacements applied to all found files.")
