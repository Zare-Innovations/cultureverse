/*
 * Minimal stand-in for the design tool's support.js so the artboards render their
 * renderVals() data during verification: expands {{holes}}, <sc-for> and <sc-if>,
 * wires on*="{{fn}}" handlers and ref="{{fn}}". Render happens once, then patches
 * text and attributes in place on setState/forceUpdate so CSS load animations do
 * not restart. Used only by the screenshot scripts, never shipped.
 */
(function () {
  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) { Object.assign(this.state, patch); this.forceUpdate(); }
    forceUpdate() { if (this.__render) this.__render(); }
  }
  window.DCLogic = DCLogic;

  function lookup(scope, path) {
    const parts = path.trim().split('.');
    let v = scope;
    for (const p of parts) { if (v == null) return undefined; v = v[p]; }
    return v;
  }
  function interpolate(str, scope) {
    return str.replace(/\{\{([^}]+)\}\}/g, (m, e) => { const v = lookup(scope, e); return v == null ? '' : String(v); });
  }
  const HOLE = /^\{\{([^}]+)\}\}$/;

  function renderNodes(nodes, scope, out) {
    for (const node of nodes) {
      if (node.nodeType === 3) { // text
        const t = document.createTextNode(interpolate(node.nodeValue, scope));
        out.appendChild(t);
        continue;
      }
      if (node.nodeType !== 1) continue;
      const tag = node.tagName.toLowerCase();
      if (tag === 'helmet') { out.appendChild(node.cloneNode(true)); continue; }
      if (tag === 'sc-for') {
        const list = lookup(scope, node.getAttribute('list').match(HOLE)[1]) || [];
        const as = node.getAttribute('as');
        list.forEach((item, i) => renderNodes(node.childNodes, Object.assign({}, scope, { [as]: item, __i: i }), out));
        continue;
      }
      if (tag === 'sc-if') {
        const v = lookup(scope, node.getAttribute('value').match(HOLE)[1]);
        if (v) renderNodes(node.childNodes, scope, out);
        continue;
      }
      const el = document.createElement(tag);
      for (const attr of node.attributes) {
        const name = attr.name, val = attr.value;
        if (name.startsWith('hint-')) continue;
        if (name === 'ref' && HOLE.test(val)) { const fn = lookup(scope, val.match(HOLE)[1]); if (typeof fn === 'function') queueMicrotask(() => fn(el)); continue; }
        if (name.startsWith('on') && HOLE.test(val)) {
          const fn = lookup(scope, val.match(HOLE)[1]);
          if (typeof fn === 'function') el.addEventListener(name.slice(2).toLowerCase(), fn);
          continue;
        }
        el.setAttribute(name, interpolate(val, scope));
      }
      renderNodes(node.childNodes, scope, el);
      out.appendChild(el);
    }
  }

  function patch(oldNode, newNode) {
    // Same-shape patch: update text and attributes, recurse; replace on shape mismatch.
    if (oldNode.nodeType === 3 && newNode.nodeType === 3) { if (oldNode.nodeValue !== newNode.nodeValue) oldNode.nodeValue = newNode.nodeValue; return; }
    if (oldNode.nodeType !== newNode.nodeType || oldNode.nodeName !== newNode.nodeName) { oldNode.replaceWith(newNode); return; }
    if (oldNode.nodeType === 1) {
      for (const a of Array.from(oldNode.attributes)) if (!newNode.hasAttribute(a.name)) oldNode.removeAttribute(a.name);
      for (const a of newNode.attributes) if (oldNode.getAttribute(a.name) !== a.value) oldNode.setAttribute(a.name, a.value);
      const oc = Array.from(oldNode.childNodes), nc = Array.from(newNode.childNodes);
      if (oc.length !== nc.length) { oldNode.replaceChildren(...nc); return; }
      for (let i = 0; i < oc.length; i++) patch(oc[i], nc[i]);
    }
  }

  function boot() {
    const script = document.querySelector('script[data-dc-script]');
    const xdc = document.querySelector('x-dc');
    if (!script || !xdc) return;
    const propsSpec = JSON.parse(script.getAttribute('data-props') || '{}');
    const props = {};
    for (const k in propsSpec) if (propsSpec[k] && propsSpec[k].default !== undefined) props[k] = propsSpec[k].default;
    if (window.__DC_PROPS) Object.assign(props, window.__DC_PROPS);
    const Component = new Function('DCLogic', script.textContent + '\nreturn Component;')(DCLogic);
    const inst = new Component(props);
    const template = Array.from(xdc.childNodes).map((n) => n.cloneNode(true));
    let mounted = false;
    inst.__render = function () {
      const scope = inst.renderVals() || {};
      const frag = document.createDocumentFragment();
      renderNodes(template, scope, frag);
      if (!mounted) { xdc.replaceChildren(frag); mounted = true; }
      else {
        const oc = Array.from(xdc.childNodes), nc = Array.from(frag.childNodes);
        if (oc.length !== nc.length) xdc.replaceChildren(...nc);
        else for (let i = 0; i < oc.length; i++) patch(oc[i], nc[i]);
      }
    };
    inst.__render();
    if (inst.componentDidMount) inst.componentDidMount();
    window.__dc = inst;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
