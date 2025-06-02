document.querySelectorAll('.clickopen').forEach(btn => {
  btn.addEventListener('click', () => {
    const currentBlock = btn.closest('.row').nextElementSibling;

    if (currentBlock?.classList.contains('test-block')) {
      // 收合所有已展開的項目
      document.querySelectorAll('.test-block.expanded').forEach(block => {
        if (block !== currentBlock) {
          block.classList.remove('expanded');
          block.style.maxHeight = '0';
        }
      });

      // 切換當前項目的展開/收合
      const isExpanded = currentBlock.classList.toggle('expanded');
      currentBlock.style.maxHeight = isExpanded ? currentBlock.scrollHeight + 'px' : '0';
    }
  });
});
