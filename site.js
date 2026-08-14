const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const segmentButtons = Array.from(document.querySelectorAll('[data-segment]'));
const segmentPanels = Array.from(document.querySelectorAll('[data-segment-panel]'));
const segmentJumpLinks = Array.from(document.querySelectorAll('[data-jump-segment]'));

if (segmentButtons.length && segmentPanels.length) {
  const showSegment = (segment) => {
    segmentButtons.forEach((button) => {
      const isActive = button.dataset.segment === segment;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

    segmentPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.segmentPanel === segment);
    });
  };

  segmentButtons.forEach((button) => {
    button.addEventListener('click', () => showSegment(button.dataset.segment));
  });

  segmentJumpLinks.forEach((link) => {
    link.addEventListener('click', () => showSegment(link.dataset.jumpSegment));
  });
}

const testimonialTrack = document.querySelector('.testimonial-track');

if (testimonialTrack && testimonialTrack.children.length) {
  testimonialTrack.innerHTML += testimonialTrack.innerHTML;
}

const chatbotShell = document.querySelector('[data-chatbot]');

if (chatbotShell) {
  const chatbotToggle = chatbotShell.querySelector('.chatbot-toggle');
  const chatbotPanel = chatbotShell.querySelector('.chatbot-panel');
  const chatbotClose = chatbotShell.querySelector('.chatbot-close');
  const chatbotMessages = chatbotShell.querySelector('.chatbot-messages');
  const chatbotForm = chatbotShell.querySelector('.chatbot-form');
  const chatbotInput = chatbotShell.querySelector('.chatbot-input');
  const chatbotChips = Array.from(chatbotShell.querySelectorAll('[data-chatbot-prompt]'));
  const chatbotOpenButtons = Array.from(document.querySelectorAll('[data-open-chatbot]'));

  const addChatMessage = (role, text) => {
    if (!chatbotMessages) {
      return;
    }

    const bubble = document.createElement('div');
    bubble.className = `chatbot-bubble ${role}`;
    bubble.textContent = text;
    chatbotMessages.appendChild(bubble);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  const openChatbot = () => {
    if (!chatbotPanel || !chatbotToggle) {
      return;
    }

    chatbotPanel.hidden = false;
    chatbotToggle.setAttribute('aria-expanded', 'true');
    if (chatbotMessages && !chatbotMessages.dataset.seeded) {
      addChatMessage('assistant', 'Hi, I can answer basic questions about roof repair, replacement, leaks, brands, siding, trim, gutters, and whether a project sounds residential, commercial, or industrial. If you need direct help, use the form or call Matthew for follow-up.');
      chatbotMessages.dataset.seeded = 'true';
    }
    if (chatbotInput) {
      chatbotInput.focus();
    }
  };

  const closeChatbotPanel = () => {
    if (!chatbotPanel || !chatbotToggle) {
      return;
    }

    chatbotPanel.hidden = true;
    chatbotToggle.setAttribute('aria-expanded', 'false');
  };

  const getChatbotReply = (message) => {
    const text = message.toLowerCase();

    if (text.includes('repair') || text.includes('replace')) {
      return 'If the roof issue is isolated and the surrounding system is still solid, a repair may make sense. If leaks keep returning or wear is widespread, Modern Vision Roofing usually frames that as a replacement discussion.';
    }

    if (text.includes('leak') || text.includes('storm')) {
      return 'For an active leak or storm concern, the best first step is to describe where the water is showing, what the weather event was, and whether shingles, flashing, or gutters look disturbed. Photos help move the estimate faster.';
    }

    if (text.includes('brand') || text.includes('gaf') || text.includes('certainteed') || text.includes('carlisle') || text.includes('owens')) {
      return 'The homepage now highlights major roofing manufacturer families like GAF, CertainTeed, Carlisle, and Owens Corning so customers can start brand and system conversations earlier in the estimate process.';
    }

    if (text.includes('siding') || text.includes('hardie') || text.includes('ply gem')) {
      return 'Yes. The site now includes siding-focused content around James Hardie, Ply Gem, and CertainTeed siding so exterior conversations do not stop at the roof surface alone.';
    }

    if (text.includes('trim') || text.includes('azek') || text.includes('wolf')) {
      return 'Trim is now part of the homepage product-family mix too. The site highlights AZEK Trim and WOLF Trim to support exterior packages that include fascia, trim lines, and cleaner roof-to-wall transitions.';
    }

    if (text.includes('gutter')) {
      return 'Gutters have their own highlighted section because drainage, fascia protection, and water movement are part of the roof system, not an afterthought.';
    }

    if (text.includes('commercial') || text.includes('industrial') || text.includes('residential')) {
      return 'Use the property-type switcher on the homepage to compare how residential, commercial, and industrial work are described. Each one now has its own imagery and explanation of what owners usually care about most.';
    }

    if (text.includes('estimate') || text.includes('quote') || text.includes('price')) {
      return 'A useful estimate should explain the roof problem, whether repair or replacement is being recommended, what materials or systems are being discussed, and what the next step will be. The form on the page is set up to collect those first details.';
    }

    return 'For basic questions, I can help with repair versus replacement, leaks, brands, siding, trim, gutters, and residential versus commercial versus industrial work. For anything job-specific, the best next step is to use the estimate form or call Matthew directly.';
  };

  const handleChatPrompt = (message) => {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    openChatbot();
    addChatMessage('user', trimmed);
    window.setTimeout(() => {
      addChatMessage('assistant', getChatbotReply(trimmed));
    }, 180);
  };

  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
      if (chatbotPanel && chatbotPanel.hidden) {
        openChatbot();
      } else {
        closeChatbotPanel();
      }
    });
  }

  if (chatbotClose) {
    chatbotClose.addEventListener('click', closeChatbotPanel);
  }

  chatbotOpenButtons.forEach((button) => {
    button.addEventListener('click', openChatbot);
  });

  chatbotChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      handleChatPrompt(chip.dataset.chatbotPrompt || '');
    });
  });

  if (chatbotForm && chatbotInput) {
    chatbotForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = chatbotInput.value;
      chatbotInput.value = '';
      handleChatPrompt(message);
    });
  }
}
