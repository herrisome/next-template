import Clipboard from 'clipboard';

function clipboardSuccess() {
  // Toast.success("复制成功");
  alert('复制成功');
}

function clipboardError() {
  // Toast.error("复制失败");
  alert('复制失败');
}

export default function handleClipboard(
  text: string,
  event: { target: string | Element | NodeListOf<Element> }
) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  });
  clipboard.on('success', () => {
    clipboardSuccess();
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    clipboardError();
    clipboard.destroy();
  });
}
