import os
import re

app_dir = "/Users/macbook/kontraktor-website/src/app"
src_dir = "/Users/macbook/kontraktor-website/src"

# 1. Get all valid routes
valid_routes = set()
for root, dirs, files in os.walk(app_dir):
    for f in files:
        if f in ['page.tsx', 'route.ts']:
            # get relative path
            rel = os.path.relpath(root, app_dir)
            if rel == '.':
                valid_routes.add('/')
            else:
                route = '/' + rel
                # handle dynamic routes like /portfolio/[slug] -> convert to regex or just string match
                valid_routes.add(route)

# Add hardcoded valid dynamic routes (just for this check)
valid_routes.add('/portfolio/rumah-tinggal-citraland')
valid_routes.add('/portfolio/gedung-perkantoran-surabaya')

# 2. Extract all hrefs
href_pattern = re.compile(r'href=["\']([^"\']+)["\']')
invalid_links = []

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as file:
                lines = file.readlines()
                for i, line in enumerate(lines):
                    matches = href_pattern.findall(line)
                    for match in matches:
                        if match.startswith('/'): # Internal link
                            base_match = match.split('#')[0].split('?')[0] # remove hash and query
                            
                            # Check if valid
                            is_valid = False
                            if base_match == '/':
                                is_valid = True
                            elif base_match in valid_routes:
                                is_valid = True
                            else:
                                # Check if it matches a dynamic route
                                for vr in valid_routes:
                                    if '[' in vr:
                                        # Very basic check: if base_match starts with the fixed part of dynamic route
                                        fixed_part = vr.split('[')[0]
                                        if base_match.startswith(fixed_part):
                                            is_valid = True
                                            break
                            
                            if not is_valid:
                                invalid_links.append((filepath, i+1, match))

print("Valid routes:")
for r in sorted(valid_routes):
    print(" ", r)

print("\nPotentially Invalid Links:")
for filepath, line_num, link in invalid_links:
    print(f"{os.path.relpath(filepath, src_dir)}:{line_num} -> {link}")
