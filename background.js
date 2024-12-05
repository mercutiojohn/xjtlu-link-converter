chrome.action.onClicked.addListener((tab) => {
  const originalUrl = tab.url;

  const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)([^?\n]*)/i;

  const matches = originalUrl.match(regex);

  if (matches) {
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
