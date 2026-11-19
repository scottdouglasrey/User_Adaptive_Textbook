"""Build a dependency-free reader from the captured chapter and prepared variants."""
from pathlib import Path
import json, re, hashlib

ROOT = Path(__file__).parent
source = (ROOT / 'chapter-4-source.txt').read_text()
sections = []
for line in source.splitlines():
    if line.startswith('# '):
        title = line[2:]
        section_id = re.match(r'4\.[1-7]', title)
        sections.append({'id': section_id[0] if section_id else ('intro' if not sections else 'wrap'), 'title': title, 'blocks': []})
    elif line.strip():
        blocks = sections[-1]['blocks']
        if line.startswith('### '): block = {'type': 'h4', 'text': line[4:]}
        elif line.startswith('## '): block = {'type': 'h3', 'text': line[3:]}
        elif line.startswith('@interactive '): block = {'type': 'link', 'text': 'Explore the original harvest-pressure activity', 'url': line.split(' ', 1)[1]}
        elif line.startswith('| '):
            cells = [c.strip() for c in line.strip('| ').split('|')]
            if blocks and blocks[-1]['type'] == 'table':
                blocks[-1]['rows'].append(cells)
                continue
            block = {'type': 'table', 'rows': [cells]}
        elif line.startswith('- '):
            if blocks and blocks[-1]['type'] == 'ul':
                blocks[-1]['items'].append(line[2:])
                continue
            block = {'type': 'ul', 'items': [line[2:]]}
        elif re.match(r'^\d+\. ', line):
            text = re.sub(r'^\d+\. ', '', line)
            if blocks and blocks[-1]['type'] == 'ol':
                blocks[-1]['items'].append(text)
                continue
            block = {'type': 'ol', 'items': [text]}
        else: block = {'type': 'p', 'text': line}
        block['id'] = f"{sections[-1]['id']}-b{len(blocks)+1:03}"
        blocks.append(block)

payload = json.dumps(sections, ensure_ascii=False).replace('</', '<\\/')
template = (ROOT / 'reader-template.html').read_text()
output = template.replace('/* CHAPTER_DATA */', 'const CHAPTER = '+payload+';').replace('/* ADAPTATION_DATA */', (ROOT/'adaptations.js').read_text()+'\n'+(ROOT/'section-4-2-variants.js').read_text()).replace('/* READER_CODE */', (ROOT/'reader.js').read_text())
(ROOT / 'chapter-4-dynamic.html').write_text(output)
public = ROOT / 'public'
public.mkdir(exist_ok=True)
(public/'index.html').write_text(output)
(public/'.nojekyll').touch()
manifest = {'source_url': 'https://commodity-marketing-textbook.ces-chatgpt-2736.chatgpt.site/#4/2', 'captured_date': '2026-11-05', 'author': 'Jeremy Slade', 'source_sha256': hashlib.sha256(source.encode()).hexdigest(), 'sections': [{'id': s['id'], 'title':s['title'], 'blocks':len(s['blocks'])} for s in sections], 'normalization': ['Removed source pagination and running interface elements.', 'Joined two sentences interrupted by page breaks.', 'Reassembled split signal/noise and decision-filter tables; source image text was transcribed into table cells.', 'Normalized whitespace and line-break hyphenation.'], 'scope': 'Chapter reading body, objectives, examples, tables, key terms, takeaways, and original activity link. Collapsed course-information frontmatter and platform features are not imported.', 'adaptation': 'Section 4.2 has 24 narrative passages in three prepared voices; seven selected narrative passages elsewhere also have three voices. All other source blocks remain unchanged. Analogies, elaborations, worked-example support, and practice are supplemental and require instructor review before teaching use.'}
(ROOT/'chapter-4-manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False)+'\n')
print(f'Built chapter-4-dynamic.html: {len(sections)} sections, {sum(len(s["blocks"]) for s in sections)} source blocks, {len(source.split())} words.')
