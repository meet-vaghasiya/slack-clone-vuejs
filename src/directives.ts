import { Directive, ObjectDirective } from "vue";

export const showInputMaxLength: ObjectDirective = {
  mounted(el, binding) {
    if (binding.value === null) return;
    // Create a span element for displaying the remaining character count
    const span = document.createElement("button");
    span.classList.add("absolute", "inset-y-0", "right-2");
    el.parentNode.insertBefore(span, el.nextSibling);

    // Update the content of the span
    const updateSpan = () => {
      span.innerText = Math.max(binding.value - el.value.length, 0);
    };
    el.addEventListener("input", updateSpan);
    updateSpan();
  },
};
