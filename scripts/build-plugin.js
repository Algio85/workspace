import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const TOKEN_FILES = [
  { file: 'tokens/base/shades.json',       collection: 'Colors/Shades',     description: 'All 16 shades per palette + brand tokens' },
  { file: 'tokens/base/spacing.json',      collection: 'Spacing',           description: 'Spacing scale — 8 steps' },
  { file: 'tokens/base/borders.json',      collection: 'Borders',           description: 'Border radius and border width' },
  { file: 'tokens/base/typography.json',   collection: 'Typography',        description: 'Type scale — size and config' },
  { file: 'tokens/base/opacity.json',      collection: 'Opacity',           description: 'Opacity scale — 10 steps' },
  { file: 'tokens/base/motion.json',       collection: 'Motion',            description: 'Duration and easing tokens' },
  { file: 'tokens/base/elevation.json',    collection: 'Elevation',         description: 'Z-index scale' },
  { file: 'tokens/semantic/surfaces.json', collection: 'Semantic/Surfaces', description: 'Surface color tokens' },
  { file: 'tokens/semantic/text.json',     collection: 'Semantic/Text',     description: 'Text color tokens' },
  { file: 'tokens/semantic/borders.json',  collection: 'Semantic/Borders',  description: 'Border color tokens' },
  { file: 'tokens/semantic/states.json',   collection: 'Semantic/States',   description: 'Interactive state tokens' },
];

const bundle = TOKEN_FILES.map(({ file, collection, description }) => {
  const tokens = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  return { file, collection, description, tokens };
});

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; font-size: 12px; background: #fff; }
    .header { padding: 16px; border-bottom: 1px solid #e5e5e5; }
    h1 { font-size: 14px; font-weight: 600; color: #111; margin-bottom: 4px; }
    .header p { font-size: 11px; color: #888; }
    .collections { padding: 12px 16px; border-bottom: 1px solid #e5e5e5; max-height: 320px; overflow-y: auto; }
    .collection-row { display: flex; align-items: center; gap: 10px; padding: 8px 4px; border-bottom: 1px solid #f0f0f0; cursor: pointer; border-radius: 4px; }
    .collection-row:last-child { border-bottom: none; }
    .collection-row:hover { background: #fafafa; }
    .collection-row input[type="checkbox"] { width: 14px; height: 14px; accent-color: #2563EB; cursor: pointer; flex-shrink: 0; }
    .collection-info { flex: 1; min-width: 0; }
    .collection-name { font-size: 12px; font-weight: 500; color: #111; }
    .collection-desc { font-size: 10px; color: #aaa; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .collection-count { font-size: 10px; color: #bbb; background: #f5f5f5; padding: 2px 6px; border-radius: 3px; flex-shrink: 0; }
    .select-all-row { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-bottom: 1px solid #e5e5e5; background: #fafafa; }
    .select-all-row label { font-size: 11px; color: #555; cursor: pointer; }
    .actions { padding: 12px 16px; }
    button { width: 100%; padding: 9px 16px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; }
    .btn-primary { background: #2563EB; color: #fff; }
    .btn-primary:hover { background: #1d4ed8; }
    .btn-primary:disabled { background: #bfdbfe; cursor: not-allowed; }
    .log { padding: 10px 16px; font-size: 10px; font-family: monospace; color: #555; background: #f9f9f9; min-height: 60px; max-height: 100px; overflow-y: auto; border-top: 1px solid #e5e5e5; }
    .log .success { color: #16a34a; }
    .log .error { color: #dc2626; }
    .log .info { color: #2563EB; }
    .progress { height: 3px; background: #e5e5e5; display: none; }
    .progress-bar { height: 100%; background: #2563EB; transition: width 0.2s; width: 0%; }
  </style>
</head>
<body>
<div class="header">
  <h1>Tao Token Pusher</h1>
  <p>Select token collections to push to Figma variables</p>
</div>
<div class="select-all-row">
  <input type="checkbox" id="selectAll" onchange="toggleAll(this.checked)" />
  <label for="selectAll">Select all</label>
  <span id="selectedCount" style="margin-left:auto;font-size:10px;color:#aaa;">0 selected</span>
</div>
<div class="collections" id="collections"></div>
<div class="progress" id="progress"><div class="progress-bar" id="progressBar"></div></div>
<div class="actions">
  <button class="btn-primary" id="pushBtn" onclick="pushSelected()" disabled>Push selected to Figma</button>
</div>
<div class="log" id="log">Ready — select collections to push.</div>
<script>
  var checkboxes = [];

  function countTokens(tokens) {
    var count = 0;
    function walk(obj) {
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        var val = obj[keys[i]];
        if (val && typeof val === 'object' && (val.hasOwnProperty('value') || val.hasOwnProperty('$value'))) {
          count++;
        } else if (val && typeof val === 'object') {
          walk(val);
        }
      }
    }
    walk(tokens);
    return count;
  }

  function renderCollections() {
    var container = document.getElementById('collections');
    for (var idx = 0; idx < TOKEN_BUNDLE.length; idx++) {
      var item = TOKEN_BUNDLE[idx];
      var count = countTokens(item.tokens);
      var row = document.createElement('div');
      row.className = 'collection-row';
      row.innerHTML =
        '<input type="checkbox" id="cb_' + idx + '" onchange="updateCount()" />' +
        '<div class="collection-info">' +
          '<div class="collection-name">' + item.collection + '</div>' +
          '<div class="collection-desc">' + item.description + '</div>' +
        '</div>' +
        '<span class="collection-count">' + count + '</span>';
      (function(i) {
        row.onclick = function(e) {
          if (e.target.tagName !== 'INPUT') {
            var cb = document.getElementById('cb_' + i);
            cb.checked = !cb.checked;
            updateCount();
          }
        };
      })(idx);
      container.appendChild(row);
      checkboxes.push('cb_' + idx);
    }
  }

  function updateCount() {
    var selected = 0;
    for (var i = 0; i < checkboxes.length; i++) {
      if (document.getElementById(checkboxes[i]).checked) selected++;
    }
    document.getElementById('selectedCount').textContent = selected + ' selected';
    document.getElementById('pushBtn').disabled = selected === 0;
    document.getElementById('selectAll').checked = selected === checkboxes.length;
    document.getElementById('selectAll').indeterminate = selected > 0 && selected < checkboxes.length;
  }

  function toggleAll(checked) {
    for (var i = 0; i < checkboxes.length; i++) {
      document.getElementById(checkboxes[i]).checked = checked;
    }
    updateCount();
  }

  function log(msg, type) {
    var el = document.getElementById('log');
    el.innerHTML += '<div class="' + (type || '') + '">' + msg + '</div>';
    el.scrollTop = el.scrollHeight;
  }

  function setProgress(pct) {
    document.getElementById('progress').style.display = 'block';
    document.getElementById('progressBar').style.width = pct + '%';
    if (pct >= 100) {
      setTimeout(function() { document.getElementById('progress').style.display = 'none'; }, 800);
    }
  }

  function pushSelected() {
    var selected = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (document.getElementById(checkboxes[i]).checked) selected.push(TOKEN_BUNDLE[i]);
    }
    if (selected.length === 0) return;
    document.getElementById('pushBtn').disabled = true;
    document.getElementById('log').innerHTML = '';
    log('Pushing ' + selected.length + ' collection(s)...', 'info');
    setProgress(5);
    parent.postMessage({ pluginMessage: { type: 'push-all', collections: selected } }, '*');
  }

  window.onmessage = function(event) {
    var msg = event.data.pluginMessage;
    if (!msg) return;
    if (msg.type === 'log') log(msg.message, msg.level);
    if (msg.type === 'progress') setProgress(msg.pct);
    if (msg.type === 'done') {
      document.getElementById('pushBtn').disabled = false;
      setProgress(100);
    }
  };
</script>
<script>
  var TOKEN_BUNDLE = ${JSON.stringify(bundle)};
  renderCollections();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(root, 'figma-plugin', 'ui.html'), html);
console.log('Plugin bundle generated -> figma-plugin/ui.html');