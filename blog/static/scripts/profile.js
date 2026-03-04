(() => {
  const modal = document.getElementById("deleteModal");
  const openBtn = document.getElementById("openDeleteModal");
  if (!modal || !openBtn) return;

  const closeEls = modal.querySelectorAll("[data-close='1']");

  const open = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeEls.forEach((el) => el.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
})();

(() => {
  const form = document.getElementById("profileForm");
  if (!form) return;

  const profileState = document.getElementById("profileState");
  const saveButton = document.getElementById("saveProfileBtn");

  const usernameInput = form.querySelector("input[name='username']");
  const emailInput = form.querySelector("input[name='email']");
  const bioInput = form.querySelector("textarea[name='bio']");
  const quoteInput = form.querySelector("textarea[name='quote']");
  const avatarInput = form.querySelector("input[name='avatar']");

  const usernamePreview = document.getElementById("usernameLivePreview");
  const emailPreview = document.getElementById("emailLivePreview");
  const bioPreview = document.getElementById("bioLivePreview");
  const quotePreview = document.getElementById("quoteLivePreview");
  const avatarPreview = document.getElementById("avatarLivePreview");
  const avatarHeaderImage = document.querySelector(".avatar-img");
  const avatarFileName = document.getElementById("avatarFileName");

  const counters = Array.from(document.querySelectorAll(".counter[data-counter-for]"));

  const trackedFields = Array.from(form.elements).filter((element) => {
    if (!element || !element.name || element.name === "csrfmiddlewaretoken") return false;
    if (element.disabled) return false;

    const type = element.type || "";
    if (type === "submit" || type === "button") return false;

    return true;
  });

  const getFieldValue = (field) => {
    if (field.type === "file") return "";
    if (field.type === "checkbox" || field.type === "radio") return field.checked ? "1" : "0";
    return (field.value || "").trim();
  };

  const initialValues = new Map(
    trackedFields.map((field) => [field.name, getFieldValue(field)])
  );

  const updateCounter = (counter) => {
    const fieldId = counter.dataset.counterFor;
    if (!fieldId) return;

    const field = document.getElementById(fieldId);
    if (!field) return;

    const maxLength = Number(field.getAttribute("maxlength"));
    const currentLength = (field.value || "").length;

    if (Number.isFinite(maxLength) && maxLength > 0) {
      counter.textContent = `${currentLength}/${maxLength}`;

      const remaining = maxLength - currentLength;
      counter.classList.toggle("is-near-limit", remaining <= 10 && remaining > 0);
      counter.classList.toggle("is-at-limit", remaining <= 0);
    } else {
      counter.textContent = `${currentLength}`;
      counter.classList.remove("is-near-limit", "is-at-limit");
    }
  };

  const setPreviewText = (element, value) => {
    if (!element) return;

    const fallback = element.dataset.empty || "";
    const text = (value || "").trim();
    element.textContent = text || fallback;
  };

  const setQuotePreviewText = (element, value) => {
    if (!element) return;

    const fallback = element.dataset.empty || "";
    const text = (value || "").trim();
    element.textContent = `«${text || fallback}»`;
  };

  const updateLivePreview = () => {
    if (usernameInput) setPreviewText(usernamePreview, usernameInput.value);
    if (emailInput) setPreviewText(emailPreview, emailInput.value);
    if (bioInput) setPreviewText(bioPreview, bioInput.value);
    if (quoteInput) setQuotePreviewText(quotePreview, quoteInput.value);
  };

  let objectUrl = null;
  const initialAvatarSrc = avatarPreview?.getAttribute("src") || avatarHeaderImage?.getAttribute("src") || "";

  const revokeObjectUrl = () => {
    if (!objectUrl) return;
    URL.revokeObjectURL(objectUrl);
    objectUrl = null;
  };

  const updateAvatarPreview = () => {
    if (!avatarInput) return;

    const file = avatarInput.files && avatarInput.files[0];

    if (!file) {
      revokeObjectUrl();
      if (avatarPreview && initialAvatarSrc) avatarPreview.src = initialAvatarSrc;
      if (avatarHeaderImage && initialAvatarSrc) avatarHeaderImage.src = initialAvatarSrc;
      if (avatarFileName) avatarFileName.textContent = "Текущий аватар";
      return;
    }

    if (avatarFileName) avatarFileName.textContent = `Выбран файл: ${file.name}`;
    if (!file.type.startsWith("image/")) return;

    revokeObjectUrl();
    objectUrl = URL.createObjectURL(file);

    if (avatarPreview) avatarPreview.src = objectUrl;
    if (avatarHeaderImage) avatarHeaderImage.src = objectUrl;
  };

  const updateDirtyState = () => {
    if (!profileState) return;

    const isDirty = trackedFields.some((field) => {
      if (field.type === "file") return Boolean(field.files && field.files.length);
      return getFieldValue(field) !== initialValues.get(field.name);
    });

    profileState.classList.toggle("is-dirty", isDirty);
    profileState.textContent = isDirty
      ? profileState.dataset.dirty || "Есть несохранённые изменения"
      : profileState.dataset.pristine || "Без изменений";
  };

  const refreshAll = () => {
    counters.forEach(updateCounter);
    updateLivePreview();
    updateAvatarPreview();
    updateDirtyState();
  };

  form.addEventListener("input", (event) => {
    const target = event.target;
    if (target && target.id) {
      counters.forEach((counter) => {
        if (counter.dataset.counterFor === target.id) updateCounter(counter);
      });
    }

    updateLivePreview();
    updateDirtyState();
  });

  form.addEventListener("change", () => {
    updateAvatarPreview();
    updateDirtyState();
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      refreshAll();
    }, 0);
  });

  form.addEventListener("submit", () => {
    if (!saveButton) return;
    saveButton.disabled = true;
    saveButton.classList.add("is-loading");
  });

  window.addEventListener("beforeunload", () => {
    revokeObjectUrl();
  });

  refreshAll();
})();
