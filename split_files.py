import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    css_content = style_match.group(1).strip()
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css_content)

# Extract JS
script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
if script_match:
    js_content = script_match.group(1).strip()
    
    # Extract translations block (const translations = {...}; const typedPhrases = {...};)
    trans_match = re.search(r'(const translations = \{.*?\n    \};\n\n    const typedPhrases = \{.*?\n    \};)', js_content, re.DOTALL)
    
    if trans_match:
        translations_content = trans_match.group(1).strip()
        with open('js/translations.js', 'w', encoding='utf-8') as f:
            f.write(translations_content)
        
        # The rest of JS
        main_js_content = js_content.replace(trans_match.group(1), '').strip()
        with open('js/main.js', 'w', encoding='utf-8') as f:
            f.write(main_js_content)
    else:
        with open('js/main.js', 'w', encoding='utf-8') as f:
            f.write(js_content)

# Replace in HTML
new_content = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="./css/style.css" />', content, flags=re.DOTALL)
new_content = re.sub(r'<script>.*?</script>', '<script src="./js/translations.js"></script>\n  <script src="./js/main.js" defer></script>', new_content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Split completed successfully!")
