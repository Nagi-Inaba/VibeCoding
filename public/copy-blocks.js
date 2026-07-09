(() => {
  const copyIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="9" y="9" width="10" height="10" rx="2"></rect>
      <path d="M5 15V7a2 2 0 0 1 2-2h8"></path>
    </svg>
  `;

  const checkIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 12 4 4 8-8"></path>
    </svg>
  `;

  const resetTimers = new WeakMap();

  function writeClipboardFallback(text) {
    const activeElement = document.activeElement;
    const selection = window.getSelection();
    const previousRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.append(textarea);
    textarea.focus();
    textarea.select();

    try {
      const copied = document.execCommand('copy');
      if (!copied) throw new Error('Copy command failed');
    } finally {
      textarea.remove();
      if (selection && previousRange) {
        selection.removeAllRanges();
        selection.addRange(previousRange);
      }
      if (activeElement instanceof HTMLElement) {
        activeElement.focus();
      }
    }
  }

  async function writeClipboard(text) {
    try {
      writeClipboardFallback(text);
      return;
    } catch (fallbackError) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }

      throw fallbackError;
    }
  }

  function setButtonState(button, statusElement, state, status, icon) {
    button.dataset.copyState = state;
    button.dataset.copyStatus = status;
    button.setAttribute('aria-label', status);
    button.title = status;
    button.innerHTML = icon;
    statusElement.textContent = status;

    const oldTimer = resetTimers.get(button);
    if (oldTimer) window.clearTimeout(oldTimer);

    const resetDelay = state === 'error' ? 6000 : 1800;
    const timer = window.setTimeout(() => {
      button.removeAttribute('data-copy-state');
      button.removeAttribute('data-copy-status');
      button.setAttribute('aria-label', 'プロンプトをコピー');
      button.title = 'コピー';
      button.innerHTML = copyIcon;
      statusElement.textContent = '';
      resetTimers.delete(button);
    }, resetDelay);

    resetTimers.set(button, timer);
  }

  function enhanceCopyBlocks() {
    document.querySelectorAll('.copy-block').forEach((block) => {
      if (block.dataset.copyReady === 'true') return;

      const pre = block.querySelector('pre');
      if (!pre) return;

      block.dataset.copyReady = 'true';
      block.classList.add('copy-block--enhanced');

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-block-button';
      button.setAttribute('aria-label', 'プロンプトをコピー');
      button.title = 'コピー';
      button.innerHTML = copyIcon;

      const statusElement = document.createElement('span');
      statusElement.className = 'copy-block-status';
      statusElement.setAttribute('role', 'status');
      statusElement.setAttribute('aria-live', 'polite');
      statusElement.setAttribute('aria-atomic', 'true');

      button.addEventListener('click', async () => {
        const text = pre.textContent ?? '';

        try {
          await writeClipboard(text);
          setButtonState(button, statusElement, 'copied', 'コピーしました', checkIcon);
        } catch {
          setButtonState(button, statusElement, 'error', 'コピーできませんでした。本文を選択してコピーしてください', copyIcon);
        }
      });

      block.prepend(button);
      block.append(statusElement);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceCopyBlocks, { once: true });
  } else {
    enhanceCopyBlocks();
  }

  document.addEventListener('astro:page-load', enhanceCopyBlocks);
})();
