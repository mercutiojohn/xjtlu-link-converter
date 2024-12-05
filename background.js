chrome.action.onClicked.addListener((tab) => {
  const originalUrl = tab.url;

  // 正则表达式匹配任何 URL
  // const regex = /^https?:\/\/(.*)/;
  const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)([^?\n]*)/i;

  // 检查 URL 是否匹配正则表达式
  const matches = originalUrl.match(regex);

  if (matches) {
    // 提取原始 URL 中的域名和路径
    const domain = matches[1];
    const path = matches[2];

    let newUrl = '';

    // 检查是否已经在 elink.xjtlu.edu.cn 上，如果是的话转回去
    if (domain.includes('elink.xjtlu.edu.cn')) {
      const newDomain = domain.replace(/-s\.elink\.xjtlu\.edu\.cn/, '').replace(/-/g, '.');
      newUrl = `https://${newDomain}${path}`;
    } else {
      const newDomain = domain.replace(/\./g, '-');
      newUrl = `https://${newDomain}-s.elink.xjtlu.edu.cn${path}`;
    }
    chrome.tabs.create({ url: newUrl });
  }
});
